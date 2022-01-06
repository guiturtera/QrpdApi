import { connect } from "./db/db-handler.mjs";

await connect();
const startApp = (await import('./server.mjs')).default;

const app = await startApp();

const port = process.env.PORT || "3000";
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});