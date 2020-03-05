import { Game } from "./State"

interface Stats {
  victories: number,
  defeats: number,
  ties: number
}

const emptyStats: Stats = { victories: 0, defeats: 0, ties: 0 }

const addStats = (x: Stats, y: Stats): Stats =>
  ({
    victories: x.victories + y.victories,
    defeats: x.defeats + y.defeats,
    ties: x.ties + y.ties
  })

const statsToScore = (stats: Stats): number =>
  (stats.victories - stats.defeats) / (stats.victories + stats.defeats + stats.ties)

export interface PlayerStats extends Stats {
  player: string,
  score: number
}

export const calculateStats = (games: ReadonlyArray<Game>): ReadonlyArray<PlayerStats> => {
  const lookup: Record<string, Stats> = {}
  games.forEach(game => {
    let stats1, stats2
    if (game.score1 > game.score2) {
      stats1 = { ...emptyStats, victories: 1 }
      stats2 = { ...emptyStats, defeats: 1 }
    } else if (game.score1 < game.score2) {
      stats1 = { ...emptyStats, defeats: 1 }
      stats2 = { ...emptyStats, victories: 1 }
    } else {
      stats1 = stats2 = { ...emptyStats, ties: 1 }
    }
    lookup[game.player1] = addStats(lookup[game.player1] || emptyStats, stats1)
    lookup[game.player2] = addStats(lookup[game.player2] || emptyStats, stats2)
  })
  const result = Object.entries(lookup) .map(([player, stats]) =>
    ({ ...stats, player, score: statsToScore(stats) })
  )
  result.sort((a, b) => statsToScore(b) - statsToScore(a))
  return result
}
