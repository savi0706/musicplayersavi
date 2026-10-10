import React from "react";
import SongDetail from "../player/SongDetail";
import ControlArea from "../player/ControlArea";
import Features from "../player/Features";
import "../../css/footer/Footer.css";
import {
  AiFillPlayCircle,
  AiFillPauseCircle,
  AiFillStepForward,
  AiFillStepBackward,
} from "react-icons/ai";
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
import "../../css/footer/Footer.css";

const Footer = ({
  currentSong,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onMute,
  volume,
  onVolumeChange,
  isMuted,
}) => {
  return (
    <footer className="footer-root">
      {/* SONG INFO */}
      <div className="footer-left">
        {currentSong ? (
          <>
            <img
              src={currentSong.image}
              alt={currentSong.name}
              className="footer-song-image"
            />
            <div>
              <p className="footer-song-name">{currentSong.name}</p>
              <p className="footer-song-artist">
                {currentSong.artist_name}
              </p>
            </div>
          </>
        ) : (
          <p>No song selected</p>
        )}
      </div>

      {/* PLAYER CONTROLS */}
      <div className="footer-center">
        <button onClick={onPrev}>
          <AiFillStepBackward size={26} />
        </button>

        <button onClick={onPlayPause}>
          {isPlaying ? (
            <AiFillPauseCircle size={42} />
          ) : (
            <AiFillPlayCircle size={42} />
          )}
        </button>

        <button onClick={onNext}>
          <AiFillStepForward size={26} />
        </button>
      </div>

      {/* VOLUME CONTROLS */}
      <div className="footer-right">
        <button onClick={onMute}>
          {isMuted || volume === 0 ? (
            <IoMdVolumeOff size={24} />
          ) : (
            <IoMdVolumeHigh size={24} />
          )}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
        />
      </div>
    </footer>
  );
};

export default Footer;
