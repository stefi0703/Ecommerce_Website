import React, { useState, useEffect } from "react";
import Product from "./Product";
import "./Products.css";
import { ProductData } from "./Product";

interface ProductsProps {
  onAddToCart: (product: ProductData) => void;
  onAddToFavorite: (product: ProductData) => void;
  selectedCategory: string;
  showResigilate: boolean;
  sortByDiscount?: boolean;
  sortByRating?: boolean;
  searchQuery?: string;
}

const Products: React.FC<ProductsProps> = ({
  onAddToCart,
  onAddToFavorite,
  selectedCategory,
  sortByDiscount,
  sortByRating,
  showResigilate,
  searchQuery = "",
}) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const initialProducts = data.products.map((product: ProductData) => ({
          ...product,
          resigilate: false, 
        }));

        initialProducts.slice(0, 5).forEach((product: ProductData) => {
          product.resigilate = true;
        });

        let filteredProducts = initialProducts.filter(
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

        // Apply sorting based on discount or rating
        if (sortByDiscount) {
          filteredProducts.sort(
            (a: ProductData, b: ProductData) =>
              (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)
          );
        } else if (sortByRating) {
          filteredProducts.sort(
            (a: ProductData, b: ProductData) =>
              (b.rating ?? 0) - (a.rating ?? 0)
          );
        }

        setProducts(filteredProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [
    selectedCategory,
    showResigilate,
    searchQuery,
    sortByDiscount,
    sortByRating,
  ]);

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
