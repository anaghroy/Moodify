import { createContext, useRef, useState } from "react";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [progress, setProgress] = useState(0);

  const playTrack = (src) => {
    if (currentTrack !== src) {
      audioRef.current.src = src;
      setCurrentTrack(src);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) pauseTrack();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentTrack,
        progress,
        playTrack,
        pauseTrack,
        togglePlay,
        setProgress,
      }}
    >
      <audio ref={audioRef} preload="metadata" />
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
