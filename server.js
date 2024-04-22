// ====== Packages and imports ====== //
const express = require("express");
const cors = require("cors");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Route Imports
const libraryRoutes = require("./routes/libraryRoutes.js");
const studentProfileViewerRoutes = require("./routes/studentProfileViewerRoutes.js");

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