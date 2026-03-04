const express = require("express")
const upload = require("../Middlewares/upload.middleware")
const songController = require("../controllers/song.controller")

const router = express.Router()

//upload a song
router.post("/", upload.single("song"), songController.uploadSong)

// Get all songs OR filter by mood
router.get("/", songController.getSong)

module.exports = router