import mysql from "mysql2";

// configurations for creating mysql connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "movieticketbooking_pwa",
});

export default connection;
