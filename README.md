[![Test](https://github.com/Nalhin/Movies/workflows/Test/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ATest)
[![CodeQL](https://github.com/Nalhin/Movies/workflows/CodeQL/badge.svg?branch=main)](https://github.com/Nalhin/Movies/actions?query=workflow%3ACodeQL)
[![codecov](https://codecov.io/gh/Nalhin/Movies/branch/main/graph/badge.svg?token=PJW2cYyuwC)](https://codecov.io/gh/Nalhin/Movies)
[![CodeFactor](https://www.codefactor.io/repository/github/nalhin/movies/badge)](https://www.codefactor.io/repository/github/nalhin/movies)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_backend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_backend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Movies_client&metric=alert_status)](https://sonarcloud.io/dashboard?id=Movies_client)
[![License](https://img.shields.io/github/license/nalhin/Chess)](LICENSE.md)

# Movies

Movie data aggregator with hexagonal architecture.

## Table of contents

* [Description](#description)
* [Features](#features)
* [Presentation](#presentation)
* [Architecture](#architecture)
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

The main (movie) "hexagon" has multiple output ports such as:

* TMBD movie REST API
* Live Wikipedia web scrapping
* SPARQL IMDB id to Wikipedia url resolver
* NLP question answering model
* Database persistence (PostgreSQL)


## Features

## Presentation

## Technology Stack

## Architecture

## Prerequisites

## Installation

## Tests

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
