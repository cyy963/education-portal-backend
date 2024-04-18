// ====== Packages and imports ====== //
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
// get the client
const mysql = require("mysql2");

// ========== Middleware ============= //
app.use(cors());
app.use(express.json());

// Create the connection to database
const pool = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true, // people can wait
  connectionLimit: 10, // 10 slots at one time
  queueLimit: 0, // no limit for queuing
});

// =========== ENDPOINTS =========== //
// Initial setup in Postman
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// =========== GET for help requests =========== //
app.get("/api/help-requests", (req, res) => {
  console.log("Endpoint reached");

  const query = `SELECT request_id, date_created, name, profile_pic, done FROM help_request INNER JOIN student ON help_request.student_id = student.student_id WHERE done = 0;`;

  pool.execute(query, (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching data from the database.",
      });
    }

    console.log(result);
    res.send(result);
  });
});

// =========== GET for teacher profile viewer =========== //
app.get("/api/teacher-profile-viewer", (req, res) => {
  console.log("Endpoint reached");

  const query = `SELECT teacher_id, name, email, school, profile_pic, date_of_birth, contact_number FROM teacher;`;

  pool.execute(query, (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching data from the database.",
      });
    }

    console.log(result);
    res.send(result);
  });
});

// ============== PORT ============== //
const PORT = process.env.PORT;
app
  .listen(PORT, () => {
    console.log(`Server is alive on http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log("PORT is already in use.");
    } else {
      console.log("Server Errors: ", error);
    }
  });