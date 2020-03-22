package leaderboard.game

import leaderboard.common.Id

import io.circe.{Decoder, Encoder}
import io.circe.generic.semiauto._

import java.time.LocalDateTime

final case class Game(
  id: Id[Game],
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
  player1: String,
  player2: String,
  score1: Double,
  score2: Double,
  isDeleted: Boolean
) {

  def forInsert(playedAt: LocalDateTime): Game =
    Game(Id(0), playedAt, player1, player2, score1, score2, isDeleted)

  def update(game: Game): Game =
    Game(game.id, game.playedAt, player1, player2, score1, score2, isDeleted)
}

object NewGame {
  implicit val decoder: Decoder[NewGame] = deriveDecoder
}
