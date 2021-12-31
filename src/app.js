const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const app = express();
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphqlHTTP({
    schema: graphqlSchema,
    //rootValue: graphqlResolvers,
    graphiql: true
}));

const query = `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0.mbnwz.mongodb.net/${process.env.MONGO_DB
    }?retryWrites=true&w=majority`;

mongoose
    .connect(query)
    .then(() => {     
        app.listen(3000, () => {
            console.log('Listening at port 3000');
        });
    })
    .catch((err) => {
        console.log(err);
    });