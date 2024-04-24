const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

//Routes or endpoints
router.get("/projects", (req, res) => {
  pool.query(
    `SELECT project_id, name, project_pic, activity_type, year_level, course, subscription, subject_matter FROM project;`,
    (err, result) => {
      if (err) {
        console.log("Database error: ", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching data from the database.",
        });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/student/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT student_name AS name, profile_pic FROM student WHERE student_id = ?;`,
    [id],
    (err, result) => {
      if (err) {
        console.log("Database error: ", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching data from the database.",
        });
      } else {
        res.send(result);
      }
    }
  );
});

router.get("/teacher/:id", (req, res) => {
  const id = req.params.id;
  pool.query(
    `SELECT teacher_name AS name, profile_pic FROM teacher WHERE teacher_id = ?;`,
    [id],
    (err, result) => {
      if (err) {
        console.log("Database error: ", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while fetching data from the database.",
        });
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
