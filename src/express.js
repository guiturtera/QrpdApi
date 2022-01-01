const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');

const userSchema = require('./graphql/schema/user');

module.exports = (connect) => {
    const app = express();

    app.use(bodyParser.json());

    app.use(
        '/user', 
        graphqlHTTP({
            schema: userSchema,
            //rootValue: graphqlResolvers,
            graphiql: true
    }));

    return app.listen(3000, () => {
        console.log('Listening at port 3000');
        connect();
    });
}