package leaderboard

import leaderboard.common.{Api, DatabaseConfig, DatabaseProfile}
import leaderboard.game.{GameApi, GameRepository, GameService}
import leaderboard.authentication.AuthenticationService
import leaderboard.group.{GroupApi, GroupRepository, GroupService}

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.ExceptionHandler
import akka.stream.Materializer
import com.typesafe.config.ConfigFactory
import org.flywaydb.core.Flyway

object Main {

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem()
    implicit val materializer: Materializer = Materializer(system)
    import system.dispatcher

    val config = {
      val defaultConfig = ConfigFactory.load()
      val databaseConfig =
        Option(System.getenv("DATABASE_URL")).filter(_.nonEmpty).fold(ConfigFactory.empty)(DatabaseConfig.parse)
      databaseConfig.withFallback(defaultConfig)
    }

    Flyway.configure.dataSource(config.getString("database.url"), "", "").load.migrate

    val database = DatabaseProfile.api.Database.forConfig("database", config)

    val groupRepository = new GroupRepository
    val groupService = new GroupService(database, groupRepository)
    val groupApi = new GroupApi(groupService)

    val authenticationService = new AuthenticationService(database, groupRepository)

    val gameRepository = new GameRepository
    val gameService = new GameService(database, gameRepository)
    val gameApi = new GameApi(gameService, authenticationService)

    implicit val exceptionHandler: ExceptionHandler = Api.exceptionHandler(system.log)
    val route = {
      val serveApp = getFromFile("webroot/index.html")
      pathPrefix("api") {
        gameApi.route ~
        groupApi.route
      } ~
      pathSingleSlash { serveApp } ~
      path("[a-z0-9-]+".r) { _ => serveApp } ~
      getFromDirectory("webroot")
    }

    val host = "0.0.0.0"
    val port = Option(System.getenv("PORT")).filter(_.nonEmpty).flatMap(_.toIntOption).getOrElse(8081)
    Http().bindAndHandle(route, host, port).foreach { _ =>
      system.log.info(s"Application running on $host:$port")
    }

    System.console match {
      case null => ()
      case console =>
        system.log.info("Running with terminal input, enter a line to terminate")
        console.readLine()
        system.log.info("Terminating")
        val _ = system.terminate()
    }
  }
}

