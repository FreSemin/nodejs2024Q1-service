# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker Desktop - [Download & Install Docker Desktop](https://hub.docker.com/repository/docker/fresemin/music-service-db/general)

## Downloading

```
git clone https://github.com/FreSemin/nodejs2024Q1-service
```

## Set up Environment variables

1. Create `.env` file in the root folder
2. Copy variables from `.env.example`
3. Set up your values for variables.

## Running application (Locally)

1. Install NPM modules:

   ```
   npm install
   ```

2. Set up database

   2.1 From the root directory run:

   ```
   docker compose up db
   ```

   2.2 Check that Data Base running correctly

   2.3 Set `.env` variable `POSTGRES_HOST` to `localhost`

   2.4 Run Prisma migrations, from the root folder run:

   ```
    npm run migration:deploy
   ```

   2.5 Check that tables was created

3. Run application locally, from the root run:

   ```
   npm start
   ```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

4. (Optional) Run tests:

```
npm run test
```

## Running application using Docker (Development mode)

1. Set `.env` variable `NODE_ENV` to `dev`
2. Set `.env` variable `POSTGRES_HOST` to `<db_container_name>` (default = db)
3. From the root run:

   ```
   docker compose up
   ```

4. Run Prisma migrations (from the Docker Desktop):

   4.1 Open tab 'Containers'

   4.2 Navigate to 'music-service-api' container

   4.3 Open tab 'Exec'

   4.4 Run command:

   ```
    npm run migration:deploy
   ```

5. (Skip if previous done) Run Prisma migrations from CLI:

   5.1 From the root run:

   ```
    docker container ls
   ```

   5.2 Copy `music-service-api` container Id

   5.3 Run Prisma migrations, from the root run:

   ```
    docker container exec <container_id> npm run migration:deploy
   ```

6. (Optional) Change any files in `src` folder, verify that application bring new changes (wait some seconds)

7. (Optional) Run Tests:

   7.1 From Docker Desktop container execute command:

   ```
   npm run tests
   ```

   7.2 From CLI run command:

   ```
    docker container exec <container_id> npm run test
   ```

## Running application using Docker (Production mode)

1. Set `.env` variable `NODE_ENV` to `prod`
2. Set `.env` variable `POSTGRES_HOST` to `<db_container_name>` (default = db)
3. From the root run:

   ```
   docker compose up
   ```

4. Run Prisma migrations (from the Docker Desktop):

   4.1 Open tab 'Containers'

   4.2 Navigate to 'music-service-api' container

   4.3 Open tab 'Exec'

   4.4 Run command:

   ```
    npm run migration:deploy
   ```

5. (Skip if previous done) Run Prisma migrations from CLI:

   5.1 From the root run:

   ```
    docker container ls
   ```

   5.2 Copy `music-service-api` container Id

   5.3 Run Prisma migrations, from the root run:

   ```
    docker container exec <container_id> npm run migration:deploy
   ```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Troubleshooting

- `sh nest not found`
  - delete `music-service-api` container, image, volume
  - run command `docker compose up --build`
