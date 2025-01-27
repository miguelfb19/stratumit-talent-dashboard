# Docker 

Official documentation from Next team to initialize the doker image: https://nextjs.org/docs/app/building-your-application/deploying#docker-image

Repository: https://github.com/vercel/next.js/tree/canary/examples/with-docker

1. Create de ```Dockerfile``` on the root of the project
2. Add the content recommended in the official repository
3. Build your container with next commands: ```docker build -t nextjs-docker .```
4. Create ```docker-compose.yml``` with config to your conection, example:

```
version: '3.8'

services:
  todosDB:
    image: postgres:15.3
    container_name: todos-db
    restart: always
    ports:
      - 5433:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    volumes:
      - ./postgres:/var/lib/postgresql/data

```


# Development