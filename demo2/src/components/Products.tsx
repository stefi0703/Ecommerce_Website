// Products.tsx
import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./Products.css";
import { ProductData } from "./Product";

interface ProductsProps {
  onAddToCart: (product: ProductData) => void; // Adjust the type here
  onAddToFavorite: () => void;
}

const Products: React.FC<ProductsProps> = ({
  onAddToCart = (product: ProductData) => {},
  onAddToFavorite,
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <Product
          key={product.id}
          id={product.id}
          title={product.title}
          category={product.category}
          description={product.description}
          price={product.price}
          images={product.images}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      ))}
    </div>
  );
};

export default Products;
