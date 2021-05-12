# Ichnaea

`Part of my thesis`

*If you want to use or build on this project, and or have any questions at all, don’t hesitate to contact me.*

# Index

- [Thesis](#thesis)
- [About](#about)
- [Architecture](#architecture)
- [Server Endpoints](#server-endpoints)
    - [Authentication](#authentication)
    - [API](#api)
        - [User](#user)
        - [Athletes](#athletes)
        - [Data](#data)
- [Run](#run)
- [Notes](#notes)

# Thesis

**Personal Area Networks applications on sports**

The object of
this [dissertation](‘https://docs.google.com/document/d/1zNubZOa3iGul6aKc-KWD4Afp0-QCcN0imnfrWFr1nv8/edit?usp=sharing‘)
is the study of the architecture of Body Area Networks (BAN) and Personal Area Networks (PAN), and their applications,
with the aim of optimizing the performance of athletes, by enhancing personalized training practices. In the context of
the thesis, subjects that will be studied include the collection of data for the recognition of the physical posture of
the athlete’s body, as well as the design of smart IoT services with an emphasis on sports. Finally, an “e-sport”
application will be designed and implemented which will collect and analyze data on the athlete’s body position in
real-time.

# About

**Ichnaea was the goddess of tracing and tracking.**

Ichnaea is an IoT solution that collects and analyzes body position data from an athlete in real-time. It is the
“e-sport” application described in the [thesis](#thesis) section. Although the specifications of the app are set, I plan
to keep building on it as I explore my interests on the web front.

# Architecture

To begin, deployment is handled by docker and docker-compose. Abstracting the configuration to a handy `.yaml` file,
while keeping the dev environment the same across machines makes the deployment a breeze. Running the project will
create the following services:

- There are three **Databases**, each for its distinct purpose:
    - **Redis** is used for caching and pub-sub.
    - **Influxdb** stores the bulk of data produced from the client devices (athletes).
    - **MongoDB** is the user store.
- A **Grafana** instance is attached to the influx cluster.
- **Backend** is being handled by a Node.js server that is responsible for data and user storage, client and SPA socket
  connection, and exposing an API.
- The **Frontend** is a SPA built on Vue with typescript.
- And finally, a **Test client** that is nothing more than a fake aggregator of data, for testing purposes.

# Server endpoints

The following routes are exposed by the backend.

## Authentication

##### POST `/auth/login`

*If the user exists in the DB, a new session is initiated.*

##### POST `/auth/register`

*Registers a user with the given params and initiates a new session.*

##### POST `/auth/logout`

*Logouts current user.*

##### GET `/auth/current_user`

*Returns current user.*

## API

### User

##### PUT `/api/user/{user._id}`

*Updates a user matching the given _id.*

### Athletes

##### GET `/api/athletes`

*Returns an array of athletes objects.*

##### GET `/api/athlete/{user._id}`

*Returns an athlete object for a given _id.*

##### PUT `/api/athlete/{user._id}`

*Updates an athlete matching the given _id.*

##### DELETE `/api/athlete/{user._id}`

*Deletes an athlete matching the given _id.*

### Data

##### GET `/api/data`

*Returns all data in the specified time range.*

##### GET `/api/data/{user._id}`

*Returns all data for a given user _id, in the specified time range.*

# Run

Clone the project:

    git clone git@github.com:xrazis/ichnaea.git

_First, make sure you have the docker service and docker-compose installed, then:_

    docker-compose up --detach

In a few moments, Ichnaea will be up and running! Visit `localhost:8080` to view the web dashboard.

# Notes

Upon running the `docker-compose` file, and observing the backend output you will notice that a connection cannot be
established with influxdb. That is due to `depends_on` option, as described in
the [docker docs](‘https://docs.docker.com/compose/startup-order/‘) :

    However, for startup Compose does not wait until a container is “ready” (whatever that means for your particular application) - only until it’s running.

TL;DR: waiting a few seconds for all services to become available will solve this, and data will be written to influx. 