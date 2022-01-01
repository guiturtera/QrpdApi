const { connect } = require('./db/db-handler');
const app = require('./server');

connect()
    .then(() => {
        const port = process.env.PORT || "3000";
        app.listen(port, () => {
            console.log(`Listening at port ${port}`);
        });
    })
    .catch(err => console.log(err));