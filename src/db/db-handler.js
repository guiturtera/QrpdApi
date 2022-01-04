const mongoose = require('mongoose');

const query = `mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0.mbnwz.mongodb.net/${process.env.MONGO_DB
    }?retryWrites=true&w=majority`;

const connect = async () => {
        try {
            await mongoose
                .connect(query, 
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    autoIndex: true 
                });   
            console.log(`Success connecting to database`);     
        } catch (err) {
            console.log(`Connection to database failed: ${err}`);
            throw err;
        }
}

module.exports.connect = connect;