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
- [Client](#client)
- [Run](#run)
- [Exposed Ports](#exposed-ports)
- [Notes](#notes)
- [Resources](#resources)

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

To begin with, deployment is handled by docker and docker-compose. Abstracting the configuration to a handy `.yaml`
file, while keeping the dev environment the same across machines makes deployment a breeze. Running the project will
create the following services:

- Three Databases, each for its distinct purpose:
    - **Redis**, used for caching and pub-sub.
    - **Influxdb**, used to store the bulk of data produced from the client devices (athletes).
        - A **Grafana** instance, attached to the influx cluster.
    - **MongoDB**, used as the user store.
- **Backend**, a Node.js server that is responsible for data and user storage, client and SPA socket connection, and
  exposing an API.
- **Frontend**, an SPA built on Vue with Typescript.
- **Client**, a Node.js app that collects and sends the data to the backend.

# Server endpoints

The following routes are exposed by the backend.

## Authentication

###### POST `/auth/login`

*If the user exists in the DB, a new session is initiated.*

###### POST `/auth/register`

*Registers a user with the given params and initiates a new session.*

###### POST `/auth/logout`

*Logouts current user.*

###### GET `/auth/current_user`

*Returns current user.*

## API

### User

###### PUT `/api/user/{user._id}`

*Updates a user matching the given _id.*

### Athletes

###### GET `/api/athletes`

*Returns an array of athletes objects.*

###### GET `/api/athlete/{user._id}`

*Returns an athlete object for a given _id.*

###### PUT `/api/athlete/{user._id}`

*Updates an athlete matching the given _id.*

###### DELETE `/api/athlete/{user._id}`

*Deletes an athlete matching the given _id.*

### Data

###### GET `/api/data`

*Returns all data in the specified time range.*

###### GET `/api/data/{user._id}`

*Returns all data for a given user _id, in the specified time range.*

# Client

The client can either run on the host machine or on a _Raspberry Pi_ that acts like a getaway for the
_Arduino_. You can use an _IMU_ connected to any compatible microcontroller with
[Johnny-five](http://johnny-five.io/platform-support/), see [here](http://johnny-five.io/api/imu/) on how to connect it.

The client does some basic calculations with the help of `Johnny-five`, then the data is then streamed to the server and
subsequently to the frontend. The frontend does the final calculations that are needed for the model visualization. This
way we avoid making any 'heavy' computations on the client device, thus allowing for small and power efficient getaways
like a _Pi Zero_ with multiple microcontrollers attached on it. Implementation specific details can be found in the
thesis itself.

During the development process I used my host machine as a getaway, and an _Arduino UNO_ with an _Invesense MPU6050_
on a HAT. Although this is a cumbersome solution, it proved a quick way to bootstrap a working solution and avoid
soldering. Ideally I would use an _Arduino Nano_ with a LoRa adapter in order to have a wireless connection to the
getaway, maybe a future improvement!

# Run

Clone the project:

    git clone git@github.com:xrazis/ichnaea.git

_First, make sure you have the docker service and docker-compose installed, then:_

    docker-compose up --detach

In a few moments, Ichnaea will be up and running! Visit `localhost:8080` to view the web dashboard.

I develop on Jetbrains products, so the run scripts should be available once you launch Webstorm.

### Arduino

If you use your host machine for a getaway just connect the _Arduino_ to any USB port, and deploy the docker-compose
file. Alternatively, install docker to a _Raspberry_, connect the _Arduino_, and run the client container standalone. Be
sure to enter the correct IP in the client config so a socket connection can be established with the server.

# Exposed Ports

The following services and respective ports are exposed:

|Service |Port |Usage
--- | --- | ---
|Influxdb|`{ip}:8086`|Web UI
|Grafana|`{ip}:3000`|Web UI
|MongoDB|`{ip}:27017`|Shell
|Backend|`{ip}:8000`|Socket and API
|Backend|`{ip}:9229`|Debugger
|Frontend|`{ip}:8080`|Web UI

The {ip} should be localhost if running locally, or the ip of the server you are running the services on (obv).

# Notes

1. When the docker-compose is up and running, and you observe the backend container output you will notice that a
   connection cannot be established with influxdb. That's because the influx container is not ready yet. Don't confuse
   that with the `depends_on` option. As described in
   the [docker docs](‘https://docs.docker.com/compose/startup-order/‘) :

   > However, for startup Compose does not wait until a container is “ready” (whatever that means for your particular
   > application) - only until it’s running.

   TL;DR waiting a few seconds for all services to become available will solve this, and data will be written to influx.

# Resources

### IMU

- [Euler angles on wiki](https://en.wikipedia.org/wiki/Euler_angles)
- [Quaternion on wiki](https://en.wikipedia.org/wiki/Quaternion)
- [Visualizing quaternions](https://eater.net/quaternions)
- [Johnny-five IMU API](http://johnny-five.io/api/imu/)