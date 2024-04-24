const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

//============ teacher-dashboard/progress-tracker ============
//get project_id from project table
router.get('/projects',(req,res)=>{
    pool.query(`SELECT project_id FROM project;`, (err,result)=>{
        if (err){
            console.log('database error:', err);
            return res.status(500).json({errorMessage:'an error while fetching the database.'})
        } else{
            res.send(result);
        }
    })
  });
  //get projects results excel from student and student_projects table
  router.get('/project_results',(req,res)=>{
    pool.query(
      `SELECT
        student.student_id,
        student.student_name,
        GROUP_CONCAT(student_projects.project_id) AS completed_projects,
        COUNT(student_projects.date_completed) AS total_completed_projects
      FROM
        student
      LEFT JOIN
        student_projects 
        ON student.student_id = student_projects.student_id
        AND student_projects.date_completed IS NOT NULL
      GROUP BY
        student.student_id
      ORDER BY
        student.student_id;`, 
      (err,result)=>{
      if (err){
          console.log('database error:', err);
          return res.status(500).json({errorMessage:'an error while fetching the database.'})
      } else{
          res.send(result);
      }
    })
  });

module.exports = router;
  