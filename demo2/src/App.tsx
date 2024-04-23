// App.tsx
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import CartIcon from './components/Cart';
import ProductsPage from './components/Products';
import './App.css';

const App: React.FC = () => {
  const [cartCount, setCartCount] = useState<number>(0); // Define state with TypeScript type

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="app">
      <NavBar cartCount={cartCount} />
      <ProductsPage onAddToCart={handleAddToCart} />
      {/* other components or content */}
    </div>
  );
};

export default App;
