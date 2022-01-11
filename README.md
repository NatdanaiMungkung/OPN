# Covid Timeline Generator

# Screenshot
![Desktop](https://imgur.com/GOnNjp5.png)

![Mobile](https://imgur.com/0FQppeR.png)

![Tablet](https://imgur.com/bexh4Yg.png)

# Dependency (OPN-api) for Backend service (NestJS)
https://github.com/NatdanaiMungkung/OPN-api

# How to run (need to run OPN-api repo first, see above)
please make sure that port 3000 and 3001 are free before run the project
```bash
cd nextJs
npm install
npm run dev
go to http://localhost:3001/
you can see sample data, play around with it
```

# Tech Stack
* NextJs for frontend
* GraphQL
* NestJS for Backend
* SQLite for storage

# Why SQLite ?
Easy to setup without any complicated dependency, suitable for POC project

# improvement points (given enough time and use cases)
* Migrate from sqlite to Use other db software (eg. postgresql, mariadb)
* Unit Test
* E2E test
* Containerized (Docker)
* CI/CD (eg. github action)
* Authorization and authentication implement
* Refactor for maintainability and extendability
* Implement checking condition (eg. max 8 patients and timeline must not conflicted) on both frontend and backend layer (Currently check only on Frontend)
* Add healthcheck and metric to monitor usage
* UI refactor
* Convert any js file into ts (typescript) file
