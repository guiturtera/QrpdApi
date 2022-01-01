const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const graphqlSchema = require('./graphql/schema/index');

module.exports = async () => {
    const app = express();

    app.use(bodyParser.json());

    app.use(
        '/graphql', 
        graphqlHTTP({
            schema: graphqlSchema,
            //rootValue: graphqlResolvers,
            graphiql: true
    }));

    return app.listen(3000, () => {
        console.log('Listening at port 3000');
    });
}