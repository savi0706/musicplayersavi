import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import useAudioPlayer from "../hooks/useAudioPlayer";
import "../css/pages/HomePage.css";

const Homepage = () => {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const songs = [
    {
      id: 1,
      name: "Echoes of You",
      artist_name: "Lunar Keys",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      releasedate: "2021",
      duration: "03:42",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      name: "Midnight Drive",
      artist_name: "Neon Waves",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      releasedate: "2020",
      duration: "04:05",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: 3,
      name: "Falling Slowly",
      artist_name: "Aurora Lane",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      releasedate: "2019",
      duration: "03:58",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  const filteredSongs = songs.filter((song) =>
    `${song.name} ${song.artist_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const audioPlayer = useAudioPlayer(songs);

  return (
    <div className="homepage-root">
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioPlayer.audioRef}
        onEnded={audioPlayer.handleEnded}
      />

      <div className="homepage-main-wrapper">
        <div className="homepage-sidebar">
          <SideMenu setView={setView} view={view} />
        </div>

        <div className="homepage-content">
          <MainArea
            view={view}
            songs={view === "search" ? filteredSongs : songs}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSongSelect={audioPlayer.playSongAtIndex}
          />
        </div>
      </div>

      <Footer
        currentSong={audioPlayer.currentSong}
        isPlaying={audioPlayer.isPlaying}
        onPlayPause={audioPlayer.handleTogglePlay}
        onNext={audioPlayer.handleNext}
        onPrev={audioPlayer.handlePrev}
      />
    </div>
  );
};

export default Homepage;
