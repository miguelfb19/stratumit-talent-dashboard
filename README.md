# Docker 

Official documentation from Next team to initialize the doker image: https://nextjs.org/docs/app/building-your-application/deploying#docker-image

Repository: https://github.com/vercel/next.js/tree/canary/examples/with-docker

1. Create de ```Dockerfile``` on the root of the project
2. Add the content recommended in the official repository
3. Build your container with next commands: ```docker build -t nextjs-docker .```
4. Create ```docker-compose.yml``` with the config to your conection, example:

```
version: '3.8'

services:
  todosDB:
    image: postgres:15.3
    container_name: stratumit
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - ./postgres:/var/lib/postgresql/data

```


# Development

1. Clone repository in your local enviroment
2. Install dependencies: ```npm install```
3. Execute prisma generate to generate de PrismaClient: ```npx prisma generate```
4. Execute the prisma migration to add tables information: ```npx prisma migrate dev --name '<name_your_migration>'```
5. Execute seeder to seed database, we have 2 options: 
  - ```npm run seed```
  - ```npx prisma db seed```

  either does the samething.

6. Run server: ```npm run dev```, it runs on ```http://localhost:3000``` normally.
7. Ready, you're done, you can browse and work in the website