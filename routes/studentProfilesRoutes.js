const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");

//============ teacher-dashboard/student-profiles ============
router.get('/students',(req,res)=>{
    pool.query(`SELECT student_name, student_id, profile_pic FROM student;`, (err,result)=>{
        if (err){
            console.log('database error:', err);    
            return res.status(500).json({errorMessage:'an error while fetching the database.'})
        } else{
            res.send(result);
        }
    })
  });

module.exports = router;