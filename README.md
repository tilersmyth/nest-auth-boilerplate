![nest-auth-banner](https://user-images.githubusercontent.com/8736328/72360082-70f45100-36bd-11ea-9665-1bf412f9730a.jpg)

# NestJS Authentication Boilerplate

Bare bones authentication boilerplate using NestJS, GraphQL, TypeORM (Postgres) and Express Sessions using Redis.

## **Getting Started**

1. Clone the repository

```sh
git clone https://github.com/tilersmyth/nest-auth-boilerplate.git
```

2. Install dependencies

```sh
npm install or yarn install
```

3. Create .env file and set environment variables

```sh
cp .env.example .env
```

4. Create database and start Redis with `redis-server`

5. Start the application

```sh
yarn run start:dev
```

6. Visit `http://localhost:4000/graphql` to use GraphQL playground
