import React from "react";
import "../../css/search/SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="searchbar-root">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search songs or artists..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
