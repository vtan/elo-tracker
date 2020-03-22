package leaderboard.game

import leaderboard.common.Id
import leaderboard.group.Group

import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto._

import java.time.LocalDateTime
import scala.util.{Failure, Success, Try}

final case class Game(
  id: Id[Game],
  groupId: Id[Group],
  playedAt: LocalDateTime,
  player1: String,
  player2: String,
  score1: Double,
  score2: Double,
  isDeleted: Boolean
)

object Game {
  implicit val encoder: Encoder[Game] = deriveEncoder
}

final case class NewGame(
  groupId: Id[Group],
  player1: String,
  player2: String,
  score1: Double,
  score2: Double,
  isDeleted: Boolean
) {

  def forInsert(playedAt: LocalDateTime): Game =
    Game(Id(0), groupId, playedAt, player1, player2, score1, score2, isDeleted)

  def update(game: Game): Try[Game] =
    if (groupId == game.groupId) {
      Success(Game(game.id, game.groupId, game.playedAt, player1, player2, score1, score2, isDeleted))
    } else {
      Failure(new IllegalArgumentException("The group of a game cannot be changed"))
    }
}

object NewGame {
  implicit val decoder: Decoder[NewGame] = deriveDecoder
}
