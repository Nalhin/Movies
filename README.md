[![Test](https://github.com/Nalhin/Movies/workflows/Test/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ATest)
[![CodeQL](https://github.com/Nalhin/Movies/workflows/CodeQL/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ACodeQL)
[![codecov](https://codecov.io/gh/Nalhin/Movies/branch/main/graph/badge.svg?token=PJW2cYyuwC)](https://codecov.io/gh/Nalhin/Movies)
[![CodeFactor](https://www.codefactor.io/repository/github/nalhin/movies/badge)](https://www.codefactor.io/repository/github/nalhin/movies)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_backend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_backend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_client&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_client)
[![License](https://img.shields.io/github/license/nalhin/Movies)](LICENSE.md)

# Movies

Movie data aggregator based on the concepts of "Clean Architecture" and "Hexagonal Architecture".

## Table of contents

* [Description](#description)
* [Features](#features)
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

* TMDb movie REST API
* Live Wikipedia web scrapping
* SPARQL IMDB id to Wikipedia url resolver
* NLP question answering model
* Database persistence (PostgreSQL)

## Features

* Movie browsing
* List of favourites
* User rating system
* NLP movie plot question answering

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

Backend architecture was designed following the concepts of "Clean Architecture" and hexagonal architecture. The
business logic is separated from client access (input port), and it does not rely on the representation of external
data (output port). This separation is crucial as multiple external data sources are used in combination.

The project consists of two separated bounded contexts - user and movie. The contexts are entirely independent and can
operate as separate services.

Each context is composed of the adapter (input and output port implementation), application (application services and
port interfaces) and domain (domain objects) layer.

```
context
├── adapter (implementation of input/output ports)
├── application (application services and input/output ports interfaces)
└── domain (domain objects)
```

The use of input adapters separates the domain logic from the communication layer. If one was interested in integrating
GraphQL into the application, all he would have to do is provide different input adapters.

Output adapters serve a similar purpose. They separate the details of data access and persistence. Even though movie
data originates from multiple sources such as Wikipedia or TMBd, the application logic depends only on a particular
interface and not on concrete data provider representation.

```
adapter
├── input   
|   └──── web 
|          ├── dto
|          └── controllers
|
└── output
      ├── movie-data (movie data provider)
      ├── persistance (Database persistance)
      ├── plot-details (plot details adapter)
      ├── question-answering (question answering adapter)
      └── data-aggregators (persistance and external data adapter)
```

Application services are separated depending on their responsibility -query and command.  "Queries" usually don't
include complex business logic and domain objects; therefore, they can entirely skip the application layer. "Commands",
on the other hand, require complex constraint validation and domain rules. The responsibility of application services is
to follow the business logic embedded into use-cases (input ports) by interacting with domain objects.

```
application
├── port (input and output ports)
|    ├── in
|    |   ├── command
|    |   └── query
|    |
|    └── out (input ports - specific use cases)
|         ├── command
|         └── query
| 
└── service
       ├── command
       └── query
```

Domain objects encapsulate business rules specific to the domain. They enhance the code with domain-specific ambiguous
language.

```
domain 
├── model (models used by commands. They embed business logic)
└── read-model (data representation)
```

### Client

Client architecture closely follows modern React trends. React context and React Query is used instead of the global state
libraries. Such a design decision reduces clutter and allows the application to be tested with a mock REST API server
making the tests more reliable and robust.

```
src
├── core (communication with backend)
├── pages (views with page specific components)
└── shared (shared functionality)
    ├── components (reusable components)
    ├── context (react context providers and hooks)
    ├── models (data models that encapsulate business logic)
    ├── services (classes that encapsulate business logic and mobile specific api)
    ├── types (TypeScript types)
    └── utils (reusable, pure functions)
```

## REST API specification

Swagger API specification is available at [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/). The server
has to be up and running in for the documentation to be available.

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
