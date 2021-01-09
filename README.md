# Ichnaea

## About

**Ichnaea was the goddess of tracing and tracking.**

Ichnaea is an IoT solution that collects and analyzes body position data from an athlete in real-time.

# Installation

Clone the project:

    git clone git@github.com:xrazis/ichnaea.git

## Run in Docker

_First make sure you have the docker service and docker-compose installed_

    docker-compose up --detach

# Server endpoints

## Authentication

**POST** `/auth/login`

If the user exists in the DB, a new session is initiated. Else if the user is not registered, user is saved then a new
session initiates.

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