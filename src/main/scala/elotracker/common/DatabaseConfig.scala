package elotracker.common

import com.typesafe.config.{Config, ConfigFactory, ConfigValueFactory}

import java.net.URI
import scala.util.Try

object DatabaseConfig {

  def parse(databaseUrl: String): Config =
    Try {
      val uri = new URI(databaseUrl)
      val userInfo = uri.getUserInfo.split(":")
      val value = s"jdbc:postgresql://${uri.getHost}:${uri.getPort}${uri.getPath}?user=${userInfo(0)}&password=${userInfo(1)}"
      ConfigFactory.empty.withValue("database.url", ConfigValueFactory.fromAnyRef(value))
    }.getOrElse(ConfigFactory.empty)
}
