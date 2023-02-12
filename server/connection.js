const mongoose = require("mongoose");

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("Connected to database ");
  } catch (err) {
    console.log("Could not connect to database ");
  }
};
