<h1 align="center">WizBuy</h1>
<p align="center">Buy like a wizard, save like a muggle!</p>

---

## Table of Contents

- [Stack](#stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [API](#api)
- [Motivation](#motivation)

## Stack

- [NodeJS](https://nodejs.org/en/)
- [Koa](https://koajs.com/)
- [Prisma](https://www.prisma.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Structure

```
- prisma           # Prisma schema and migrations
- src
    - controllers  # HTTP handlers
    - database     # Database connection
    - errors       # Errors utils
    - middlewares  # Middlewares
    - services     # Services
    - tests        # Tests files
    - utils        # Utils
    - router.js    # Router
    - server.js    # Server app
- .env             # Environment variables
```

## Installation

To install the dependencies, you can use the following commands:

```bash
npm i --production
# or
yarn --prod
```

You should rename the file `.env.example` to `.env` and fill in the environment variables.

To start the server, you can use the following command:

```bash
npm run start
# or
yarn start
```

If you want to run the server in development mode, take a look at the [development docs](./docs/DEVELOPMENT.md).

## API

Routes:
- `POST /user`
- `POST /login`
- `GET /user`
- `PUT /user`
- `DELETE /user`
- `GET /products`
- `GET /product`
- `POST /cart`
- `GET /cart`
- `DELETE /cart`

For more details, take a look at the [routes docs](./docs/ROUTES.md).

## Motivation

This project brought together two passions of mine: programming and the Harry Potter universe. After I saw the films and read the Harry Potter books, I really wanted to develop a project about them. So, I had the idea of creating WizBuy, a platform for wizards and witches from all over the world to buy their items online.
