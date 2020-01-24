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
