# super-enigma-service

super-enigma-service is a REST API Service that will give you a quick and easy way to get data from the database.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Download Node.js not lower than version 8.10, [Yarn](https://yarnpkg.com/) and [MongoDB Docker image](https://hub.docker.com/_/mongo). Also install and run on your local machine [data-worker](https://github.com/IlonaMenkui/data-worker) in order to populate your database.

### Clone

Clone this repo to your local machine using `https://github.com/IlonaMenkui/super-enigma-service.git`

### Declare environment variables in .env file

Create and add application configuration to .env file in the root of the project:

```
APP_PORT=3000
DB_URI=mongodb://localhost:27017/super-enigma-db
```

## Installation

Use the package manager Yarn to install all the dependencies of super-enigma-service.

```
yarn install
```

## Available Scripts

In the project directory, you can run:

```
yarn start
```

Runs the app.<br>

The app will reload if you make changes to the code.<br>

## Run Docker container with MongoDB

You can use this application without running data-worker every time (if you don't need updated data). You may run data-worker once just for populating the database. But you need MongoDB to always be up and running.

Run your docker image with MongoDB:
```
docker run --name some-mongo -d mongo:tag
```
... where ```some-mongo``` is the name you want to assign to your container and ```tag``` is the tag specifying the MongoDB version you want.

... or run the make utility in the project directory:
```
make run-mongo
```

## Run Docker container with project and MongoDB
First, make sure that [MongoDB is running](#run-db).
Then you need to build a docker image.
```
make build-image
```

In the end, run the docker container with server.
```
docker run -P -d --rm --env TMDB_API_KEY=YOURSECRETAPIKEY --name service-name --link db-name:db image-uri:image-version
```
... where ```service-name``` is the server name, ```db-name``` is the database name and so on.

... or run the following command:

```
make run-service
```

## Stop Docker container with project and MongoDB
To stop the service use:
```
docker stop service-name
```
... or:
```
make stop-service
```
And to stop Docker container with MongoDB use:
```
docker stop some-mongo
```
... or:
```
make stop-mongo
```

## Available commands in the Makefile

`build-image` - build an image from a Dockerfile with the service.

`run-service` - run a docker container with the service.

`stop-service` - stop running container with the service.

`image-publish` - push an image with the service to a registry.

`run-mongo` - run a docker container with MongoDB.

`stop-mongo` - stop running container with MongoDB.

## Available endpoints

`GET /movies` - get a list of movies.

`GET /movies/:id` - get movie by id.

`GET /genres` - get a ist of genres.

`GET /genres/:id` - get one genre by id.


## Build With
* [Koa](https://koajs.com/) - is a middleware for Node.js using ES2017 async functions.
* [Node.js](https://nodejs.org) - is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [MongoDB](https://www.mongodb.com/) - is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

[MIT license](https://choosealicense.com/licenses/mit/)
