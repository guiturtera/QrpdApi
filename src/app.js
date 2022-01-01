const { connect } = require('./db/db-handler');
const startApp = require('./express');

startApp(connect);