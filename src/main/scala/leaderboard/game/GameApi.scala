package leaderboard.game

import leaderboard.common.{Api, Id}
import leaderboard.authentication.AuthenticationService
import leaderboard.group.Group

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

class GameApi(gameService: GameService, userService: AuthenticationService) extends Api {

  val route: Route =
    (get & path("games") & parameter("groupId".as[Id[Group]])) { groupId =>
      authenticateOrRejectWithChallenge(userService.authenticator(groupId) _) { _ =>
        complete {
          gameService.getRatedGames
        }
      }
    } ~
    (get & path("games" / "deleted") & parameter("groupId".as[Id[Group]])) { groupId =>
      authenticateOrRejectWithChallenge(userService.authenticator(groupId) _) { _ =>
        complete {
          gameService.getDeletedGames
        }
      }
    } ~
    (post & path("games") & entity(as[NewGame])) { newGame =>
      authenticateOrRejectWithChallenge(userService.authenticator(newGame.groupId) _) { _ =>
        complete {
          gameService.create(newGame)
        }
      }
    } ~
    (put & path("games" / Id.Matcher[Game]) & entity(as[NewGame])) { (gameId, newGame) =>
      authenticateOrRejectWithChallenge(userService.authenticator(newGame.groupId) _) { _ =>
        complete {
          gameService.update(gameId, newGame)
        }
      }
    }
}
