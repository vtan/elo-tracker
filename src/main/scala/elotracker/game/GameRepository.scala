package elotracker.game

import elotracker.common.DatabaseProfile.api._

import java.time.LocalDateTime
import slick.lifted.ProvenShape

private class GameTable(tag: Tag) extends Table[Game](tag, "game") {
  def playedAt: Rep[LocalDateTime] = column[LocalDateTime]("playedAt")
  def player1: Rep[String] = column[String]("player1")
  def player2: Rep[String] = column[String]("player2")
  def score1: Rep[Double] = column[Double]("score1")
  def score2: Rep[Double] = column[Double]("score2")

  def * : ProvenShape[Game] =
    (playedAt, player1, player2, score1, score2) <> ((Game.apply _).tupled, Game.unapply)
}

class GameRepository {

  def getAll: DBIO[Seq[Game]] =
    table.sortBy(_.playedAt).result

  def create(game: Game): DBIO[Int] =
    table += game

  private val table = TableQuery[GameTable]
}
