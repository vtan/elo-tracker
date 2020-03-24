ALTER TABLE "group"
ADD "name" text NOT NULL DEFAULT '',
ADD "urlName" text NULL UNIQUE;

UPDATE "group" SET "urlName" = "id";

ALTER TABLE "group"
ALTER "name" DROP DEFAULT,
ALTER "urlName" SET NOT NULL;
