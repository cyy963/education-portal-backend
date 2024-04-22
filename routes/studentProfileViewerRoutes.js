const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

// Routes or endpoints
router.get("/student", (req, res) => {
  pool.query(
    `SELECT student.student_id, student.student_name, student.email, student.school, student.course, student.profile_pic, student.date_of_birth, student.contact_number, teacher.teacher_name FROM student JOIN teacher ON student.teacher_id = teacher.teacher_id WHERE student_id = 12;`,
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
