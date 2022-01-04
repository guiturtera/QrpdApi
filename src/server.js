const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mainSchemaPromise = require('./graphql/schema/index');

module.exports = async () => {    
    const graphqlSchema = await mainSchemaPromise();

    const app = express();

    app.use(bodyParser.json());

    app.use(
        '/graphql', 
        graphqlHTTP({
            schema: graphqlSchema,
            //rootValue: graphqlResolvers,
            graphiql: true
    }));

    return app;

}