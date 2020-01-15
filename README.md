![nest-auth-banner](https://user-images.githubusercontent.com/8736328/72399106-269dbf00-3713-11ea-9edb-1030da18181b.jpg)

# NestJS Authentication Boilerplate

Bare bones authentication boilerplate using NestJS, GraphQL, TypeORM (Postgres) and Express Sessions using Redis.

## **Getting Started**

```bash
$ git clone https://github.com/tilersmyth/nest-auth-boilerplate.git
$ cd nest-auth-boilerplate
```

```bash
# Spin up Docker with db and redis
$ docker-compose up -d

# Install dependencies
$ npm install or yarn install

# Create .env file (set env variables)
$ cp .env.example .env

# Start application (dev mode)
$ yarn run start:dev

```

Try GraphQL playground at `http://localhost:4000/graphql`
