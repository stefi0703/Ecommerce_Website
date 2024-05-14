// // import React from "react";
// // import favoriteIcon from "./favorite.png";
// // import "./Favorite.css";

// // interface FavoriteProps {
// //   favoriteCount: number;
// // }

// // const Favorite: React.FC<FavoriteProps> = ({ favoriteCount }) => {
// //   return (
// //     <div className="favorite-icon-container">
// //       <img src={favoriteIcon} alt="Favorite" className="favorite-icon" />
// //       <span className="favorite-count">{favoriteCount}</span>
// //     </div>
// //   );
// // };

// // export default Favorite;

// // Favorite.tsx
// import React, { useState } from "react";
// import favoriteIcon from "./favorite.png";
// import "./Favorite.css";
// import { ProductData } from "./Product";

// interface FavoriteProps {
//   favoriteCount: number;
//   favoriteProducts: ProductData[];
// }

// const Favorite: React.FC<FavoriteProps> = ({
//   favoriteCount,
//   favoriteProducts,
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="favorite-icon-container"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img src={favoriteIcon} alt="Favorite" className="favorite-icon" />
//       <span className="favorite-count">{favoriteCount}</span>
//       {isHovered && favoriteProducts.length > 0 && (
//         <div className="favorite-details">
//           <h4>Favorite Products:</h4>
//           {favoriteProducts.map((product) => (
//             <div key={product.id} className="favorite-item">
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="product-image"
//               />
//               <p>{product.title}</p>
//             </div>
//           ))}
//         </div>
//       )}
//       {isHovered && favoriteProducts.length === 0 && (
//         <div className="favorite-details">
//           <p>No favorite products</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorite;

import React, { useState } from "react";
import favoriteIcon from "./favorite.png";
import "./Favorite.css";
import { ProductData } from "./Product";

interface FavoriteProps {
  favoriteCount: number;
  favoriteProducts: ProductData[];
  onRemoveFavorite: (productId: number) => void;
}

const Favorite: React.FC<FavoriteProps> = ({
  favoriteCount,
  favoriteProducts,
  onRemoveFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDeleteButtonClick = (
    productId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default behavior of the button
    onRemoveFavorite(productId);
  };

  return (
    <div
      className="favorite-icon-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={favoriteIcon} alt="Favorite" className="favorite-icon" />
      <span className="favorite-count">{favoriteCount}</span>
      {isHovered && favoriteProducts.length > 0 && (
        <div className="favorite-details">
          <h4>Favorite Products:</h4>
          {favoriteProducts.map((product) => (
            <div key={product.id} className="favorite-item">
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <p>{product.title}</p>
              <button
                onClick={(event) => handleDeleteButtonClick(product.id, event)}
                className="delete-button"
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      {isHovered && favoriteProducts.length === 0 && (
        <div className="favorite-details">
          <p>No favorite products</p>
        </div>
      )}
    </div>
  );
};

export default Favorite;
