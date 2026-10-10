import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { TbArrowsShuffle } from "react-icons/tb";
import { RiLoopRightLine } from "react-icons/ri";

import "../../css/footer/Feature.css";

const Features = ({
  isMuted = false,
  onMute,
  volume = 1,
  onVolumeChange,
  shuffleEnabled = false,
  onToggleShuffle,
  loopEnabled = false,
  onToggleLoop,
  playbackSpeed = 1,
  onChangeSpeed,
}) => {
  return (
    <div className="features-root">
      <div className="features-row">
        {/* Mute */}
        <button
          className="features-btn"
          aria-label={isMuted ? "unmute" : "mute"}
          onClick={onMute}
        >
          {isMuted || volume === 0 ? (
            <IoVolumeMuteOutline color="#ec4899" size={26} />
          ) : (
            <IoVolumeHighOutline color="#a855f7" size={26} />
          )}
        </button>

        {/* Shuffle */}
        <button
          className={`features-btn ${shuffleEnabled ? "features-btn-active" : ""}`}
          aria-label="shuffle"
          onClick={onToggleShuffle}
        >
          <TbArrowsShuffle
            color={shuffleEnabled ? "#a855f7" : "#9ca3af"}
            size={26}
          />
        </button>

        {/* Loop */}
        <button
          className={`features-btn ${loopEnabled ? "features-btn-active" : ""}`}
          aria-label="loop"
          onClick={onToggleLoop}
        >
          <RiLoopRightLine
            color={loopEnabled ? "#a855f7" : "#9ca3af"}
            size={26}
          />
        </button>

        {/* Playback Speed */}
        <label className="features-speed-label">
          <select
            className="features-speed-select"
            value={playbackSpeed}
            onChange={(e) => onChangeSpeed && onChangeSpeed(Number(e.target.value))}
            aria-label="Playback speed"
          >
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </label>
      </div>

      {/* Volume */}
      <div className="features-volume-wrapper">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange && onVolumeChange(Number(e.target.value))}
          className="features-volume-range"
          aria-label="Volume slider"
        />
      </div>
    </div>
  );
};

export default Features;
