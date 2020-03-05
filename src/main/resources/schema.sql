CREATE TABLE "game" (
  "playedAt" timestamp NOT NULL PRIMARY KEY,
  "player1" text NOT NULL,
  "player2" text NOT NULL,
  "score1" double precision NOT NULL,
  "score2" double precision NOT NULL
);
