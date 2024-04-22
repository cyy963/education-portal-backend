const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

// =========== GET for teacher profile viewer =========== //
router.get("/teacher-profile-viewer", (req, res) => {
  
    const query = `SELECT teacher_id, teacher_name, email, school, profile_pic, date_of_birth, contact_number FROM teacher;`;
  
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