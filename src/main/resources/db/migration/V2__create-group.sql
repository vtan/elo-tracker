CREATE TABLE "group" (
  "id" bigserial PRIMARY KEY,
  "password" text NOT NULL
);

INSERT INTO "group" ("id", "password") VALUES (0, '');

ALTER TABLE "game" ADD "groupId" bigint NOT NULL DEFAULT 0 REFERENCES "group" ("id");

ALTER TABLE "game" ALTER "groupId" DROP DEFAULT;
