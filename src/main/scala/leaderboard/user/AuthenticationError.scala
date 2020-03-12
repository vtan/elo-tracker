package leaderboard.user

import leaderboard.error.ApiError

import akka.http.scaladsl.model.{StatusCode, StatusCodes}

case object AuthenticationError extends ApiError {
  override val statusCode: StatusCode = StatusCodes.Unauthorized
  override val message: String = "Invalid credentials"
}
