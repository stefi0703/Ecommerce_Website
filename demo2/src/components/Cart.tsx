// Cart.tsx
import React, { useState } from "react";
import cartIcon from "./cart.png";
import "./Cart.css";
interface CartProps {
  cartCount: number;
  cartProducts: any[]; // Array of products in the cart
}

const Cart: React.FC<CartProps> = ({ cartCount, cartProducts }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cart-icon-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={cartIcon} alt="Cart" className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
      {/* {isHovered && cartProducts.length > 0 && ( */}
      <div className="cart-details">
        <h4>Products in Cart:</h4>
        {cartProducts.map((product) => (
          <div key={product.id} className="cart-item">
            <p>
              {product.title} - ${product.price} x {product.quantity}
            </p>
            <img
              src={product.images[0]}
              alt={product.title}
              id="product-image"
            />
          </div>
        ))}
      </div>
      {/* )} */}
      {isHovered && cartProducts.length === 0 && (
        <div className="cart-details">
          <p>No products in cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
