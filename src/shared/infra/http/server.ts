import 'reflect-metadata'
import 'dotenv/config'
import { PetsResolver } from '@modules/pets/infra/graphql/resolvers/PetsResolver'
import { UsersResolver } from '@modules/users/infra/graphql/resolvers/UsersResolver'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import 'express-async-errors'
import { buildSchema } from 'type-graphql'

import createConnection from '@shared/infra/typeorm'

async function init() {
  await createConnection()
  const app = express()
  const port = 3333
  const schema = await buildSchema({
    resolvers: [UsersResolver, PetsResolver],
  })

  const apolloServer = new ApolloServer({ schema })

  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  app.listen(port, () => console.log(`Server is running on port: ${port}`))
}

init()
