const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");
const mm = require("music-metadata");

// Upload Songs
async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Song file required" });
    }

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    let tags = {};
    let duration = null;
    try {
      tags = id3.read(songBuffer);
      const metadata = await mm.parseBuffer(songBuffer, "audio/mpeg");
      duration = Math.round(metadata.format.duration);
    } catch (error) {
      tags = {};
      duration = null;
    }
    console.log(tags);
    const safeTitle = (tags.title || req.file.originalname.split(".")[0])
      .replace(/\s+/g, "-")
      .toLowerCase();

    //Prepare upload promises
    const uploadPromises = [];

    uploadPromises.push(
      storageService.uploadFile({
        buffer: songBuffer,
        filename: `${safeTitle}.mp3`,
        folder: "/modify/songs",
      }),
    );

    if (
      tags.image &&
      tags.image.imageBuffer &&
      tags.image.imageBuffer.length < 1024 * 1024
    ) {
      uploadPromises.push(
        storageService.uploadFile({
          buffer: tags.image.imageBuffer,
          filename: `${safeTitle}.jpeg`,
          folder: "/moodify/posters",
        }),
      );
    }

    const results = await Promise.all(uploadPromises);
    const songFile = results[0];
    const posterFile = results[1] || null;

    const song = await songModel.create({
      title: tags.title || safeTitle,
      artist: tags.artist || "Unknown",
      mood,
      audioUrl: songFile.url,
      coverUrl: posterFile ? posterFile.url : null,
      duration,
    });

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Songs details
async function getSong(req, res) {
  try {
    const { mood } = req.query;
    const filter = mood ? { mood } : {};

    const song = await songModel.find(filter);
    res.status(200).json({
      message: "Song fetched successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

//Delete songs
async function deleteSong(req, res) {
  try {
    const { id } = req.params;
    const song = await songModel.findByIdAndDelete(id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = { uploadSong, getSong, deleteSong };
