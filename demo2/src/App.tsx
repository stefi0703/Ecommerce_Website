// App.tsx
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import "./App.css";

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0); // Define state with TypeScript type
  const [favoriteCount, setFavoriteCount] = useState<number>(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const handleAddToFavorite = () => {
    setFavoriteCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="app">
      <NavBar cartCount={cartCount} favoriteCount={favoriteCount} />
      <Products
        onAddToCart={handleAddToCart}
        onAddToFavorite={handleAddToFavorite}
      />
      {/* other components or content */}
    </div>
  );
};

export default App;
