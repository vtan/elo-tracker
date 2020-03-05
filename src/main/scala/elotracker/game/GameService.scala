package elotracker.game

import elotracker.common.DatabaseProfile

import java.time.{LocalDateTime, ZoneId}
import scala.concurrent.{ExecutionContext, Future}

class GameService(
  database: DatabaseProfile.api.Database,
  gameRepository: GameRepository
)(implicit ec: ExecutionContext) {

  def getAll: Future[Seq[Game]] =
    database.run(gameRepository.getAll)

  def create(newGame: NewGame): Future[Unit] = {
    val game = newGame.created(playedAt = LocalDateTime.now(ZoneId.of("UTC")))
    database.run(gameRepository.create(game).map(_ => ()))
  }
}
