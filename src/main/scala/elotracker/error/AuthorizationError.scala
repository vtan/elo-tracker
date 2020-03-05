package elotracker.error

import akka.http.scaladsl.model.{StatusCode, StatusCodes}

case object AuthorizationError extends ApiError {
  override val statusCode: StatusCode = StatusCodes.Forbidden
  override val message: String = "Authorization error"
}
