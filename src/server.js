const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema/index');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHTTP({
        schema: graphqlSchema,
        //rootValue: graphqlResolvers,
        graphiql: true
}));

module.exports = app;