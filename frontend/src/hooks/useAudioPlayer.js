import { useReducer, useRef, useState } from "react";

/* ================= INITIAL STATE ================= */
const initialAudioState = {
  isPlaying: false,
  isLoading: false,
  isMuted: false,
  volume: 1,
  playbackSpeed: 1,
  loopEnabled: false,
  shuffleEnabled: false,
  currentIndex: null,
  currentSong: null,
  currentTime: 0,
};

/* ================= REDUCER ================= */
function audioReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };

    case "PLAY":
      return { ...state, isPlaying: true, isLoading: false };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "MUTE":
      return { ...state, isMuted: true };

    case "UNMUTE":
      return { ...state, isMuted: false };

    case "SET_VOLUME":
      return { ...state, volume: action.payload };

    case "SET_PLAYBACK_SPEED":
      return { ...state, playbackSpeed: action.payload };

    case "TOGGLE_LOOP":
      return {
        ...state,
        loopEnabled: !state.loopEnabled,
        shuffleEnabled: false,
      };

    case "TOGGLE_SHUFFLE":
      return {
        ...state,
        shuffleEnabled: !state.shuffleEnabled,
        loopEnabled: false,
      };

    case "SET_CURRENT_TRACK":
      return {
        ...state,
        currentIndex: action.payload.index,
        currentSong: action.payload.song,
        isLoading: true,
      };

    case "SET_CURRENT_TIME":
      return { ...state, currentTime: action.payload };

    default:
      return state;
  }
}

/* ================= HOOK ================= */
const useAudioPlayer = (songs = []) => {
  const [audioState, dispatch] = useReducer(
    audioReducer,
    initialAudioState
  );

  const audioRef = useRef(null);
  const previousVolumeRef = useRef(1);
  const [duration, setDuration] = useState(0);

  /* ================= PLAY SONG ================= */
  const playSongAtIndex = (index) => {
    if (!songs.length) return;
    if (index < 0 || index >= songs.length) return;

    const song = songs[index];

    dispatch({
      type: "SET_CURRENT_TRACK",
      payload: { index, song },
    });

    dispatch({ type: "SET_CURRENT_TIME", payload: 0 });

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = song.url;
    audio.load();

    audio.volume = audioState.volume;
    audio.muted = audioState.isMuted;
    audio.playbackRate = audioState.playbackSpeed;

    dispatch({ type: "LOADING" });

    audio
      .play()
      .then(() => dispatch({ type: "PLAY" }))
      .catch((err) => console.error("Play error:", err));
  };

  /* ================= PLAY / PAUSE ================= */
  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => dispatch({ type: "PLAY" }))
        .catch(() => {});
    } else {
      audio.pause();
      dispatch({ type: "PAUSE" });
    }
  };

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (!songs.length) return;

    let nextIndex;

    if (audioState.shuffleEnabled) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex =
        audioState.currentIndex + 1 >= songs.length
          ? 0
          : audioState.currentIndex + 1;
    }

    playSongAtIndex(nextIndex);
  };

  /* ================= PREVIOUS ================= */
  const handlePrev = () => {
    if (!songs.length) return;

    let prevIndex =
      audioState.currentIndex - 1 < 0
        ? songs.length - 1
        : audioState.currentIndex - 1;

    playSongAtIndex(prevIndex);
  };

  /* ================= SONG ENDED ================= */
  const handleEnded = () => {
    if (audioState.loopEnabled) {
      playSongAtIndex(audioState.currentIndex);
    } else {
      handleNext();
    }
  };

  /* ================= MUTE ================= */
  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audioState.isMuted) {
      audio.muted = false;
      audio.volume = previousVolumeRef.current;
      dispatch({ type: "UNMUTE" });
    } else {
      previousVolumeRef.current = audio.volume;
      audio.muted = true;
      dispatch({ type: "MUTE" });
    }
  };

  /* ================= VOLUME ================= */
  const handleChangeVolume = (newVolume) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = newVolume;
    dispatch({ type: "SET_VOLUME", payload: newVolume });

    if (newVolume === 0) {
      audio.muted = true;
      dispatch({ type: "MUTE" });
    } else if (audioState.isMuted) {
      audio.muted = false;
      dispatch({ type: "UNMUTE" });
    }

    previousVolumeRef.current = newVolume;
  };

  /* ================= SEEK ================= */
  const handleSeek = (newTime) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = newTime;
    dispatch({ type: "SET_CURRENT_TIME", payload: newTime });
  };

  /* ================= SPEED ================= */
  const handleChangeSpeed = (speed) => {
    const audio = audioRef.current;
    dispatch({ type: "SET_PLAYBACK_SPEED", payload: speed });
    if (audio) audio.playbackRate = speed;
  };

  return {
    /* Audio Ref */
    audioRef,

    /* Song State */
    currentIndex: audioState.currentIndex,
    currentSong: audioState.currentSong,
    isPlaying: audioState.isPlaying,
    isLoading: audioState.isLoading,
    currentTime: audioState.currentTime,
    duration,

    /* Toggles */
    isMuted: audioState.isMuted,
    loopEnabled: audioState.loopEnabled,
    shuffleEnabled: audioState.shuffleEnabled,
    playbackSpeed: audioState.playbackSpeed,
    volume: audioState.volume,

    /* Controls */
    playSongAtIndex,
    handleTogglePlay,
    handleNext,
    handlePrev,
    handleEnded,
    handleToggleMute,
    handleChangeVolume,
    handleSeek,
    handleChangeSpeed,

    /* Toggle buttons */
    toggleLoop: () => dispatch({ type: "TOGGLE_LOOP" }),
    toggleShuffle: () => dispatch({ type: "TOGGLE_SHUFFLE" }),

    /* Meta */
    setDuration,
    dispatch,
  };
};

export default useAudioPlayer;
