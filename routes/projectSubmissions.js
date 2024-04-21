const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

router.get("/api/project-submission", (req, res) => {
  console.log("Submission endpoint reached");

  const query = `SELECT student.student_id, student_name, profile_pic, gender, submission, date_submitted, project_id FROM student JOIN student_projects ON student.student_id = student_projects.student_id  WHERE date_submitted IS NOT NULL AND date_completed IS NULL ORDER BY date_submitted;`;

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

router.post("/api/project-submission", (req, res) => {
  console.log("/api/project-submission post Endpoint reached");

  const studentIndex = req.body.studentId;
  const projectIndex = req.body.projectId;
  const dateComp = req.body.dateComp;

  console.log(studentIndex, projectIndex, dateComp);
  const query = `UPDATE student_projects SET date_completed = "${dateComp}" WHERE student_id=${studentIndex} AND project_id=${projectIndex};`;

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

module.exports = router;
