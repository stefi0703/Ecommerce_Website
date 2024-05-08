import React from "react";
import favoriteIcon from "./favorite.png";
import "./Favorite.css";

interface FavoriteProps {
  favoriteCount: number;
}

const Favorite: React.FC<FavoriteProps> = ({ favoriteCount }) => {
  return (
    <div className="favorite-icon-container">
      <img src={favoriteIcon} alt="Favorite" className="favorite-icon" />
      <span className="favorite-count">{favoriteCount}</span>
    </div>
  );
};

export default Favorite;
