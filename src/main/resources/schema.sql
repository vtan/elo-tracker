CREATE TABLE "game" (
  "id" bigserial NOT NULL PRIMARY KEY,
  "playedAt" timestamp NOT NULL,
  "player1" text NOT NULL,
  "player2" text NOT NULL,
  "score1" double precision NOT NULL,
  "score2" double precision NOT NULL,
  "isDeleted" boolean NOT NULL
);

CREATE INDEX "game_playedAt" ON "game" ("playedAt");
