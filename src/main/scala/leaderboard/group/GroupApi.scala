package leaderboard.group

import leaderboard.common.Api

import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.Route

class GroupApi(groupService: GroupService) extends Api {

  val route: Route =
    (get & path("groups")) {
      complete {
        groupService.getAll
      }
    }
}
