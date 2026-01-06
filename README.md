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
- [x] Optimistic locking to prevent concurrent edits of notes
- [x] Full-text searching of note contents by keyword, indexed to optimize performance
- [x] Soft-deletion of notes
- [x] Caching of frequently-accessed endpoints (e.g. getting all user notes and specific notes by ID) using [Redis](https://redis.io/)
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

The application can be accessed at <http://localhost:3000> once the server is running on the `app` container.

```shell
  # Closing the application
  docker compose down
```

## Database Schema

![Database Schema](./public/db-schema.png 'Database Schema')

## Technical Analysis

### Database

In my note version tracking implementation, I chose track different note versions through a separate `versions` table with a many-to-one relationship with `notes`, compared to creating a new `note` each time the note is updated. The note contents of current version is stored at `notes.body`, while `versions.body` stores the previous versions - each time the `note` is saved, a new `version` is created. This implementation prevents concurrent updates by optimistic locking on the main `note` while allowing version tracking, only saving the new `version` if the `note` update succeeds. However, this makes writing operations costly as a new `Version` is created on each update, and the extra `body` fields can end up taking significant storage space. As the application scales, tracking changes between versions instead of the entire document can be considered, using the [longest common subsequence (LCS)](https://en.wikipedia.org/wiki/Longest_common_subsequence) algorithm to identify changes, and [reverse deltas](https://en.wikipedia.org/wiki/Delta_encoding) to conserve storage space.

I also decided to represent the many-to-many relationship between `users` and `notes` through the relationship table `collaborators`, to facilitate note-sharing between users. The different permissions are stored as boolean values, representing different roles. However, fetching operations would be slower due to needing to fetch both user-created and user-associated notes based on their roles.

### API

Initially, the API had nested routes, as most models were associated with the `Note` model. However, I decided to flatten the routes (e.g. `/notes/{noteId}/versions/{versionId}` to `/versions/{versionId}`), as nesting introduces a lot of redundant routes and unused variables as the application grows in functionality. This simpler routing system improves maintainability in most parts of the code, however in places where the parameter from the parent model needs to be accessed (e.g. `noteId` from `Version`) such as in middlewares, care must be taken to account for the parameter coming from either `req.params`, `req.query` or `req.body`.

The Singleton pattern is also implemented throughout by making use of [module caching in Node.js](https://nodejs.org/api/modules.html#modules_caching), which caches modules the first time they are loaded and are thus only "instantiated" once in the application's runtime. Therefore, each `import` statement will returned the same object, enforcing the Singleton pattern in JavaScript even without using `Class` notation.

### Caching

Caching is implemented for the `GET` `/notes` and `GET` `/notes/{id}` endpoints, where their cache keys are defined as `notes:{userId}:{keyword}` and `note:{noteId}` respectively, with the most- to least-specific information encoded from left to right. This enables caching based on the request URL, taking advantage of the resource-based representation of REST APIs to improve scalability and maintainability. Cache invalidation is done via the `MATCH` operation to select keys based on their prefixes, allowing selection of keys by specificity, and calling the cache invalidation function within the respective requests. However, this will become difficult to maintain over time as many cache keys must be tracked as the number of endpoints with caching increases, and thus other implementations such as grouping cache keys with tags to select them should be considered.

## Future Considerations

- Unit testing with [Jest](https://jestjs.io/) to reduce bugs and improve debugging speed
- Pagination of notes to reduce server load
- Stricter TypeScript interfaces for response objects for better and more automated API documentation with Swagger, as well as improving documentation with examples
- Migrate to [Sequelize v7](https://sequelize.org/docs/v7/) once stable, due to better TypeScript support
- Better management of `.env` variables to account for different environments (e.g. `production`)
