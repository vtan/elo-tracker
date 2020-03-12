package leaderboard.error

import akka.http.scaladsl.model.StatusCode

trait ApiError extends Exception {
  val statusCode: StatusCode
  val message: String
}
