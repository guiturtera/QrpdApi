const { connect } = require('./db/db-handler');
const startApp = require('./server');

connect()
    .then(() => {
        startApp().then(app => {    
            const port = process.env.PORT || "3000";
            app.listen(port, () => {
                console.log(`Listening at port ${port}`);
            });
        })
    })
    .catch(err => console.log(err));