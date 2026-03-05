const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL],
    credentials: true,
  }),
);
app.use(cookieParser());

/**Routes */
const authRoute = require("./routes/auth.route");
const songRoute = require("./routes/song.route");

app.use("/api/auth", authRoute);
app.use("/api/song", songRoute);

module.exports = app;
