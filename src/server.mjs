import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mainSchemaPromise from "./graphql/schema/index.mjs";
import isAuth from "./middlewares/is-auth.mjs";

export default async () => {    
    const graphqlSchema = await mainSchemaPromise();

    const app = express();

    app.use(bodyParser.json());

    app.use(isAuth);

    app.use(
        '/graphql', 
        graphqlHTTP({
            schema: graphqlSchema,
            //rootValue: graphqlResolvers,
            graphiql: true
    }));

    return app;
}