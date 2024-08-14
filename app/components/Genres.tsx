import React from "react";

const Genres: React.FC = () => {
  const genres = ["Hip-Hop", "Rave"];

  return (
    <div className="genres-popup" style={{ position: "absolute", top: "0", left: "0", width: "50vw", height: "100vh", backgroundColor: "#000", color: "#fff", display: "flex", alignItems: "center" }}>
      <h1>Genres</h1>
      <div className="genres-list">
        {genres.map((genre) => (
          <button
            key={genre}
            className="text-white"
            style={{ backgroundColor: "transparent !important", border: "none !important", cursor: "pointer !important" }}
            onClick={() => console.log(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Genres;