FROM openjdk:8-alpine

COPY target/scala-2.13/elotracker-assembly-0.1.jar ./
COPY target/scala-2.13/webroot ./webroot

CMD java -jar elotracker-assembly-0.1.jar
