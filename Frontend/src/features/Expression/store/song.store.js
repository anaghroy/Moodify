import { create } from "zustand";
import { fetchSongsByMood } from "../api/song.api";

export const useSongStore = create((set, get) => ({
  songs: [],
  currentSong: null,
  loading: false,
  error: null,

  getSongs: async (mood) => {
    try {
      set({ loading: true, error: null });

      const response = await fetchSongsByMood(mood);
      const songsArray = response.song
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
}));
