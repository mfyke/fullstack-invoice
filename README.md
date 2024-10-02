# fullstack-invoice

## Getting Started with `invoice-api`

- First copy the contents of `invoice-api/.env.Example` into a file called `invoice-api/.env`, as this will serve as the connection string for Prisma to connect to our Postgres service that we will start with our docker compose file.

- Next run `docker compose up` in the `/invoice-api` directory. You should see a message that the database is ready to accept connections. You should leave this terminal running.

- Next you can run the command `npx prisma migrate dev --name "init"`, this should sync your postgres database with your Prisma types. This action should automatically run the seeds file and seed the database. If the database is not seeded that this point, you can manually run the seed script by running `npx prisma db seed`.

- You can run the API in watch mode by entering the command `npm run start:dev`. Leave this terminal running while you continue to starting the front end of the application.

## Getting Started with `invoice-frontend`

