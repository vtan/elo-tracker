FROM openjdk:8-alpine

COPY target/scala-2.13/leaderboard-assembly-0.1.jar ./
COPY target/scala-2.13/webroot ./webroot

CMD java -jar leaderboard-assembly-0.1.jar
