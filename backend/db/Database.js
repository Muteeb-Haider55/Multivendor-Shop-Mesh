const mongoose = require("mongoose");
const connecDatabase = () => {
  mongoose.connect(process.env.DB_URL).then((data) => {
    console.log(`mongo db connected with server ${data.connection.host}`);
  });
};
module.exports = connecDatabase;
