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
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
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

// =========== POST for submit project =========== //
app.post("/api/submit-project", (req, res) => {
  console.log("Endpoint reached");

  const studentIndex = 10;
  const projectIndex = 14;
  const dateSub = "2024-04-17";
  const img = "/images/submittedProjects/makeProject-screenshot.png";

  const query = `UPDATE student_projects SET date_submitted = "${dateSub}", submission = "${img}" WHERE student_id=${studentIndex} AND project_id=${projectIndex};`;

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

  // res.send("Endpoint hit");
});

// =========== GET for project submission =========== //

app.get("/api/project-submission", (req, res) => {
  console.log("Submission endpoint reached");

  const query = `SELECT student.student_id, name, profile_pic, submission, date_submitted FROM student JOIN student_projects ON student.student_id = student_projects.student_id WHERE date_submitted IS NOT NULL;`;

  pool.query(query, (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({
        errorMessage: "An error occured while fetching data from the database.",
      });
    } else {
      res.send(result);
    }
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
