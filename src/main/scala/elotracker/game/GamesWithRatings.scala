package elotracker.game

import io.circe.Encoder
import io.circe.generic.semiauto._

final case class GamesWithRatings(
  games: Seq[Game],
  ratingsAfterGames: Seq[RatingsAfterGame]
)

object GamesWithRatings {
  implicit val encoder: Encoder[GamesWithRatings] = deriveEncoder
}
