import React, { useState } from "react";
import cartIcon from "./cart.png";
import "./Cart.css";

interface CartProps {
  cartCount: number;
  cartProducts: any[]; // Ideally, this should be typed more specifically
  onDeleteProduct: (productId: number, quantity: number) => void;
  onUpdateProductQuantity: (productId: number, newQuantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cartCount,
  cartProducts,
  onDeleteProduct,
  onUpdateProductQuantity,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate the total cost of items in the cart
  const totalCost = cartProducts.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleDeleteButtonClick = (
    productId: number,
    quantity: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default behavior of the button
    onDeleteProduct(productId, quantity);
  };

  const handleQuantityIncrement = (
    productId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default behavior of the button
    const product = cartProducts.find((p) => p.id === productId);
    if (product) {
      const newQuantity = product.quantity + 1;
      onUpdateProductQuantity(productId, newQuantity);
    }
  };

  const handleQuantityDecrement = (
    productId: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevent the default behavior of the button
    const product = cartProducts.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      onUpdateProductQuantity(productId, newQuantity);
    }
  };

  return (
    <div
      className="cart-icon-container"
      onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <img src={cartIcon} alt="Cart" className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
      {isHovered && cartProducts.length !== 0 && (
        <div className="cart-details">
          <h4>Products in Cart:</h4>
          {cartProducts.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.images[0]}
                alt={product.title}
                className="product-image"
              />
              <p>{product.title}</p>
              <div className="quantity-label">
                <button
                  type="button"
                  onClick={(event) =>
                    handleQuantityDecrement(product.id, event)
                  }
                  className="quantity-button"
                >
                  -
                </button>{" "}
                {product.quantity}{" "}
                <button
                  type="button"
                  onClick={(event) =>
                    handleQuantityIncrement(product.id, event)
                  }
                  className="quantity-button"
                >
                  +
                </button>{" "}
              </div>
              <div id="space">
                <div className="partial-cost">
                  ${product.price} x {product.quantity} = $
                  {product.price * product.quantity}
                </div>
                <button
                  onClick={(event) =>
                    handleDeleteButtonClick(product.id, product.quantity, event)
                  }
                  className="delete-button"
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <div className="total-cost">
            <strong>Total Cost: ${totalCost.toFixed(2)}</strong>
          </div>
        </div>
      )}
      {isHovered && cartProducts.length === 0 && (
        <div className="cart-details">
          <p>No products in cart</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
