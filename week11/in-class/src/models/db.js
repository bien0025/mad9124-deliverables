const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL = "mongodb://localhost:27017/students");
      ;
    console.log('connected to mongoose');
  } catch (err) {
    console.log('Error connecting to mongoose: ', err);
  }
};

module.exports = {
  connect,
};
