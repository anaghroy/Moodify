import { create } from "zustand";
import { fetchSongsByMood, uploadSong, deleteSongApi } from "../api/song.api";

export const useSongStore = create((set) => ({
  songs: [],
  currentSong: null,
  loading: false,
  error: null,

  getSongs: async (mood) => {
    try {
      set({ loading: true, error: null });

      const response = await fetchSongsByMood(mood);
      const songsArray = response.song;
      set({
        songs: songsArray,
        currentSong: songsArray[0] || null,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Something went wrong",
        loading: false,
      });
    }
  },
  setCurrentSong: (song) => {
    set({ currentSong: song });
  },

  deleteSong: async (id) => {
    try {
      await deleteSongApi(id);
      set((state) => ({
        songs: state.songs.filter((s) => s._id !== id),
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || "Delete failed" });
    }
  },

  uploadSong: async (formData) => {
    try {
      set({ loading: true, error: null });
      const response = await uploadSong(formData);
      set((state) => ({
        songs: [...state.songs, response.song],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Upload failed",
      });
    }
  },
}));
