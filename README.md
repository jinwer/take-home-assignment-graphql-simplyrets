# REITS X Graphql

A nodejs graphql service to get REITS properties

## Built With

The idea is to keep it simple. Most of libraries are chosen because of their simplarity and popularity.

- http server: [express](https://github.com/expressjs/express)
- graphql: [appollo-server](https://github.com/apollographql/apollo-server)
- logger: [winston](https://github.com/winstonjs/winston)
- web auth: [passport](https://github.com/jaredhanson/passport)
- api client: [axios](https://github.com/axios/axios)



## Prerequisites

### yarn
```
npm install --global yarn
```

## Installation

```
yarn install
```

## Run

```
yarn start
```

## Test with jest

```
yarn test
```
or 
```
yarn test:watch
```

## Test with curl

After `yarn start`

auth
```
JWT=`curl -X POST -H "Content-Type: application/json" http://localhost:4000/auth -d '{"username":"user1@sideinc.com","password":"676cfd34-e706-4cce-87ca-97f947c43bd4"}'` && echo ${JWT}
```

listings
```
curl -X POST -H "Authorization: Bearer ${JWT}" -H "Content-Type: application/json" -d '{"query":"query { listings { listingId address {city}} }"}' http://localhost:4000/graphql
```

listings with city
```
curl -X POST -H "Authorization: Bearer ${JWT}" -H "Content-Type: application/json" -d '{"query":"query { listings(city: \"Katy\") { listingId address {city}} }"}' http://localhost:4000/graphql
```

## Possible Future work
- more test
- real db
- more auth
- more features!