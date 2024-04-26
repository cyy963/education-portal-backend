const express = require("express"); // Import Express.js library
const router = express.Router(); // Create a new router object to handle routes
const pool = require("../model/db.js"); // Import database connection pool from a separate module
/*
  The 'he' library is essential for ensuring that the text content we handle is safe and displays correctly. 
  HTML entities, such as special characters like <, >, &, etc., can sometimes interfere with the rendering of web pages or pose security risks. 
  The 'he' library helps to encode or decode these characters properly, preventing them from causing harm or displaying incorrectly.
  By including this library, we make our application more robust and secure, especially when dealing with dynamic content that users or external systems might provide.
*/
const he = require("he"); 


// Route for fetching learning objectives associated with a specific project
router.get("/projects/:projectId/learning-objectives", (req, res) => {
    const projectId = req.params.projectId; // Extract 'projectId' from URL parameters
    pool.query( // Execute SQL query using the database connection pool
        `SELECT learning_objective FROM project WHERE project_id = ?`,
        [projectId], // Use projectId as the query parameter to prevent SQL injection
        (err, result) => {
            if (err) {
                console.log("Database error: ", err); // Log database error
                return res.status(500).json({ // Return a 500 Internal Server Error response
                    errorMessage: "An error occurred while fetching data from the database.",
                    error: err,
                });
            } else {
                if (result.length === 0) { // Check if no results are returned
                    return res.status(404).json({ // Return a 404 Not Found response
                        errorMessage: "No learning objectives found for the given project ID.",
                    });
                }
                const decodedLearningObjective = he.decode(result[0].learning_objective); // Decode HTML entities
                res.send(decodedLearningObjective); // Send the decoded learning objective as the response
            }
        }
    );
});

// Route for fetching instructions associated with a specific project
router.get("/projects/:projectId/instructions", (req, res) => {
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
                        errorMessage: "No instructions found for the given project ID.",
                    });
                }
                const decodedInstructions = he.decode(result[0].instructions); // Decode HTML entities in instructions
                res.send(decodedInstructions); // Send the decoded instructions as the response
            }
        }
    );
});

// Route for fetching a video link associated with a specific project
router.get("/projects/:projectId/video", (req, res) => {
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
                const videoLink = result[0].video; // Get the video link from the result
                res.send(videoLink); // Send the video link as the response
            }
        }
    );
});

module.exports = router; // Export the router to be used in other parts of the application
