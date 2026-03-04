import axiosInstance from "../../../lib/axios";

export const fetchSongsByMood = async (mood) => {
  const res = await axiosInstance.get(`/song?mood=${mood}`);
  return res.data;
};

export const uploadSong = async (formData) => {
  const res = await axiosInstance.post("/song", formData, {
    headers: {
      "Context-Type": "multipart/form-Data",
    },
  });
  return res.data;
};
