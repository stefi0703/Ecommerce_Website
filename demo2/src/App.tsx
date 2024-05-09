// App.tsx
import React, { useState } from "react";
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
  const handleAddToCart = (product: ProductData) => {
    setCartCount((prevCount) => prevCount + 1);
    setCartProducts([...cartProducts, product]);
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
      />{" "}
      {/* Pass cartProducts as a prop */}
      <Products
        onAddToCart={handleAddToCart}
        onAddToFavorite={handleAddToFavorite}
      />
      {/* other components or content */}
    </div>
  );
};

export default App;
