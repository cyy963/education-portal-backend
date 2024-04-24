const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

router.post("/api/submit-project", (req, res) => {
  console.log("api/submit-project Endpoint reached");
  console.log(req.body);

  const studentIndex = req.body.studentId;
  const projectIndex = req.body.projectId;
  const dateSub = req.body.dateSub;
  const img = req.body.img;

  //updates the date submitted and submission collumns where the student id and project id match those supplied
  const query = `UPDATE student_projects SET date_submitted = "${dateSub}" ${
    img ? `, submission = "${img}"` : ""
  } WHERE student_id=${studentIndex} AND project_id=${projectIndex};`;

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
