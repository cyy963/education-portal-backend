const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

router.post("/api/ask-for-help", (req, res) => {
  console.log("/api/ask-for-help post Endpoint reached");

  const studentId = req.body.studentId;
  const dateCreated = req.body.date;

  const query = `INSERT INTO help_request (student_id, date_created, done) VALUES (${studentId}, "${dateCreated}", 0);`;

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
