import { useRef } from "react";
import useFaceExpression from "../hooks/useFaceExpression";
import logo from "../../../assets/images/logo.png";
import { LogOut, MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useLogout from "../../auth/hooks/useLogout";
import MusicPlayer from "./MusicPlayer";
import Playlists from "./Playlists";

export default function FaceExpression() {
  const { logout } = useLogout();
  const navigate = useNavigate();

  /**Logout function */
  async function handleLogout() {
    const res = await logout();

    if (res.success) {
      toast.success("Logged out successfully");
      navigate("/");
    } else {
      toast.error(res.message || "Logout failed");
    }
  }

  // For theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const videoRef = useRef(null);
  const [capturedMood, setCapturedMood] = useState(null);
  const { emotion, emotionLabel, startDetection, stopDetection, isDetecting } =
    useFaceExpression(videoRef);

  /**Local Storage */
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  return (
    <div className="outer-wrapper">
      <nav>
        <div className="logo-wrapper">
          <img src={logo} alt="logo" />
          <p>Moodify</p>
        </div>
        <div className="right">
          <div className="btn-wrapper">
            <button
              className={theme === "light" ? "active" : ""}
              onClick={() => setTheme("light")}
            >
              <Sun />
            </button>
            <button
              className={theme === "dark" ? "active" : ""}
              onClick={() => setTheme("dark")}
            >
              <MoonStar />
            </button>
          </div>
          <div className="logout-wrapper" onClick={handleLogout}>
            <LogOut className="logout" />
          </div>
        </div>
      </nav>
      <div className="content-wrapper">
        <div className="face-wrapper">
          <div className="frame">
            <div className="camera-box">
              <video ref={videoRef} autoPlay playsInline width={700} />
              <div className="camera-overlay"></div>
            </div>
            <div className="emotion-box">
              <h2>{emotion || "Waiting"}</h2>
            </div>
            <p>Current emotion tracked</p>

            {!isDetecting ? (
              <button className="detect-btn" onClick={startDetection}>
                Detect Expression
              </button>
            ) : (
              <button className="stop-btn" onClick={stopDetection}>
                Stop Detection
              </button>
            )}
            <button
              className="capture"
              disabled={!emotionLabel || emotionLabel === "Idle"}
              onClick={() => {
                stopDetection();
                setCapturedMood(emotionLabel);
              }}
            >
              Capture Mood
            </button>
          </div>
        </div>

        <Playlists />
      </div>
      {capturedMood && <MusicPlayer mood={capturedMood} />}
    </div>
  );
}
