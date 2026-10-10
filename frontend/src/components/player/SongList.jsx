import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addFavourite,
  removeFavourite,
} from "../../redux/authSlice";
import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSongSelect, currentIndex }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector(
    (state) => state.auth
  );

  if (!songs || songs.length === 0) {
    return (
      <div className="songlist-root">
        <div className="songlist-empty">
          <p className="songlist-empty-text">🎵 No songs found</p>
        </div>
      </div>
    );
  }

  const isFavourite = (songId) =>
    user?.favourites?.some((s) => String(s.id) === String(songId));

  const handleFavourite = async (e, song) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert("Please login to add favourites");
      return;
    }

    const authToken = token || localStorage.getItem("token");
    const favState = isFavourite(song.id);

    // Optimistic UI update
    if (favState) {
      dispatch(removeFavourite(song.id));
    } else {
      dispatch(addFavourite(song));
    }

    try {
      const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
      await axios.post(
        `${baseUrl}/api/song/favourite`,
        { song },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
    } catch (err) {
      console.error("Failed to sync favourite with server:", err);
      // Revert local state if request fails
      if (favState) {
        dispatch(addFavourite(song));
      } else {
        dispatch(removeFavourite(song.id));
      }
    }
  };

  return (
    <div className="songlist-root">
      <div className="songlist-scroll">
        <table className="songlist-table">
          <thead>
            <tr>
              <th className="songlist-th col-index th-index">No</th>
              <th className="songlist-th col-name">Name</th>
              <th className="songlist-th col-artist">Artist</th>
              <th className="songlist-th col-year">Year</th>
              <th className="songlist-th col-index th-index">❤️</th>
              <th className="songlist-th col-duration th-duration">Duration</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className={`songlist-row ${currentIndex === index ? "songlist-row-active" : ""}`}
                onClick={() => onSongSelect(index)}
              >
                <td className="songlist-td td-index">{index + 1}</td>
                <td className="songlist-td">{song.name}</td>
                <td className="songlist-td">{song.artist_name}</td>
                <td className="songlist-td">{song.releasedate || "—"}</td>

                {/* ❤️ Favourite Button */}
                <td className="songlist-td td-index">
                  <button
                    type="button"
                    onClick={(e) =>
                      handleFavourite(e, song)
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    aria-label={isFavourite(song.id) ? "Remove favourite" : "Add favourite"}
                  >
                    {isFavourite(song.id) ? (
                      <AiFillHeart
                        size={18}
                        color="#ec4899"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={18}
                        color="#9ca3af"
                      />
                    )}
                  </button>
                </td>

                <td className="songlist-td td-duration">{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
