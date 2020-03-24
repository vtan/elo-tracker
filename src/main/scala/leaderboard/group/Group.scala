package leaderboard.group

import leaderboard.common.Id

import io.circe.Encoder
import io.circe.generic.semiauto._

final case class Group(
  id: Id[Group],
  name: String,
  urlName: String,
  password: PasswordHash
)

object Group {
  implicit val encoder: Encoder[Group] = deriveEncoder
}
