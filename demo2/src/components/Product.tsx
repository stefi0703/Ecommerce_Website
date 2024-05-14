import React, { useState } from "react";
import "./Product.css";

export interface ProductData {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  quantity: number;
}

interface ProductProps {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  onAddToCart: (product: ProductData) => void;
  onAddToFavorite: () => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  title,
  category,
  description,
  price,
  images,
  onAddToCart,
  onAddToFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="product-item">
      <div className="product-images-container">
        <img
          src={images[currentImageIndex]}
          alt={`${title} ${currentImageIndex + 1}`}
          className="product-image"
        />
        {images.length > 1 && (
          <>
            <button className="carousel-control left" onClick={prevImage}>
              &lt;
            </button>
            <button className="carousel-control right" onClick={nextImage}>
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-category">Category:{category}</p>
        <p className="product-description">{description}</p>
        <p className="product-price">${price}</p>
        <button
          onClick={() =>
            onAddToCart({
              id,
              title,
              price,
              category,
              description,
              images,
              quantity: 1,
            })
          }
          className="addtocartbutton"
        >
          Add to Cart
        </button>
        <button onClick={onAddToFavorite} className="addtofavoritebutton">
          Add to Favorite
        </button>
      </div>
    </div>
  );
};

export default Product;
