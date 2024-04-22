// ====== Packages and imports ====== //
const express = require("express");
const cors = require("cors"); // Import cors middleware once
const app = express();
require("dotenv").config();

// Route Imports
const libraryRoutes = require("./routes/libraryRoutes.js");
const studentProfileViewerRoutes = require("./routes/studentProfileViewerRoutes.js");
const teacherProfileViewerRoutes = require("./routes/teacherProfileViewerRoutes.js");
const helpRequestsRoutes = require("./routes/helpRequestsRoutes.js");

// Middleware
app.use(cors());

// =========== ENDPOINTS =========== //
// Initial setup in Postman
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Project library
app.use(libraryRoutes);

// Student Profile viewer
app.use(studentProfileViewerRoutes);

// Teacher Profile Viewer
app.use(teacherProfileViewerRoutes);

// Help Requests
app.use(helpRequestsRoutes);

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
