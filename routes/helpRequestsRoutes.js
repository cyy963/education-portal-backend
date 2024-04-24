const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");


// =========== GET for help requests =========== //
router.get("/help-requests", (req, res) => {
    console.log("Endpoint reached");
  
    const query = ` SELECT help_request.student_id, request_id, student_name, date_created, profile_pic, done FROM help_request INNER JOIN student ON help_request.student_id = student.student_id WHERE done = 0;`;
  
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

/////// POST for help requests
 
  router.post("/help-requests", (req, res) => {
    console.log("/help-requests post Endpoint reached");
 
    const studentIndex = req.body.studentId;
    const requestIndex = req.body.requestId;
    const done = req.body.done
 
    const query = `UPDATE help_request SET done = "${done}" WHERE student_id = ${studentIndex} AND request_id = ${requestIndex};`;
 
    pool.execute(query, (err, result) => {
      if (err) {
        console.log("Database error:", err);
        return res.status(500).json({
          errorMessage:
            "An error occurred while updating data in the database.",
        });
      }
 
      console.log("Update successful:", result);
      res.send(result);
    });
});
  
  module.exports = router