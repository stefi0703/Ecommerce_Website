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
  searchQuery?: string;
}

const Products: React.FC<ProductsProps> = ({
  onAddToCart,
  onAddToFavorite,
  selectedCategory,
  showResigilate,
  searchQuery = "",
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        // Initialize all products with resigilate set to false
        const initialProducts = data.products.map((product: ProductData) => ({
          ...product,
          resigilate: false, // Simulate a random resigilate status for demonstration
        }));

        // Simulate setting 5 random products to resigilate = true
        initialProducts.slice(0, 5).forEach((product: ProductData) => {
          product.resigilate = true;
        });

        // Apply all filters in one go to avoid multiple state updates
        const filteredProducts = initialProducts.filter(
          (product: ProductData) => {
            const matchesCategory = selectedCategory
              ? product.category === selectedCategory
              : true;
            const matchesResigilate = showResigilate
              ? product.resigilate
              : true;
            const matchesSearchQuery =
              searchQuery.length > 0
                ? product.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  (product.brand ?? "")
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  product.category
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                : true;

            return matchesCategory && matchesResigilate && matchesSearchQuery;
          }
        );

        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [selectedCategory, showResigilate, searchQuery]);

  // useEffect(() => {
  //   fetch("https://dummyjson.com/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // First, ensure all products are initially set to resigilate: false
  //       const initialProducts = data.products.map((product: ProductData) => ({
  //         ...product,
  //         resigilate: false,
  //       }));

  //       const shuffledProducts = initialProducts.slice(0, 5);
  //       shuffledProducts.forEach(
  //         (product: ProductData) => (product.resigilate = true)
  //       );
  //       setProducts(initialProducts);

  //       // Apply filters based on selected category and resigilate status
  //       let filteredProducts = initialProducts;
  //       if (selectedCategory) {
  //         filteredProducts = filteredProducts.filter(
  //           (product: ProductData) => product.category === selectedCategory
  //         );
  //       }
  //       if (showResigilate) {
  //         filteredProducts = filteredProducts.filter(
  //           (product: ProductData) => product.resigilate
  //         );
  //       }

  //       setProducts(filteredProducts);
  //     })
  //     .catch((error) => console.error("Error fetching products:", error));
  // }, [selectedCategory, showResigilate]);

  // useEffect(() => {
  //   // Apply filters based on selected category and resigilate status
  //   let filteredProducts = products;
  //   if (selectedCategory) {
  //     filteredProducts = filteredProducts.filter(
  //       (product: ProductData) => product.category === selectedCategory
  //     );
  //   }
  //   if (!showResigilate) {
  //     filteredProducts = filteredProducts.filter(
  //       (product: ProductData) => !product.resigilate
  //     );
  //   }

  //   setProducts(filteredProducts);
  // }, [selectedCategory, showResigilate]);

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
          brand={product.brand ?? ""} // Provide a default value of an empty string if brand is undefined
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
