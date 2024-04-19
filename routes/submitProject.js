const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

router.post("/api/submit-project", (req, res) => {
  console.log("Endpoint reached");

  const studentIndex = 10;
  const projectIndex = 14;
  const dateSub = "2024-04-17";
  const img = "/images/submittedProjects/makeProject-screenshot.png";

  const query = `UPDATE student_projects SET date_submitted = "${dateSub}", submission = "${img}" WHERE student_id=${studentIndex} AND project_id=${projectIndex};`;

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
