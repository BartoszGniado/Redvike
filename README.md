# Redvike

Redvike recruitment task

# Run application

To start application run:

```bash
$ docker-compose up
```

NOTE: require Compose V2: https://docs.docker.com/compose/cli-command/

By default app will run at http://localhost:8000

To change running port edit var NODE_LOCAL_PORT in .env file

All of REST API functionality available through generated Swagger documentation.

# About

Simple express Nodejs REST API with simple username - password authentication.

docker-compose builds two containers - one with mongodb and second with actual app.

This is my first experience with mongodb so it's probably not the best usage of it, but it's good learning opportunity for me.

Files like .csv and .env shouldn't be in repo (especially things like SESSION_SECRET) but here they are for running simplification (it's only demo app).

Spinning thing on a fancy home page is a thing found on the internet, but I added the control functionality myself.

# Roadmap

- Learn to better use mongodb - sorting, grouping, views usage
- Put simple React app on client side
- Experiment with different express middleware
