const app = require("./app.js");
const connecDatabase = require("./db/Database.js");

//Handeling unCaught Execution
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Shutting Down the server for handling uncaught execution`);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}
//connect db
connecDatabase();

//create server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

//unhandle promise rejuction
process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log("shuting down the server for unhandle promise rejuction");
  server.close(() => {
    process.exit(1);
  });
});
