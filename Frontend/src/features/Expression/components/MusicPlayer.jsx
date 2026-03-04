import useSongs from "../hooks/useSongs";
import defaultCover from "../../../assets/images/music.jpg";
import {
  Ellipsis,
  MicVocal,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import useAudioPlayer from "../hooks/useAudioPlayer";

const MusicPlayer = ({ mood }) => {
  const { currentSong } = useSongs(mood);
  const {
    lineRef,
    isPlaying,
    currentTime,
    duration,
    progress,
    togglePlay,
    handleSeekClick,
    setIsDragging,
    formatTime,
    toggleMute,
    isMuted,
  } = useAudioPlayer(currentSong?.audioUrl);


  return (
    <section className="music-wrapper">
      <div className="top-para">
        <p className="play">Playing Now</p>
        <div className="btn-para">
          <p className="mood">Mood : {mood}</p>
        </div>
      </div>
      <div className="musicplay-wrapper">
        <div className="top-wrapper">
          <div className="image">
            <img src={currentSong?.coverUrl || defaultCover} alt="music" />
            <div className="title">
              <p className="active">{currentSong?.title || "Loading..."}</p>
              <p>{currentSong?.artist || "Unknown Artist"}</p>
            </div>
          </div>
          <div className="icons">
            <MicVocal />
            <Ellipsis />
          </div>
        </div>
        <div className="middle-wrapper">
          <span>{formatTime(currentTime)}</span>
          <div
            className="line"
            ref={lineRef}
            style={{ "--progress": `${progress}%` }}
            onClick={handleSeekClick}
          >
            <div
              className="circle"
              style={{
                left: `${progress}%`,
              }}
              onMouseDown={() => setIsDragging(true)}
            ></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="bottom-wrapper">
          <div className="volume" onClick={toggleMute}>
            {isMuted ? <VolumeX /> : <Volume2 />}
          </div>
          <div className="effect">
            <SkipBack />
            <div className="pause" onClick={togglePlay}>
              {isPlaying ? <Pause /> : <Play />}
            </div>
            <SkipForward />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
