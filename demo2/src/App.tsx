// App.tsx
import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import { ProductData } from "./components/Product";
import "./App.css";

// Define ProductData type

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [favoriteCount, setFavoriteCount] = useState<number>(0);
  const [cartProducts, setCartProducts] = useState<ProductData[]>([]);

  // handleAddToCart function should accept ProductData as argument
  // const handleAddToCart = (product: ProductData) => {
  //   setCartCount((prevCount) => prevCount + 1);
  //   setCartProducts([...cartProducts, product]);
  // };

  const handleAddToCart = (product: ProductData) => {
    const productExists = cartProducts.find((p) => p.id === product.id);
    if (productExists) {
      // If the product exists, increment the quantity
      setCartProducts(
        cartProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      // If the product does not exist, add it with a quantity of 1
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleAddToFavorite = () => {
    setFavoriteCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="app">
      <NavBar
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        cartProducts={cartProducts}
      />

      <Products
        onAddToCart={handleAddToCart}
        onAddToFavorite={handleAddToFavorite}
      />
    </div>
  );
};

export default App;
