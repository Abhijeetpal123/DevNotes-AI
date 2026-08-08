require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app =require("./app")
dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT,  () => {
    console.log(`Server is Running on Port ${PORT}`);
  });
});
