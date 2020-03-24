package leaderboard.game

import leaderboard.common.{DatabaseProfile, Id}
import leaderboard.error.NotFoundError
import leaderboard.group.Group

import java.time.{LocalDateTime, ZoneId}
import scala.concurrent.{ExecutionContext, Future}

class GameService(
  database: DatabaseProfile.api.Database,
  gameRepository: GameRepository
)(implicit ec: ExecutionContext) {

  def getRatedGames(groupId: Id[Group]): Future[Seq[RatedGame]] =
    database.run(gameRepository.getByGroupId(groupId, isDeleted = false)).map { games =>
      val ratings = Rating.rateGames(games)
      (games zip ratings).map((RatedGame.apply _).tupled)
    }

  def getDeletedGames(groupId: Id[Group]): Future[Seq[Game]] =
    database.run(gameRepository.getByGroupId(groupId, isDeleted = true))

  def create(newGame: NewGame): Future[Unit] = {
    val game = newGame.forInsert(playedAt = LocalDateTime.now(ZoneId.of("UTC")))
    database.run(gameRepository.create(game).map(_ => ()))
  }

  def update(gameId: Id[Game], newGame: NewGame): Future[Unit] =
    for {
      gameOpt <- database.run(gameRepository.getById(gameId))
      game <- gameOpt match {
        case Some(game) => Future.successful(game)
        case None => Future.failed(NotFoundError(gameId))
      }
      updatedGame <- Future.fromTry(newGame.update(game))
      _ <- database.run(gameRepository.update(updatedGame))
    } yield ()
}
