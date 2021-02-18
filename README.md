[![Test](https://github.com/Nalhin/Movies/workflows/Test/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ATest)
[![CodeQL](https://github.com/Nalhin/Movies/workflows/CodeQL/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ACodeQL)
[![codecov](https://codecov.io/gh/Nalhin/Movies/branch/main/graph/badge.svg?token=PJW2cYyuwC)](https://codecov.io/gh/Nalhin/Movies)
[![CodeFactor](https://www.codefactor.io/repository/github/nalhin/movies/badge)](https://www.codefactor.io/repository/github/nalhin/movies)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_backend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_backend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_client&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_client)
[![License](https://img.shields.io/github/license/nalhin/Movies)](LICENSE.md)

# Movies

Movie data aggregator with hexagonal architecture.

## Table of contents

* [Description](#description)
* [Features](#features)
* [Presentation](#presentation)
* [Architecture](#architecture)
* [REST API specification](#rest-api-specification)  
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Tests](#tests)
* [License](#license)

## Description

Nest.js hexagonal architecture implementation based on "Get Your Hands Dirty on Clean Architecture" by Tom Hombergs
and "Clean architecture" by Robert C. Martin.

The API consists of two boundary contexts:

* user boundary context is responsible for authentication and authorization
* movie boundary context is responsible for movie data aggregation

The service integrates with multiple external data sources such as

* TMBD movie REST API
* Live Wikipedia web scrapping
* SPARQL IMDB id to Wikipedia url resolver
* NLP question answering model
* Database persistence (PostgreSQL)

## Features

* Movie browsing 
* List of favourites
* User rating system  
* NLP movie plot question answering

## Presentation

## Technology Stack

### Client

* TypeScript
* React Native
* Expo  
* React Query
* React Navigation  
* Tailwind
* Formik
* Jest
* Mock Service Worker
* React Testing Library

### Backend

* TypeScript
* NestJs
* PostgreSQL
* Redis  
* Rxjs
* Passport
* fp-ts  
* Jest
* Mock Service Worker

## Architecture

### Backend


### Client

## REST API specification

Swagger API specification is available at [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/). 
The server has to be up and running in for the documentation to be available.

## Prerequisites

### Shared

Install (node)[https://nodejs.org/en], (npm)[https://www.npmjs.com]  and [yarn](https://yarnpkg.com). You should be able
to run the following commands.

```bash
node --version
npm --version
yarn --version
```

### Backend

Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/). You should be
able to run the following commands.

```bash
docker --version
docker-compose --version
```

## Installation

Run the following commands before proceeding to the sections below.

### Shared

```bash
docker-compose -f ./docker/docker-compose.test.yml up -d
```

### Frontend

```bash
cd frontend
yarn install
yarn run start
```

### Backend

```bash
cd backend
yarn install
yarn run start
```

## Tests

In order to manually run tests, follow the instructions below.

## Client

```bash
cd client
yarn run test
```

## Backend

```bash
docker-compose -f ./docker/docker-compose.test.yml up -d
cd backend
yarn run test
yarn run test:e2e
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
