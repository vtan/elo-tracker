package leaderboard.error

import leaderboard.common.Id

import akka.http.scaladsl.model.{StatusCode, StatusCodes}
import scala.reflect.runtime.universe._

final case class NotFoundError[T: TypeTag](id: Id[T]) extends ApiError {

  override val statusCode: StatusCode = StatusCodes.NotFound
  override val message: String = s"${typeOf[T].typeSymbol.name.toString} not found: ${id.value.toString}"
}
