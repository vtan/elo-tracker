package leaderboard.authentication

import leaderboard.common.{DatabaseProfile, Id}
import leaderboard.group.{Group, GroupRepository}

import akka.http.scaladsl.model.headers.{BasicHttpCredentials, HttpChallenge, HttpCredentials}

import scala.concurrent.{ExecutionContext, Future}

class AuthenticationService(
  database: DatabaseProfile.api.Database,
  groupRepository: GroupRepository
)(implicit ec: ExecutionContext) {

  private val challenge = HttpChallenge(scheme = "basic", realm = "leaderboard")

  def authenticator(groupId: Id[Group])(credentials: Option[HttpCredentials]): Future[Either[HttpChallenge, Unit]] =
    credentials match {
      case Some(BasicHttpCredentials(username, "")) =>
        database.run(groupRepository.getById(groupId)).map { group =>
          if (group.exists(_.password.matchesRaw(username))) {
            Right(())
          } else {
            Left(challenge)
          }
        }
      case _ =>
        Future.successful(Left(challenge))
    }
}
