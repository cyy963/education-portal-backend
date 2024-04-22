const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");


// =========== GET for help requests =========== //
router.get("/help-requests", (req, res) => {
    console.log("Endpoint reached");
  
    const query = ` SELECT request_id, student_name, date_created, profile_pic, done FROM help_request INNER JOIN student ON help_request.student_id = student.student_id WHERE done = 0;`;
  
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
  
  module.exports = router