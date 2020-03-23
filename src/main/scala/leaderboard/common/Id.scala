package leaderboard.common

import akka.http.scaladsl.server.PathMatcher1
import akka.http.scaladsl.server.PathMatchers.LongNumber
import akka.http.scaladsl.unmarshalling.FromStringUnmarshaller
import io.circe.{Decoder, Encoder, KeyDecoder}

import scala.util.Try

final case class Id[T](value: Long) extends AnyVal

object Id {
  implicit def encoder[T]: Encoder[Id[T]] =
    Encoder.encodeString.contramap(_.value.toString)

  implicit def decoder[T]: Decoder[Id[T]] =
    Decoder.decodeString.emapTry(str => Try(Id(str.toLong)))

  implicit def keyDecoder[T]: KeyDecoder[Id[T]] =
    KeyDecoder.instance(_.toLongOption.map(Id(_)))

  implicit def fromStringUnmarshaller[T]: FromStringUnmarshaller[Id[T]] =
    implicitly[FromStringUnmarshaller[Long]].map(Id(_))

  def Matcher[T]: PathMatcher1[Id[T]] =
    LongNumber.tmap(id => Tuple1(Id[T](id._1)))
}

