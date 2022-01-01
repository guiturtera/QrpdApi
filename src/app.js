const { connect } = require('./db/db-handler');
const startApp = require('./server');

connect()
    .then(() => startApp())
    .catch(err => console.log(err));