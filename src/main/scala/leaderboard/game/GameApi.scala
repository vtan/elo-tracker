package leaderboard.game

import leaderboard.common.Api
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
      (post & path("games") & entity(as[NewGame])) { newGame =>
        complete {
          gameService.create(newGame)
        }
      }
    }
}
