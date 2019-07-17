import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import bodyParser from 'body-parser';
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'

const app = express().use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath} 🚀`)
);