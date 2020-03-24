package leaderboard.group

import com.github.t3hnar.bcrypt.BCryptStrOps
import io.circe.{Encoder, Json}

final case class PasswordHash(value: String) extends AnyVal {

  def matchesRaw(password: String): Boolean =
    password.isBcrypted(value)
}

object PasswordHash {
  implicit val encoder: Encoder[PasswordHash] = Encoder.instance(_ => Json.Null)

  def fromRaw(password: String): PasswordHash =
    PasswordHash(password.bcrypt(rounds = 10))
}
