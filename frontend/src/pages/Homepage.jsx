import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Footer from "../components/layout/Footer";
import SideMenu from "../components/layout/SideMenu";
import MainArea from "../components/layout/MainArea";
import useAudioPlayer from "../hooks/useAudioPlayer";
import "../css/pages/HomePage.css";

const Homepage = () => {
  const [view, setView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const defaultSongs = [
    {
      id: "1",
      name: "Echoes of You",
      artist_name: "Lunar Keys",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
      releasedate: "2021",
      duration: "03:42",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "2",
      name: "Midnight Drive",
      artist_name: "Neon Waves",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      releasedate: "2020",
      duration: "04:05",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "3",
      name: "Falling Slowly",
      artist_name: "Aurora Lane",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      releasedate: "2019",
      duration: "03:58",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  const [songList, setSongList] = useState(defaultSongs);

  // Load songs from backend if available
  useEffect(() => {
    const fetchBackendSongs = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
        const res = await axios.get(`${baseUrl}/api/song`);
        if (res.data?.results && Array.isArray(res.data.results) && res.data.results.length > 0) {
          const mapped = res.data.results.map((t) => ({
            id: String(t.id),
            name: t.name,
            artist_name: t.artist_name,
            image: t.image,
            duration: t.duration
              ? `${Math.floor(t.duration / 60)}:${t.duration % 60 < 10 ? "0" : ""}${t.duration % 60}`
              : "3:30",
            audio: t.audio,
            url: t.audio,
            releasedate: t.releasedate || "2024",
          }));
          setSongList(mapped);
        }
      } catch {
        // Fall back to default songs
      }
    };
    fetchBackendSongs();
  }, []);

  const handleSelectPlaylist = async (tag) => {
    if (selectedTag === tag) {
      setSelectedTag("");
      return;
    }
    setSelectedTag(tag);
    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      const res = await axios.get(`${baseUrl}/api/song/playlistByTag/${tag}`);
      if (res.data?.results && Array.isArray(res.data.results) && res.data.results.length > 0) {
        const mapped = res.data.results.map((t) => ({
          id: String(t.id),
          name: t.name,
          artist_name: t.artist_name,
          image: t.image,
          duration: t.duration
            ? `${Math.floor(t.duration / 60)}:${t.duration % 60 < 10 ? "0" : ""}${t.duration % 60}`
            : "3:30",
          audio: t.audio,
          url: t.audio,
          releasedate: t.releasedate || "2024",
        }));
        setSongList(mapped);
      }
    } catch (err) {
      console.log("Could not fetch playlist by tag:", err.message);
    }
  };

  const filteredSongs = songList.filter((song) =>
    `${song.name} ${song.artist_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const audioRef = useRef(null);
  const audioPlayer = useAudioPlayer(songList, audioRef);

  const handleSongSelect = (index, currentList = songList) => {
    const selected = currentList[index];
    if (!selected) return;
    const originalIndex = songList.findIndex((s) => String(s.id) === String(selected.id));
    if (originalIndex !== -1) {
      audioPlayer.playSongAtIndex(originalIndex);
    }
  };

  const activeSongs = view === "search" ? filteredSongs : songList;

  return (
    <div className="homepage-root">
      {/* AUDIO ELEMENT */}
      <audio
        ref={audioRef}
        onTimeUpdate={audioPlayer.handleTimeUpdate}
        onLoadedMetadata={audioPlayer.handleLoadedMetadata}
        onEnded={audioPlayer.handleEnded}
      />

      <div className="homepage-main-wrapper">
        <div className="homepage-sidebar">
          <SideMenu setView={setView} view={view} />
        </div>

        <div className="homepage-content">
          <MainArea
            view={view}
            songs={activeSongs}
            currentIndex={audioPlayer.currentIndex}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectPlaylist={handleSelectPlaylist}
            selectedTag={selectedTag}
            onSongSelect={(idx) =>
              handleSongSelect(idx, activeSongs)
            }
          />
        </div>
      </div>

      <Footer
        currentSong={audioPlayer.currentSong}
        isPlaying={audioPlayer.isPlaying}
        currentTime={audioPlayer.currentTime}
        duration={audioPlayer.duration}
        onPlayPause={audioPlayer.handleTogglePlay}
        onNext={audioPlayer.handleNext}
        onPrev={audioPlayer.handlePrev}
        onSeek={audioPlayer.handleSeek}
        onMute={audioPlayer.handleToggleMute}
        volume={audioPlayer.volume}
        onVolumeChange={audioPlayer.handleChangeVolume}
        isMuted={audioPlayer.isMuted}
        loopEnabled={audioPlayer.loopEnabled}
        onToggleLoop={audioPlayer.toggleLoop}
        shuffleEnabled={audioPlayer.shuffleEnabled}
        onToggleShuffle={audioPlayer.toggleShuffle}
        playbackSpeed={audioPlayer.playbackSpeed}
        onChangeSpeed={audioPlayer.handleChangeSpeed}
      />
    </div>
  );
};

export default Homepage;
