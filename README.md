# leaderboard

A leaderboard application using the Glicko rating system.

### Running the frontend locally with fake data
```
yarn start
```
Then go to http://localhost:8080/?fakeData.

### Running the whole application locally
Run these in parallel:
```
docker run -p 127.0.0.1:5432:5432 postgres:10.5-alpine
sbt run
yarn start
```
Then go to http://localhost:8080.

### Building and deploying to Heroku
```
yarn build
sbt assembly
heroku container:push web -a $APPNAME
heroku container:release web -a $APPNAME
```
