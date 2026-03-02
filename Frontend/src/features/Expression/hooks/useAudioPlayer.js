import { useRef, useState, useEffect, useCallback } from "react";

const useAudioPlayer = (src) => {
  const audioRef = useRef(null);
  const lineRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // Play / Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;

    if (audio.src !== src) {
      audio.src = src;
      audio.load();
    }
  }, [src]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.paused ? audio.play() : audio.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleVolumeChange = () => {
      setIsMuted(audio.muted);
    };
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("volumechange", handleVolumeChange);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  // Seek by percent
  const seekToPercent = useCallback(
    (percent) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;

      const newTime = percent * duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration],
  );

  // Click seek
  const handleSeekClick = useCallback(
    (e) => {
      if (!lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = Math.min(Math.max(clickX / rect.width, 0), 1);

      seekToPercent(percent);
    },
    [seekToPercent],
  );

  // Drag logic
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const moveX = e.clientX - rect.left;
      const percent = Math.min(Math.max(moveX / rect.width, 0), 1);

      seekToPercent(percent);
    };

    const stopDrag = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stopDrag);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stopDrag);
    };
  }, [isDragging, seekToPercent]);

  // Audio listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration);
    const handleEnded = () => {
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Format time
  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, []);

  return {
    audioRef,
    lineRef,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    handleSeekClick,
    setIsDragging,
    formatTime,
    isMuted,
    toggleMute,
  };
};

export default useAudioPlayer;
