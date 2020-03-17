package leaderboard.game

import leaderboard.common.{Api, Id}
import leaderboard.user.UserService

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

class GameApi(gameService: GameService, userService: UserService) extends Api {

  val route: Route =
    authenticateOrRejectWithChallenge(userService.authenticator _) { _ =>
      (get & path("games")) {
        complete {
          gameService.getRatedGames
        }
      } ~
      (get & path("games" / "deleted")) {
        complete {
          gameService.getDeletedGames
        }
      } ~
      (post & path("games") & entity(as[NewGame])) { newGame =>
        complete {
          gameService.create(newGame)
        }
      } ~
      (put & path("games" / Id.Matcher[Game]) & entity(as[NewGame])) { (gameId, newGame) =>
        complete {
          gameService.update(gameId, newGame)
        }
      }
    }
}
