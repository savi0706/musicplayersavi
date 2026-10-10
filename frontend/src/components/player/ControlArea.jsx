import React from "react";
import { GiPauseButton } from "react-icons/gi";
import { FaCirclePlay } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import "../../css/footer/ControlArea.css";

const formatTime = (secs) => {
  if (!secs || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

const ControlArea = ({
  isPlaying = false,
  currentTime = 0,
  duration = 0,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  isFavourite = false,
  onToggleFavourite,
}) => {
  return (
    <div className="control-root">
      {/* Control Buttons */}
      <div className="control-buttons">
        <button
          type="button"
          aria-label="previous"
          className="control-icon-btn"
          onClick={onPrev}
        >
          <TbPlayerTrackPrevFilled color="#a855f7" size={24} />
        </button>
        <button
          type="button"
          aria-label="play"
          className="control-play-btn"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <GiPauseButton color="#a855f7" size={42} />
          ) : (
            <FaCirclePlay color="#a855f7" size={42} />
          )}
        </button>

        <button
          type="button"
          aria-label="next"
          className="control-icon-btn"
          onClick={onNext}
        >
          <TbPlayerTrackNextFilled color="#a855f7" size={24} />
        </button>

        {onToggleFavourite && (
          <button
            type="button"
            aria-label="like"
            className="control-icon-btn"
            onClick={onToggleFavourite}
          >
            {isFavourite ? (
              <FaHeart color="#ec4899" size={22} />
            ) : (
              <FaRegHeart color="#a855f7" size={22} />
            )}
          </button>
        )}
      </div>

      <div className="control-progress-wrapper">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime || 0}
          step={0.5}
          onChange={(e) => onSeek && onSeek(Number(e.target.value))}
          className="control-progress"
          aria-label="Seek track"
        />
        <div className="control-times">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlArea;
