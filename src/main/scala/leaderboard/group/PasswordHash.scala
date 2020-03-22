package leaderboard.group

import com.github.t3hnar.bcrypt.BCryptStrOps

final case class PasswordHash(value: String) extends AnyVal {

  def matchesRaw(password: String): Boolean =
    password.isBcrypted(value)
}

object PasswordHash {

  def fromRaw(password: String): PasswordHash =
    PasswordHash(password.bcrypt(rounds = 10))
}
