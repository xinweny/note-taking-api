# Note Taking API 📝

## Introduction

A note-taking REST API built in [JavaScript (TypeScript)](https://www.typescriptlang.org/), [ExpressJS](https://expressjs.com/) and [Sequelize](https://sequelize.org/).

## Table of Contents

- [Introduction](#introduction)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
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
- [x] WT-based authentication with token refreshing
- [x] Note-sharing functionality with specific permissions
- [x] Upload multimedia files and attach them to notes
- [x] Containerization with [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Setup

Please ensure that you have [Git](https://git-scm.com/) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed on your system.

```shell
  # Clone the repository
  git clone https://github.com/xinweny/note-taking-api.git
  cd note-taking-api

  # Create .env file from example (enter all variables or modify default values)
  cp .env.example .env

  # Start the application
  docker compose up # --watch to start in watch mode

  # Closing the application
  docker compose down
```

## API Endpoints

### Authentication

<details>
<summary>
<code>POST</code> <code>/auth/signup</code> - Create new user
</summary>

##### Parameters

> | location | name       | data type | required |
> | -------- | ---------- | --------- | -------- |
> | `body`   | `username` | `string`  | yes      |
> | `body`   | `email`    | `string`  | yes      |
> | `body`   | `password` | `string`  | yes      |

##### Responses

<table>
<tr>
<td> Status </td> <td> Response </td>
</tr>
<tr>
<td>

`200`

</td>
<td>

```json
{
  "data": {
    "id": 1,
    "username": "user",
    "email": "email@example.com"
  }
}
```

</td>
</tr>
</table>
</details>

<details>
<summary>
  <code>POST</code> <code>/auth/login</code> - Login user
</summary>

##### Parameters

> | location | name       | data type | required |
> | -------- | ---------- | --------- | -------- |
> | `body`   | `email`    | `string`  | yes      |
> | `body`   | `password` | `string`  | yes      |

##### Responses

<table>
<tr>
<td> Status </td> <td> Response </td>
</tr>
<tr>

<td>

`200`

</td>
<td>

</details>

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
  }
}
```

</td>
</tr>
</table>

</details>

<details>
<summary>
  <code>POST</code> <code>/auth/refresh</code> - Refresh expired access token using refresh token stored in HTTP-only cookie
</summary>

##### Responses

<table>
<tr>
<td> Status </td> <td> Response </td>
</tr>
<tr>

<td>

`200`

</td>
<td>

```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
  }
}
```

</td>
</tr>
</table>
</details>

---

### Notes

<details>
<summary>
<code>GET</code> <code>/notes?keyword=</code> - Get all notes associated with the user, with optional full-text search
</summary>

##### Parameters

> | location | name      | data type | required |
> | -------- | --------- | --------- | -------- |
> | `query`  | `keyword` | `string`  | no       |

##### Responses

<table>
<tr>
<td> Status </td> <td> Response </td>
</tr>
<tr>
<td>

`200`

</td>
<td>

```json
{
  "data": [
    {
      "id": 1,
      "title": "Note Title",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "versions": [
        {
          "id": 1,
          "noteId": 1,
          "userId": 1,
          "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "createdAt": "2012-04-23T18:25:43.511Z",
          "user": {
            "id": 1,
            "username": "user"
          }
        }
      ],
      "collaborators": [
        {
          "id": 1,
          "noteId": 1,
          "userId": 1,
          "isAdmin": true,
          "canEdit": true,
          "user": {
            "id": 1,
            "username": "user"
          }
        }
      ]
    }
  ]
}
```

</td>
</tr>
</table>
</details>

## Database Schema

## Technical Analysis

<table>
<tr>
<td><strong>Feature</strong></td> <td><strong>Approach</strong></td> <td><strong>Trade-offs</strong></td>
</tr>
<tr>
<td>asd</td>
<td>sd</td>
<td>asdfsdfasdafs</td>
</tr>
</table>

## Future Considerations

- Unit testing with [Jest](https://jestjs.io/)
- Use [Swagger](https://swagger.io/) with stricter type interfaces for response objects for better and faster documentation
