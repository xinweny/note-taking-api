# Note Taking API 📝

## Introduction

A REST API note-taking application built in [JavaScript (TypeScript)](https://www.typescriptlang.org/), [ExpressJS](https://expressjs.com/) and [Sequelize](https://sequelize.org/).

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Installation \& Setup](#installation--setup)
- [Database Schema](#database-schema)
- [Technical Analysis](#technical-analysis)
- [Future Considerations](#future-considerations)

## Features

- [x] Versioning system for notes, tracking their changes over time and allowing reversion to previous versions
- [x] Optimistic-locking to prevent concurrent edits of notes
- [x] Full-text searching of note contents by keyword, indexed to optimize performance
- [x] Soft-deletion of notes
- [x] Caching of frequently-accessed endpoints (e.g. getting all user notes and specific notes by ID)
- [x] Cache invalidation
- [x] JWT-based authentication with token refreshing
- [x] Note-sharing functionality with specific permissions
- [x] Upload multimedia files and attach them to notes
- [x] Containerization with [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
- [x] API documentation with [Swagger](https://swagger.io/)

## Installation & Setup

Please ensure that you have [Git](https://git-scm.com/) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your system.

```shell
  # Clone the repository
  git clone https://github.com/xinweny/note-taking-api.git
  cd note-taking-api

  # Create .env file from example (enter all variables or modify default values)
  cp .env.example .env

  # Start the application
  docker compose up # --watch to start in watch mode
```

Once the `app` container is running, the application can be accessed at http://localhost:3000.

```shell
  # Closing the application
  docker compose down
```

## Database Schema

## Technical Analysis

### Approach

### Reasoning

### Trade-offs

## Future Considerations

- Routes may need to be de-nested as application grows in functionality to prevent redundant routes
- Unit testing with [Jest](https://jestjs.io/) to reduce bugs and improve debugging speed
- Stricter TypeScript interfaces for response objects for better and more automated API documentation with Swagger, as well as improving documentation with examples
- Pagination of notes to reduce server load
- Version tracking through changes instead of whole document
- Migrate to [Sequelize v7](https://sequelize.org/docs/v7/) once stable, due to better TypeScript support
- Better management of `.env` variables to account for different environments (e.g. `production`)
