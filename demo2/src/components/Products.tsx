// Products.tsx
import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./Products.css";
import { ProductData } from "./Product";

interface ProductsProps {
  onAddToCart: (product: ProductData) => void;
  onAddToFavorite: (product: ProductData) => void;
  selectedCategory: string;
  showResigilate: boolean;
}

const Products: React.FC<ProductsProps> = ({
  onAddToCart,
  onAddToFavorite,
  selectedCategory,
  showResigilate,
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // First, ensure all products are initially set to resigilate: false
        const initialProducts = data.products.map((product: ProductData) => ({
          ...product,
          resigilate: false,
        }));

        const shuffledProducts = initialProducts.slice(0, 5);
        shuffledProducts.forEach(
          (product: ProductData) => (product.resigilate = true)
        );
        setProducts(initialProducts);

        // Apply filters based on selected category and resigilate status
        let filteredProducts = initialProducts;
        if (selectedCategory) {
          filteredProducts = filteredProducts.filter(
            (product: ProductData) => product.category === selectedCategory
          );
        }
        if (showResigilate) {
          filteredProducts = filteredProducts.filter(
            (product: ProductData) => product.resigilate
          );
        }

        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedCategory, showResigilate]);

  useEffect(() => {
    // Apply filters based on selected category and resigilate status
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product: ProductData) => product.category === selectedCategory
      );
    }
    if (!showResigilate) {
      filteredProducts = filteredProducts.filter(
        (product: ProductData) => !product.resigilate
      );
    }

    setProducts(filteredProducts);
  }, [selectedCategory, showResigilate]);

  useEffect(() => {
    if (showResigilate) {
      console.log(
        "Resigilate products:",
        products.filter((product) => product.resigilate)
      );
    }
  }, [products, showResigilate]);

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
          discountPercentage={product.discountPercentage ?? 0} // Provide a default value of 0 if discountPercentage is undefined
          images={product.images}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
        />
      ))}
    </div>
  );
};

export default Products;
