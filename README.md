# Ichnaea

`Part of my thesis`

## About

**Ichnaea was the goddess of tracing and tracking.**

Ichnaea is an IoT solution that collects and analyzes body position data from an athlete in real-time. Running the
project will create the following services:

- Redis
- Influxdb
- Mongodb
- Grafana
- Backend
- Frontend
- Test client

To better understand how all this correlates to each other, take a look at the following diagram:

![](https://i.ibb.co/LZMzkg9/thesis.png)

_At this moment the influx cluster has not been implemented_

There are three databases, each for its distinct purpose. Redis is used for caching and pub-sub, MongoDB is the user
store and lastly the bulk of data produced from the athletes are stored in a cluster of Influxdb's with a Grafana
instance attached. The backend is handled by a Node.js server, being responsible for data and user storage, client socket connection and exposing an API. The frontend is build with Vue and deployment is handled by Docker with
docker-compose. The test client that is now being deployed is nothing more than a fake generator of data for testing. 

# Server endpoints

The following routes are exposed by the backend.

## Authentication

**POST** `/auth/login`

If the user exists in the DB, a new session is initiated.

**POST** `/auth/register`

Registers a user with the given params and initiates a new session.

**POST** `/auth/logout`

Logouts current user.

**GET** `/auth/current_user`

Returns current user.

## API

### User

**PUT** `/api/user/{user._id}`

Updates a user matching the given _id.

### Athletes

**GET** `/api/athletes`

Returns an array of athletes objects.

**GET** `/api/athlete/{user._id}`

Returns an athlete object for a given _id.

**PUT** `/api/athlete/{user._id}`

Updates an athlete matching the given _id.

**DELETE** `/api/athlete/{user._id}`

Deletes an athlete matching the given _id.

### Data

**GET** `/api/data`

Returns all data in the specified time range.

**GET** `/api/data/{user._id}`

Returns all data for a given user _id, in the specified time range.

# Installation

Clone the project:

    git clone git@github.com:xrazis/ichnaea.git

_First make sure you have the docker service and docker-compose installed, then:_

    docker-compose up --detach

In a few moments Ichnaea will be running! Visit localhost:8080 to view the web dashboard.
