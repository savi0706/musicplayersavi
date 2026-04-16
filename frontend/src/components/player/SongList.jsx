import { useDispatch, useSelector } from "react-redux";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  addFavourite,
  removeFavourite,
} from "../../redux/authSlice";
import "../../css/mainArea/SongList.css";

const SongList = ({ songs, onSongSelect }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
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
    user?.favourites?.some((s) => s.id === songId);

  const handleFavourite = (e, song) => {
    e.stopPropagation(); // 🔥 prevents song play click

    if (!isAuthenticated) {
      alert("Please login to add favourites");
      return;
    }

    if (isFavourite(song.id)) {
      dispatch(removeFavourite(song.id));
    } else {
      dispatch(addFavourite(song));
    }
  };

  return (
    <div className="songlist-root">
      <div className="songlist-scroll">
        <table className="songlist-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Artist</th>
              <th>Year</th>
              <th>❤️</th>
              <th>Duration</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song, index) => (
              <tr
                key={song.id}
                className="songlist-row"
                onClick={() => onSongSelect(index)}
              >
                <td>{index + 1}</td>
                <td>{song.name}</td>
                <td>{song.artist_name}</td>
                <td>{song.releasedate}</td>

                {/* ❤️ Favourite Button */}
                <td>
                  <button
                    onClick={(e) =>
                      handleFavourite(e, song)
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
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

                <td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
