package leaderboard.user

import akka.http.scaladsl.model.headers.{BasicHttpCredentials, HttpChallenge, HttpCredentials}
import scala.concurrent.{Future}

class UserService {
  private val username: String = "k"
  private val password: String = ""

  def authenticator(credentials: Option[HttpCredentials]): Future[Either[HttpChallenge, Unit]] = {
    lazy val challenge = HttpChallenge(scheme = "basic", realm = "leaderboard")
    credentials match {
      case Some(BasicHttpCredentials(`username`, `password`)) =>
        Future.successful(Right(()))
      case _ =>
        Future.successful(Left(challenge))
    }
  }
}
