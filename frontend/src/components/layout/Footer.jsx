import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";
import "../../css/footer/Footer.css";

const Footer = ({
  currentSong,
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onMute,
  volume = 1,
  onVolumeChange,
  isMuted = false,
  loopEnabled = false,
  onToggleLoop,
  shuffleEnabled = false,
  onToggleShuffle,
  playbackSpeed = 1,
  onChangeSpeed,
  isFavourite = false,
  onToggleFavourite,
}) => {
  return (
    <footer className="footer-root footer-glow">
      <SongDetail currentSong={currentSong} />

      <ControlArea
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onPlayPause={onPlayPause}
        onNext={onNext}
        onPrev={onPrev}
        onSeek={onSeek}
        isFavourite={isFavourite}
        onToggleFavourite={onToggleFavourite}
      />

      <Features
        isMuted={isMuted}
        onMute={onMute}
        volume={volume}
        onVolumeChange={onVolumeChange}
        shuffleEnabled={shuffleEnabled}
        onToggleShuffle={onToggleShuffle}
        loopEnabled={loopEnabled}
        onToggleLoop={onToggleLoop}
        playbackSpeed={playbackSpeed}
        onChangeSpeed={onChangeSpeed}
      />
    </footer>
  );
};

export default Footer;
