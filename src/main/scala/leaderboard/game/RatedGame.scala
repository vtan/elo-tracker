package leaderboard.game

import io.circe.Encoder
import io.circe.generic.semiauto._

final case class RatedGame(
  game: Game,
  playerRatings: Map[String, Rating]
)

object RatedGame {
  implicit val encoder: Encoder[RatedGame] = deriveEncoder
}
