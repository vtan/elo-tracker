package leaderboard.group

import leaderboard.common.DatabaseProfile

import scala.concurrent.Future

class GroupService(
  database: DatabaseProfile.api.Database,
  groupRepository: GroupRepository
) {

  def getAll: Future[Seq[Group]] =
    database.run(groupRepository.getAll)
}
