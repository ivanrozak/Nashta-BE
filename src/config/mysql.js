const mysql = require("mysql");
const connection = mysql.createConnection({
  route: 3000,
  host: "localhost",
  user: "root",
  password: "",
  database: "event_db",
  timezone: "UTC",
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("You are now conected ...");
});

module.exports = connection;
