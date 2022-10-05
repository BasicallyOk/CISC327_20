const mongoose = require('mongoose')

const dbURI = 'mongodb+srv://test:<password>@cluster0.bt5g3.mongodb.net/QBNB?retryWrites=true&w=majority'

const connectDb = () => {
    return mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
};
  
const disconnectDb = () => {
    return mongoose.connection.close();
};

module.exports = {connectDb, disconnectDb}



  