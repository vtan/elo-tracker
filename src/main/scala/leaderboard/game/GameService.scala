package leaderboard.game

import leaderboard.common.DatabaseProfile

import java.time.{LocalDateTime, ZoneId}
import scala.concurrent.{ExecutionContext, Future}

class GameService(
  database: DatabaseProfile.api.Database,
  gameRepository: GameRepository
)(implicit ec: ExecutionContext) {

  def getRatedGames: Future[Seq[RatedGame]] =
    database.run(gameRepository.getAll).map { games =>
      val ratings = Rating.rateGames(games)
      (games zip ratings).map((RatedGame.apply _).tupled)
    }

  def create(newGame: NewGame): Future[Unit] = {
    val game = newGame.forInsert(playedAt = LocalDateTime.now(ZoneId.of("UTC")))
    database.run(gameRepository.create(game).map(_ => ()))
  }
}
