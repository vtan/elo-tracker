import { RatedGame, Game } from "./Game"

export const useFakeData: Boolean =
  new URLSearchParams(window.location.search).get('fakeData') !== null

export const fakeRatedGames: ReadonlyArray<RatedGame> =
  [
    {
      "game": { "id": "1", "playedAt": "2019-07-08T00:00", "player1": "Aaaaaaaaaaa", "player2": "Bbb", "score1": 11, "score2": 29.5, "isDeleted": false },
      "playerRatings": {
        "Aaaaaaaaaaa": { "rating": 1337.7878209893436, "deviation": 290.23024334413657 },
        "Bbb": { "rating": 1662.2121790106564, "deviation": 290.23024334413657 }
      }
    },
    {
      "game": { "id": "2", "playedAt": "2019-07-08T00:00:00.100", "player1": "Bbb", "player2": "Cccccc", "score1": 11, "score2": 11.5, "isDeleted": false },
      "playerRatings": {
        "Aaaaaaaaaaa": { "rating": 1337.7878209893436, "deviation": 296.3673297642585 },
        "Bbb": { "rating": 1492.1936087654099, "deviation": 260.34182443243037 },
        "Cccccc": { "rating": 1730.267373324762, "deviation": 287.6318104191129 }
      }
    },
    {
      "game": { "id": "3", "playedAt": "2019-07-09T00:00", "player1": "Bbb", "player2": "Dddddd", "score1": 38, "score2": -21, "isDeleted": false },
      "playerRatings": {
        "Aaaaaaaaaaa": { "rating": 1337.7878209893436, "deviation": 302.3798838408348 },
        "Bbb": { "rating": 1602.5184098282853, "deviation": 237.57332437846466 },
        "Cccccc": { "rating": 1730.267373324762, "deviation": 293.8231753367602 },
        "Dddddd": { "rating": 1327.98798861119, "deviation": 277.55039741574524 }
      }
    },
    {
      "game": { "id": "4", "playedAt": "2019-07-09T00:00:00.100", "player1": "Bbb", "player2": "Cccccc", "score1": 22, "score2": -8.5, "isDeleted": false },
      "playerRatings": {
        "Aaaaaaaaaaa": { "rating": 1337.7878209893436, "deviation": 308.2751922416021 },
        "Bbb": { "rating": 1729.399834469859, "deviation": 219.7524749898605 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 251.02003442050204 },
        "Dddddd": { "rating": 1327.98798861119, "deviation": 283.9616578090044 }
      }
    },
    {
      "game": { "id": "5", "playedAt": "2019-07-10T00:00", "player1": "Bbb", "player2": "Aaaaaaaaaaa", "score1": 12, "score2": 13.5, "isDeleted": false },
      "playerRatings": {
        "Aaaaaaaaaaa": { "rating": 1653.280147622543, "deviation": 280.19951935550694 },
        "Bbb": { "rating": 1572.438276186566, "deviation": 215.1678989556231 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 258.0911809428405 },
        "Dddddd": { "rating": 1327.98798861119, "deviation": 290.2313268853625 }
      }
    },
    {
      "game": { "id": "6", "playedAt": "2019-07-11T00:00", "player1": "E", "player2": "Bbb", "score1": 9, "score2": 3.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 296.3683908679165 },
        "Aaaaaaaaaaa": { "rating": 1653.280147622543, "deviation": 286.55151482247845 },
        "E": { "rating": 1702.928412947239, "deviation": 271.96265037783735 },
        "Bbb": { "rating": 1479.8372631165296, "deviation": 205.50550784075537 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 264.9736924309091 }
      }
    },
    {
      "game": { "id": "7", "playedAt": "2019-07-15T00:00", "player1": "E", "player2": "Bbb", "score1": -5, "score2": 36.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 302.380923845467 },
        "Aaaaaaaaaaa": { "rating": 1653.280147622543, "deviation": 292.76572655804006 },
        "E": { "rating": 1497.458155157721, "deviation": 240.97826403036825 },
        "Bbb": { "rating": 1602.0338793680553, "deviation": 197.87606153736255 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 271.68190532398364 }
      }
    },
    {
      "game": { "id": "8", "playedAt": "2019-07-16T00:00", "player1": "Aaaaaaaaaaa", "player2": "Bbb", "score1": 14, "score2": 18.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 308.27621235774603 },
        "Aaaaaaaaaaa": { "rating": 1493.4227200453122, "deviation": 243.25097908669858 },
        "E": { "rating": 1497.458155157721, "deviation": 248.3355063922392 },
        "Bbb": { "rating": 1685.4602340514884, "deviation": 190.0006450969221 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 278.22842716097506 }
      }
    },
    {
      "game": { "id": "9", "playedAt": "2019-07-17T00:00", "player1": "Ffffff", "player2": "Bbb", "score1": -17, "score2": 31.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 314.0608589201114 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 277.10508827546414 },
        "Aaaaaaaaaaa": { "rating": 1493.4227200453122, "deviation": 250.54149122777542 },
        "E": { "rating": 1497.458155157721, "deviation": 255.48096550445766 },
        "Bbb": { "rating": 1729.9338150886504, "deviation": 187.44311086568382 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 284.6244151166059 }
      }
    },
    {
      "game": { "id": "10", "playedAt": "2019-08-01T00:00", "player1": "Bbb", "player2": "Gggggg", "score1": 23, "score2": -24, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 319.7408686821847 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 283.52641843072183 },
        "Aaaaaaaaaaa": { "rating": 1493.4227200453122, "deviation": 257.62577283074273 },
        "E": { "rating": 1497.458155157721, "deviation": 262.43194114872887 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 281.9537508402608 },
        "Bbb": { "rating": 1768.8739240864293, "deviation": 186.06995399992462 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 290.87979936817544 }
      }
    },
    {
      "game": { "id": "11", "playedAt": "2019-08-09T00:00", "player1": "Aaaaaaaaaaa", "player2": "Bbb", "score1": 23, "score2": 19.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 325.32172246199315 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 289.80550365400717 },
        "Aaaaaaaaaaa": { "rating": 1706.625759573557, "deviation": 234.3433908178408 },
        "E": { "rating": 1497.458155157721, "deviation": 269.2034987422896 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 288.26709422494247 },
        "Bbb": { "rating": 1654.0008419586786, "deviation": 183.82223183747485 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 297.0034640883335 }
      }
    },
    {
      "game": { "id": "12", "playedAt": "2019-09-28T00:00", "player1": "Bbb", "player2": "Aaaaaaaaaaa", "score1": 21, "score2": 10.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 330.80843868565097 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 295.9513979493132 },
        "Aaaaaaaaaaa": { "rating": 1586.3153303618137, "deviation": 208.4790881488781 },
        "E": { "rating": 1497.458155157721, "deviation": 275.8088536198392 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 294.4451011867779 },
        "Bbb": { "rating": 1734.1705711233421, "deviation": 177.1025420141359 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 303.00339549330135 }
      }
    },
    {
      "game": { "id": "13", "playedAt": "2019-09-11T00:00", "player1": "Aaaaaaaaaaa", "player2": "Bbb", "score1": 19, "score2": 26.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 336.2056262254368 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 301.9722337370652 },
        "Aaaaaaaaaaa": { "rating": 1525.9239574636617, "deviation": 193.8115834472616 },
        "E": { "rating": 1497.458155157721, "deviation": 282.25967429849044 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 300.4961191311659 },
        "Bbb": { "rating": 1780.9857003958546, "deviation": 172.5619647368433 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 308.88680399212586 }
      }
    },
    {
      "game": { "id": "14", "playedAt": "2020-01-14T00:00", "player1": "Bbb", "player2": "E", "score1": 37, "score2": 6.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 341.5175297193954 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 307.8753480682608 },
        "Aaaaaaaaaaa": { "rating": 1525.9239574636617, "deviation": 202.88649506148712 },
        "E": { "rating": 1436.1544503119314, "deviation": 250.65876633029546 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 306.4276710953041 },
        "Bbb": { "rating": 1810.5371978154947, "deviation": 173.65742637645215 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 314.6602257681609 }
      }
    },
    {
      "game": { "id": "15", "playedAt": "2020-01-15T00:00", "player1": "E", "player2": "Bbb", "score1": 5, "score2": 33.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 346.748068640098 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 313.6673874475202 },
        "Aaaaaaaaaaa": { "rating": 1525.9239574636617, "deviation": 211.57251683130974 },
        "E": { "rating": 1398.8554359509908, "deviation": 236.1473630517981 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 312.24656541408405 },
        "Bbb": { "rating": 1832.4435855328627, "deviation": 176.02493573366007 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 320.3296078736244 }
      }
    },
    {
      "game": { "id": "16", "playedAt": "2020-01-21T00:00", "player1": "Bbb", "player2": "Aaaaaaaaaaa", "score1": 5, "score2": 32.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 319.35439553598246 },
        "Aaaaaaaaaaa": { "rating": 1693.3281106796667, "deviation": 202.87266466001844 },
        "E": { "rating": 1398.8554359509908, "deviation": 243.65052242159823 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 317.95898731265936 },
        "Bbb": { "rating": 1714.3212793610542, "deviation": 175.8168216390938 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 325.90037999436265 }
      }
    },
    {
      "game": { "id": "17", "playedAt": "2020-01-27T00:00", "player1": "Bbb", "player2": "E", "score1": 19, "score2": 2.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 324.9418870323627 },
        "Aaaaaaaaaaa": { "rating": 1693.3281106796667, "deviation": 211.5592542675841 },
        "E": { "rating": 1354.6286100811521, "deviation": 227.03717216321755 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 323.5705759380662 },
        "Bbb": { "rating": 1741.5712636455914, "deviation": 176.35403405824874 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 331.377515351404 }
      }
    },
    {
      "game": { "id": "18", "playedAt": "2020-02-06T00:00", "player1": "Hhhh", "player2": "Bbb", "score1": -14, "score2": 40.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 330.43491030481744 },
        "Aaaaaaaaaaa": { "rating": 1693.3281106796667, "deviation": 219.90297420966434 },
        "Hhhh": { "rating": 1408.3108720367584, "deviation": 282.40975010205375 },
        "E": { "rating": 1354.6286100811521, "deviation": 234.83159400700427 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 329.0864895629899 },
        "Bbb": { "rating": 1775.7992308974276, "deviation": 177.2570964673211 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 336.7655826839643 }
      }
    },
    {
      "game": { "id": "19", "playedAt": "2020-02-10T00:00", "player1": "Aaaaaaaaaaa", "player2": "Bbb", "score1": 26, "score2": 25.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 335.8381007988116 },
        "Aaaaaaaaaaa": { "rating": 1811.662381238358, "deviation": 199.51177293911456 },
        "Hhhh": { "rating": 1408.3108720367584, "deviation": 288.7131222385024 },
        "E": { "rating": 1354.6286100811521, "deviation": 242.3754887439538 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 334.51146110842285 },
        "Bbb": { "rating": 1693.6897782434132, "deviation": 172.01282804414762 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 342.0687908600695 }
      }
    },
    {
      "game": { "id": "20", "playedAt": "2020-02-21T00:00", "player1": "Bbb", "player2": "E", "score1": 29, "score2": -0.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 341.1557268288966 },
        "Aaaaaaaaaaa": { "rating": 1811.662381238358, "deviation": 208.33854070072778 },
        "Hhhh": { "rating": 1408.3108720367584, "deviation": 294.881784708219 },
        "E": { "rating": 1314.4082515353011, "deviation": 227.58859356711403 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 339.8498456861381 },
        "Bbb": { "rating": 1717.949543588358, "deviation": 173.78900975243712 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 347.2910273538174 }
      }
    },
    {
      "game": { "id": "21", "playedAt": "2020-03-04T00:00", "player1": "Hhhh", "player2": "E", "score1": 0, "score2": 38.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 346.39172904120085 },
        "Aaaaaaaaaaa": { "rating": 1811.662381238358, "deviation": 216.80624423966393 },
        "Hhhh": { "rating": 1234.7483968547842, "deviation": 249.0785705575554 },
        "E": { "rating": 1426.1495147577366, "deviation": 212.12925746732378 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 345.1056615196162 },
        "Bbb": { "rating": 1717.949543588358, "deviation": 183.85488818830106 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 350 }
      }
    },
    {
      "game": { "id": "21", "playedAt": "2020-03-05T00:00", "player1": "Bbb", "player2": "E", "score1": 24, "score2": 0.5, "isDeleted": false },
      "playerRatings": {
        "Dddddd": { "rating": 1327.98798861119, "deviation": 350 },
        "Ffffff": { "rating": 1392.1900544350583, "deviation": 350 },
        "Aaaaaaaaaaa": { "rating": 1811.662381238358, "deviation": 224.95543456718002 },
        "Hhhh": { "rating": 1234.7483968547842, "deviation": 256.2033065965291 },
        "E": { "rating": 1387.2506966433416, "deviation": 202.7630648595027 },
        "Gggggg": { "rating": 1404.7018791591297, "deviation": 350 },
        "Bbb": { "rating": 1749.3144212739721, "deviation": 181.61734847684312 },
        "Cccccc": { "rating": 1546.6760469117635, "deviation": 350 }
      }
    }
  ]

export const fakeDeletedGames: ReadonlyArray<Game> = [
  { "id": "22", "playedAt": "2020-03-06T00:00", "player1": "Bbb", "player2": "E", "score1": 12, "score2": 20, "isDeleted": true }
]
