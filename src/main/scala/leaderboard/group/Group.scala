package leaderboard.group

import leaderboard.common.Id

final case class Group(
  id: Id[Group],
  password: PasswordHash
)
