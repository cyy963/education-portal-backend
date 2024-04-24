const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");
const bcrypt = require("bcrypt");

//Routes or endpoints
router.post("/teacher-login", (req, res) => {
  console.log("/teacher-login endpoint hit!");
  console.log(req.body);

  const email = req.body.email; // e.g. billy@thegoat.com
  const password = req.body.password; // e.g. billy123
  const query = `SELECT password, teacher_id FROM teacher WHERE email = ?;`;

  // Query the database
  pool.execute(query, [email], (err, result) => {
    const data = [{ id: `${result[0].teacher_id}` }];
    console.log("Data: ", data);

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

    bcrypt.compare(password, result[0].password, (err, result) => {
      if (result) {
        // return res.sendStatus(200);
        return res.status(200).send(data);
      } else {
        return res.sendStatus(401);
      }
    });
  });
});

router.post("/student-login", (req, res) => {
  console.log("/student-login endpoint hit!");
  console.log(req.body);

  const email = req.body.email; // e.g. billy@thegoat.com
  console.log(email);
  const password = req.body.password; // e.g. billy123
  const query = `SELECT password, student_id FROM student WHERE email = ?;`;

  // Query the database
  pool.execute(query, [email], (err, result) => {
    const data = [{ id: `${result[0].student_id}` }];
    console.log("Data: ", data);

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

    bcrypt.compare(password, result[0].password, (err, result) => {
      if (result) {
        return res.status(200).send(data);
      } else {
        return res.sendStatus(401);
      }
    });
  });
});

module.exports = router;
