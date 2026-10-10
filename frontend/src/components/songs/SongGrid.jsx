import React from "react";
import "../../css/songs/SongGrid.css";
import "../../css/songs/SongCard.css";

const SongGrid = ({ songs = [], onSongSelect }) => {
  if (!songs || songs.length === 0) {
    return (
      <div className="song-grid-wrapper">
        <h2 className="song-grid-heading">Favourite Songs</h2>
        <div className="empty-text">
          <p>No favourite songs added yet.</p>
          <p className="empty-subtext">Click the heart icon on any track to add it to your favourites.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="song-grid-wrapper">
      <h2 className="song-grid-heading">Favourite Songs</h2>
      <div className="song-grid">
        {songs.map((song, index) => (
          <div
            key={song.id}
            className="song-card"
            onClick={() => onSongSelect && onSongSelect(index)}
          >
            <div className="song-card-image">
              <img
                src={song.image || "https://images.unsplash.com/photo-1511379938547-c1f69419868d"}
                alt={song.name || song.title}
              />
            </div>
            <div className="song-card-info">
              <h4 className="song-title">{song.name || song.title}</h4>
              <p className="song-artist">{song.artist_name || "Unknown Artist"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongGrid;
