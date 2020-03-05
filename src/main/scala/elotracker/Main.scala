package elotracker

import elotracker.common.{Api, DatabaseConfig, DatabaseProfile}
import elotracker.game.{GameApi, GameRepository, GameService}
import elotracker.user.UserService

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.server.Directives._
import akka.http.scaladsl.server.ExceptionHandler
import akka.stream.ActorMaterializer
import com.typesafe.config.ConfigFactory

object Main {

  def main(args: Array[String]): Unit = {
    implicit val system: ActorSystem = ActorSystem()
    implicit val materializer: ActorMaterializer = ActorMaterializer()
    import system.dispatcher

    val config = {
      val defaultConfig = ConfigFactory.load()
      val databaseConfig =
        Option(System.getenv("DATABASE_URL")).filter(_.nonEmpty).fold(ConfigFactory.empty)(DatabaseConfig.parse)
      databaseConfig.withFallback(defaultConfig)
    }

    val database = DatabaseProfile.api.Database.forConfig("database", config)

    val userService = new UserService

    val gameRepository = new GameRepository
    val gameService = new GameService(database, gameRepository)
    val gameApi = new GameApi(gameService, userService)

    implicit val exceptionHandler: ExceptionHandler = Api.exceptionHandler(system.log)
    val route =
      pathPrefix("api") {
        gameApi.route
      } ~
      pathSingleSlash { getFromFile("webroot/index.html") } ~
      getFromDirectory("webroot")

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

