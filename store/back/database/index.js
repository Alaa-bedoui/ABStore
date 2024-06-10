const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection
  .promise()
  .connect()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log(process.env.DB_USER);
    console.error("Error connecting to the database:", error);
  });

module.exports = connection;
