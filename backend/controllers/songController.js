import axios from "axios";

const getSongs = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.jamendo.com/v3.0/tracks/?client_id=ea61a820&format=jsonpretty&limit=15"
    );

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getPlaylistByTag = async (req, res) => {
  try {
    const tag = (req.params.tag || req.query.tag || "")
      .toString()
      .trim();

    if (!tag) {
      return res.status(400).json({
        message: "Missing Tag Parameters",
      });
    }

    const limit = parseInt(req.query.limit ?? "10", 10) || 10;
    const clientId = "ea61a820";

    const params = {
      client_id: clientId,
      format: "jsonpretty",
      tags: tag,
      limit,
    };

    const response = await axios.get(
      "https://api.jamendo.com/v3.0/tracks/",
      { params }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error(
      "getPlaylistTag error",
      error?.response?.data ?? error.message ?? error
    );

    return res.status(500).json({
      message: "Failed to fetch",
    });
  }
};

const toggleFavourite = async (req, res) => {
  try {
    const user = req.user;
    const song = req.body.song;

    if (!song || !song.id) {
      return res.status(400).json({
        message: "Invalid song data",
      });
    }

    const index = user.favourites.findIndex(
      (fav) => fav.id === song.id
    );

    if (index !== -1) {
      user.favourites.splice(index, 1);
    } else {
      user.favourites.push(song);
    }

    await user.save();

    return res.status(200).json({
      message: index !== -1
        ? "Removed from favourites"
        : "Added to favourites",
      favourites: user.favourites,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export{getSongs , getPlaylistByTag , toggleFavourite };