package elotracker.game

import java.time.LocalDateTime
import io.circe.Encoder
import io.circe.generic.semiauto._

final case class RatingsAfterGame(
  afterGame: LocalDateTime,
  playerRatings: Map[String, Rating]
)

final case class Rating(
  rating: Double,
  deviation: Double
)

object RatingsAfterGame {
  implicit val encoder: Encoder[RatingsAfterGame] = deriveEncoder

  def rateGames(games: Seq[Game]): Seq[RatingsAfterGame] = {
    val ratings = games
      .scanLeft(Map.empty[String, Rating])(rateGame)
      .tail
    val times = games.map(_.playedAt)
    (times zip ratings).map((RatingsAfterGame.apply _).tupled)
  }

  private def rateGame(playerRatings: Map[String, Rating], game: Game): Map[String, Rating] = {
    val withIncreasedDeviation: Map[String, Rating] =
      playerRatings.map {
        case (player, rating) => player -> increaseDeviationAfterGame(rating)
      }

    val player1Rating = withIncreasedDeviation.getOrElse(game.player1, Rating.unrated)
    val player2Rating = withIncreasedDeviation.getOrElse(game.player2, Rating.unrated)

    val (outcomeForPlayer1, outcomeForPlayer2) =
      if (game.score1 > game.score2) (1.0, 0.0)
      else if (game.score1 == game.score2) (0.5, 0.5)
      else (0.0, 1.0)

    val newPlayer1Rating = ratePlayerInGame(player1Rating, player2Rating, outcomeForPlayer1)
    val newPlayer2Rating = ratePlayerInGame(player2Rating, player1Rating, outcomeForPlayer2)

    withIncreasedDeviation ++ Seq(
      game.player1 -> newPlayer1Rating,
      game.player2 -> newPlayer2Rating
    )
  }

  private def sq(x: Double): Double = x * x

  private def increaseDeviationAfterGame(currentRating: Rating): Rating = {
    val c: Double = 60
    val newDeviation = Math.min(
      Math.sqrt(sq(currentRating.deviation) + sq(c)),
      Rating.unrated.deviation
    )
    currentRating.copy(deviation = newDeviation)
  }

  private def ratePlayerInGame(currentRating: Rating, opponentRating: Rating, outcome: Double): Rating = {
    val q = 0.0057565 // ln 10 / 400
    val g = 1 / Math.sqrt(1 + 3 * sq(q) * sq(opponentRating.deviation) / sq(Math.PI))
    val expected = 1 / (1 + Math.pow(
      10,
      -g * (currentRating.rating - opponentRating.rating) / 400
    ))
    val dsq = 1 / (sq(q) * sq(g) * expected * (1 - expected))

    val newRating = currentRating.rating +
      q / (1 / sq(currentRating.deviation) + 1 / dsq) * g * (outcome - expected)
    val newDeviation = Math.sqrt(1 / (1 / sq(currentRating.deviation) + 1 / dsq))

    Rating(newRating, newDeviation)
  }
}

object Rating {
  implicit val encoder: Encoder[Rating] = deriveEncoder

  val unrated: Rating = Rating(
    rating = 1500,
    deviation = 350
  )
}
