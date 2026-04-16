import { useSelector } from "react-redux";
import Auth from "../auth/Auth";
import Playlist from "../player/Playlist";
import SearchBar from "../search/SearchBar";
import SongList from "../player/SongList";
import SongGrid from "../songs/SongGrid";
import "../../css/mainArea/MainArea.css";

const MainArea = ({
  view,
  songs,
  currentIndex,
  onSongSelect,
  searchQuery,
  setSearchQuery,
}) => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="mainarea-root">
      {/* TOP BAR */}
      <div className="mainarea-top">
        <Auth />

        {view === "home" && <Playlist />}

        {view === "search" && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </div>

      {/* CONTENT */}
      <div className="mainarea-scroll">
        {(view === "home" || view === "search") && (
          <SongList
            songs={songs}
            currentIndex={currentIndex}
            onSongSelect={onSongSelect}
          />
        )}

        {view === "favourite" && (
          <SongGrid
            songs={auth?.user?.favourites || []}
            onSongSelect={onSongSelect}
          />
        )}
      </div>
    </div>
  );
};

export default MainArea;
