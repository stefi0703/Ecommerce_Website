// Cart.tsx
import React from "react";
import cartIcon from "./cart.png";
import "./Cart.css";
interface CartProps {
  cartCount: number;
}

const Cart: React.FC<CartProps> = ({ cartCount }) => {
  return (
    <div className="cart-icon-container">
      <img src={cartIcon} alt="Cart" className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
    </div>
  );
};

export default Cart;
