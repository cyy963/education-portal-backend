const express = require("express");
const router = express.Router();
const pool = require("../model/db.js");
const he = require("he"); // Import the 'he' library

router.get("/projects/:projectId/learning-objectives", (req, res) => {
    // Retrieve HTML content from the database
    const projectId = req.params.projectId;
    pool.query(
        `SELECT learning_objective FROM project WHERE project_id = ?`,
        [projectId],
        (err, result) => {
            if (err) {
                console.log("Database error: ", err);
                return res.status(500).json({
                    errorMessage: "An error occurred while fetching data from the database.",
                    error: err,
                });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({
                        errorMessage: "No learning objectives found for the given project ID.",
                    });
                }
                // Decode HTML entities before sending the response
                const decodedLearningObjective = he.decode(result[0].learning_objective);
                res.send(decodedLearningObjective); // Assuming there's only one learning objective
            }
        }
    );
});

router.get("/projects/:projectId/instructions", (req, res) => {
    // Retrieve HTML content from the database
    const projectId = req.params.projectId;
    pool.query(
        `SELECT instructions FROM project WHERE project_id = ?`,
        [projectId],
        (err, result) => {
            if (err) {
                console.log("Database error: ", err);
                return res.status(500).json({
                    errorMessage: "An error occurred while fetching data from the database.",
                    error: err,
                });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({
                        errorMessage: "No learning objectives found for the given project ID.",
                    });
                }
                // Decode HTML entities before sending the response
                const decodedLearningObjective = he.decode(result[0].instructions);
                res.send(decodedLearningObjective); // Assuming there's only one learning objective
            }
        }
    );
});

router.get("/projects/:projectId/video", (req, res) => {
    // Retrieve video link from the database
    const projectId = req.params.projectId;
    pool.query(
        `SELECT video FROM project WHERE project_id = ?`,
        [projectId],
        (err, result) => {
            if (err) {
                console.log("Database error: ", err);
                return res.status(500).json({
                    errorMessage: "An error occurred while fetching data from the database.",
                    error: err,
                });
            } else {
                if (result.length === 0) {
                    return res.status(404).json({
                        errorMessage: "No video found for the given project ID.",
                    });
                }
                // Send the video link as it is
                const videoLink = result[0].video;
                res.send(videoLink);
            }
        }
    );
});

module.exports = router; // Export the router object