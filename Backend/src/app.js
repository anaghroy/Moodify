// useSchema.pre("save", function(next){})
// useSchema.post("save", function(next){})

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

/**Routes */
const authRoute = require("./routes/auth.route");

app.use("/api/auth", authRoute);

module.exports = app;
