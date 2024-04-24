// ====== Packages and imports ====== //
const express = require("express");
const cors = require("cors"); // Import cors middleware once
const app = express();
require("dotenv").config();

// Route Imports
const libraryRoutes = require("./routes/libraryRoutes.js");
const studentProfileViewerRoutes = require("./routes/studentProfileViewerRoutes.js");
const studentProfilesRoutes = require("./routes/studentProfilesRoutes.js");
const progressTrackerRoutes = require("./routes/progressTrackerRoutes.js");
const teacherProfileViewerRoutes = require("./routes/teacherProfileViewerRoutes.js");
const helpRequestsRoutes = require("./routes/helpRequestsRoutes.js");
const projectSubmissions = require("./routes/projectSubmissions.js");
const submitProject = require("./routes/submitProject.js");
const askForHelp = require("./routes/askForHelpRoutes.js");
const logins = require("./routes/loginRoutes.js");

// Middleware
app.use(cors());
app.use(express.json());

// =========== ENDPOINTS =========== //
// Initial setup in Postman
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Log in
app.use(logins);

// Project library
app.use(libraryRoutes);

// Student Profile viewer
app.use(studentProfileViewerRoutes);

// progress tracker
app.use(progressTrackerRoutes);

// student profiles
app.use(studentProfilesRoutes);

// Teacher Profile Viewer
app.use(teacherProfileViewerRoutes);

// Help Requests
app.use(helpRequestsRoutes);

// Project submissions
app.use(projectSubmissions);

//Submit project
app.use(submitProject);

// Ask for help
app.use(askForHelp);

// ============== PORT ============== //
const PORT = process.env.PORT;
app
  .listen(PORT, () => {
    console.log(`Server is alive on http://localhost:${PORT}`);
  })
  .on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log("PORT is already in use.");
    } else {
      console.log("Server Errors: ", error);
    }
  });
