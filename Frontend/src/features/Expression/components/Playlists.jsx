import { Music, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Playlists = () => {
  const [songs, setSongs] = useState([]);
  const [selectedMood, setSelectedMood] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/song")
      .then((res) => res.json())
      .then((data) => {
        // console.log("All songs:", data.song);
        setSongs(data.song);
      })
      .catch((err) => console.log(err));
  }, []);

  const moods = [...new Set(songs.map((s) => s.mood))];

  //Filter songs by mood
  const filteredSongs = selectedMood
    ? songs.filter((s) => s.mood === selectedMood)
    : songs;

  //Duration formatting
  const formatDuration = (seconds) => {
    if (!seconds) return "-";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/song/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setSongs((prev) => prev.filter((s) => s._id !== id));
        toast.success("Songs deleted successfully");
      } else {
        toast.error(data.message || "Failed to delete song");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <section className="playlist-wrapper">
      <div className="outer">
        <div className="top-wrapper">
          <div className="icon">
            <Music />
            <p>Mood Playlists</p>
          </div>
          <div className="categories">
            <span>{moods.length}</span>
            <p>Categories</p>
          </div>
        </div>
        <div className="mood-section">
          <div className="mood-header">
            <select
              className="mood-select"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
              <option value="">All Moods</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood.toUpperCase()}
                </option>
              ))}
            </select>
            <p className="track-count">{filteredSongs.length} Tracks</p>
          </div>
          <div className="track-list">
            {songs.map((song) => (
              <div className="track-item" key={song._id}>
                <div className="track-icon">
                  <img src={song.coverUrl} alt={song.title} />
                </div>
                <div className="track-info">
                  <p className="track-name">{song.title}</p>
                  <p className="track-artist">{song.artist}</p>
                </div>
                <p className="track-duration">
                  {formatDuration(song.duration)}
                </p>
                <span
                  className="delete-btn"
                  onClick={() => handleDelete(song._id)}
                >
                  <Trash2 />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playlists;
