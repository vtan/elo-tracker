package leaderboard.group

import leaderboard.common.DatabaseProfile.api._
import leaderboard.common.DatabaseProfile.Mappers._
import leaderboard.common.Id

import slick.ast.ColumnOption.AutoInc
import slick.lifted.ProvenShape

private class GroupTable(tag: Tag) extends Table[Group](tag, "group") {
  def id: Rep[Id[Group]] = column[Id[Group]]("id", AutoInc)
  def password: Rep[String] = column[String]("password")

  def * : ProvenShape[Group] = (id, password) <> (
    { case (id, password) => Group(id, PasswordHash(password)) },
    (group: Group) => Some((group.id, group.password.value))
  )
}

class GroupRepository {

  def getById(groupId: Id[Group]): DBIO[Option[Group]] =
    byId(groupId).result.headOption

  private val table = TableQuery[GroupTable]

  private val byId = Compiled { groupId: Rep[Id[Group]] =>
    table.filter(_.id === groupId)
  }
}
