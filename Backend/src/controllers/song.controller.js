const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Song file required" });
    }

    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    let tags = {};
    try {
      tags = id3.read(songBuffer);
    } catch (error) {
      tags = {};
    }
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
    });

    res.status(201).json({
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

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

module.exports = { uploadSong, getSong };
