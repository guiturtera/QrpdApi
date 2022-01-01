const mongoose = require('mongoose');

const query = `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0.mbnwz.mongodb.net/${process.env.MONGO_DB
    }?retryWrites=true&w=majority`;

const connect = () => {
    mongoose
        .connect(query, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log("Connection to database successful"))
        .catch((err) => console.log(`Connection to database failed: ${err}`))
}

module.exports = connect;