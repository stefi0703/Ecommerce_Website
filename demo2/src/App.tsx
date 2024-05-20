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
  const [favoriteProducts, setFavoriteProducts] = useState<ProductData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showResigilate, setShowResigilate] = useState<boolean>(false);
  const [showDiscounts, setShowDiscounts] = useState<boolean>(false);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleResigilate = () => {
    setShowResigilate(!showResigilate);
  };

  const handleToggleDiscount = () => {
    setShowDiscounts(!showDiscounts);
  };

  const handleToggleRating = () => {
    setShowRating(!showRating);
  };

  const handleAddToCart = (product: ProductData) => {
    setCartCount((prevCount) => prevCount + 1);
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

  const handleAddToFavorite = (product: ProductData) => {
    // Check if the product already exists in the favorite products list
    const productExists = favoriteProducts.some((p) => p.id === product.id);

    if (!productExists) {
      setFavoriteCount((prevCount) => prevCount + 1);
      setFavoriteProducts([...favoriteProducts, product]);
    } else {
      // Product already exists in favorites
      alert("This product is already in favorites!");
    }
  };

  const handleDeleteProduct = (productId: number, quantity: number) => {
    setCartCount((prevCount) => prevCount - quantity); // Decrement cartCount by the quantity of the deleted product
    setCartProducts(cartProducts.filter((product) => product.id !== productId));
  };

  const handleRemoveFavorite = (productId: number) => {
    setFavoriteCount((prevCount) => prevCount - 1);
    setFavoriteProducts(
      favoriteProducts.filter((product) => product.id !== productId)
    );
  };

  const handleUpdateProductQuantity = (
    productId: number,
    newQuantity: number
  ) => {
    setCartProducts(
      cartProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  return (
    <div className="app">
      <NavBar
        cartCount={cartCount}
        favoriteCount={favoriteCount}
        cartProducts={cartProducts}
        onDeleteProduct={handleDeleteProduct}
        favoriteProducts={favoriteProducts}
        onRemoveFavorite={handleRemoveFavorite}
        setSelectedCategory={setSelectedCategory}
        onToggleResigilate={handleToggleResigilate}
        onToggleDiscount={handleToggleDiscount}
        onToggleRating={handleToggleRating}
        onUpdateProductQuantity={handleUpdateProductQuantity}
        setSearchQuery={setSearchQuery}
      />

      <Products
        onAddToCart={handleAddToCart}
        onAddToFavorite={handleAddToFavorite}
        selectedCategory={selectedCategory}
        showResigilate={showResigilate}
        sortByDiscount={showDiscounts}
        sortByRating={showRating}
        searchQuery={searchQuery}
        // Pass the value of selectedCategory instead of setSelectedCategory
      />
    </div>
  );
};

export default App;
