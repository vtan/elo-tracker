package leaderboard.common

import leaderboard.error.ApiError

import akka.event.LoggingAdapter
import akka.http.scaladsl.model.{HttpResponse, StatusCodes}
import akka.http.scaladsl.server.ExceptionHandler
import de.heikoseeberger.akkahttpcirce.FailFastCirceSupport
import io.circe.Printer

trait Api extends FailFastCirceSupport {
  protected final implicit val printer: Printer =
    Printer.noSpaces.copy(dropNullValues = true)
}

object Api {
  def exceptionHandler(log: LoggingAdapter): ExceptionHandler = {
    import akka.http.scaladsl.server.Directives._

    ExceptionHandler {
      case e: ApiError =>
        log.error(e, e.message)
        complete(HttpResponse(
          status = e.statusCode,
          entity = e.message
        ))
      case e: Throwable =>
        log.error(e, "Error from throwable")
        complete(HttpResponse(
          status = StatusCodes.InternalServerError,
          entity = "Internal server error"
        ))
    }
  }
}
