const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");
const bcrypt = require("bcrypt");

//Routes or endpoints
// Teacher login endpoint
router.post("/teacher-login", (req, res) => {
  console.log("/teacher-login endpoint hit!");
  console.log(req.body);

  const email = req.body.email; // e.g. billy@thegoat.com
  const password = req.body.password; // e.g. billy123
  const query = `SELECT password, teacher_id FROM teacher WHERE email = ?;`;

  // Query the database
  pool.execute(query, [email], (err, result) => {
    // Handle the error
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching data from the database.",
      });
    }

    if (result.length === 0) {
      return res.sendStatus(404); // e.g. No user found with that email
    }

    // Create and test id array to be sent back
    const data = [{ id: `${result[0].teacher_id}` }];
    console.log("Data: ", data);

    // Compare the password with database password using bcrypt
    bcrypt.compare(password, result[0].password, (err, result) => {
      if (result) {
        // If result is true, send back 200 status and data array with id
        return res.status(200).send(data);
      } else {
        // Else, send back status 401 (password incorrect)
        return res.sendStatus(401);
      }
    });
  });
});

// Student login endpoint
router.post("/student-login", (req, res) => {
  console.log("/student-login endpoint hit!");
  console.log(req.body);

  const email = req.body.email; // e.g. billy@thegoat.com
  const password = req.body.password; // e.g. billy123
  const query = `SELECT password, student_id FROM student WHERE email = ?;`;

  // Query the database
  pool.execute(query, [email], (err, result) => {
    // Handle the error
    if (err) {
      console.log("Database error: ", err);
      return res.status(500).json({
        errorMessage:
          "An error occurred while fetching data from the database.",
      });
    }

    if (result.length === 0) {
      return res.sendStatus(404); // e.g. No user found with that email
    }

    // Create and test id array to be sent back
    const data = [{ id: `${result[0].student_id}` }];
    console.log("Data: ", data);

    // Compare the password with database password using bcrypt
    bcrypt.compare(password, result[0].password, (err, result) => {
      if (result) {
        // If result is true, send back 200 status and data array with id
        return res.status(200).send(data);
      } else {
        // Else, send back status 401 (password incorrect)
        return res.sendStatus(401);
      }
    });
  });
});

module.exports = router;
