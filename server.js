// ====== Packages and imports ====== //
const express = require("express");
const app = express();
const cors = require('cors');
require("dotenv").config();
// get the client
const mysql = require("mysql2");
//middleware
app.use(cors());

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

//============ teacher-dashboard/student-profiles ============
app.get('/students',(req,res)=>{
  pool.query(`SELECT name, profile_pic, student_id FROM \`missionr_2402-L4FT13-team3\`.student;`, (err,result)=>{
      if (err){
          console.log('database error:', err);
          return res.status(500).json({errorMessage:'an error while fetching the database.'})
      } else{
          res.send(result);
      }
  })
});

//============ teacher-dashboard/progress-tracker ============
//get project_id from project table
app.get('/projects',(req,res)=>{
  pool.query(`SELECT project_id FROM \`missionr_2402-L4FT13-team3\`.project;`, (err,result)=>{
      if (err){
          console.log('database error:', err);
          return res.status(500).json({errorMessage:'an error while fetching the database.'})
      } else{
          res.send(result);
      }
  })
});
//get projects results excel from student and student_projects table
app.get('/project_results',(req,res)=>{
  pool.query(
    `SELECT
      student.student_id,
      student.name,
      GROUP_CONCAT(student_projects.project_id) AS completed_projects,
      COUNT(student_projects.date_completed) AS total_completed_projects
    FROM
      student
    LEFT JOIN
      student_projects ON student.student_id = student_projects.student_id
      AND student_projects.date_completed IS NOT NULL
    GROUP BY
      student.student_id
    ORDER BY
      student.student_id;`, 
    (err,result)=>{
    if (err){
        console.log('database error:', err);
        return res.status(500).json({errorMessage:'an error while fetching the database.'})
    } else{
        res.send(result);
    }
  })
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
