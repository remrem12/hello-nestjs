# Docker

## Docker cmd

- `docker compose up` to run the postgres db

## POSTGRES in DOCKER cmd

- to access db: `docker exec -it dev-database bash`
- access db: `psql -U POSTGRES -W testdb`
- view db: `\dt`

# Prisma

- To migrate, use: `npx prisma migrate`
- Open db web view: `npx prima studio`
