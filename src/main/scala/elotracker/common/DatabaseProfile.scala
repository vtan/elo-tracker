package elotracker.common

import io.circe.{Codec, Printer, parser}

import java.nio.charset.StandardCharsets
import scala.reflect.ClassTag

object DatabaseProfile {
  val api = slick.jdbc.PostgresProfile.api

  object Mappers {
    import api._

    private val jsonPrinter: Printer =
      Printer.noSpaces.copy(dropNullValues = true)

    def mappedViaJson[T: Codec: ClassTag]: BaseColumnType[T] =
      MappedColumnType.base[T, Array[Byte]](
        t => implicitly[Codec[T]].apply(t).printWith(jsonPrinter).getBytes(StandardCharsets.UTF_8),
        bytes => parser.decode(new String(bytes, StandardCharsets.UTF_8)).toTry.get
      )

    implicit def idColumnType[T]: BaseColumnType[Id[T]] =
      MappedColumnType.base[Id[T], Long](_.value, Id(_))
  }
}
