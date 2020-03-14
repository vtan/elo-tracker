package leaderboard.game

import leaderboard.common.DatabaseProfile.api._
import leaderboard.common.DatabaseProfile.Mappers._
import leaderboard.common.Id

import slick.lifted.ProvenShape

import java.time.LocalDateTime

private class GameTable(tag: Tag) extends Table[Game](tag, "game") {
  def id: Rep[Id[Game]] = column[Id[Game]]("id")
  def playedAt: Rep[LocalDateTime] = column[LocalDateTime]("playedAt")
  def player1: Rep[String] = column[String]("player1")
  def player2: Rep[String] = column[String]("player2")
  def score1: Rep[Double] = column[Double]("score1")
  def score2: Rep[Double] = column[Double]("score2")

  def * : ProvenShape[Game] =
    (id, playedAt, player1, player2, score1, score2) <> ((Game.apply _).tupled, Game.unapply)
}

class GameRepository {

  def getAll: DBIO[Seq[Game]] =
    table.sortBy(_.playedAt).result

  def create(game: Game): DBIO[Game] =
    insert += game

  private val table = TableQuery[GameTable]

  private val insert = table
    .returning(table.map(_.id))
    .into((inserted, id) => inserted.copy(id = id))
}
