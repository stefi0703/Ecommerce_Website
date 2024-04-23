
// import { useState } from 'react';
// import React, { useEffect } from 'react';
// import './Cart.css'; 
// import cartIcon from './cart.png'; 
// import Product from './Product'; // Import the new Product component
// type CartProps = {
//   cartCount: number;
//   onAddToCart: () => void;
// };

// interface ProductData {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   images: string[];
// }

// const Cart: React.FC<CartProps> = ({ cartCount, onAddToCart }) => {

//   const [products, setProducts] = useState<ProductData[]>([]);
//   useEffect(() => {
//     fetch('https://dummyjson.com/products')
//       .then(response => response.json())
//       .then(data => setProducts(data.products))
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <div>
//     <div className="cart-container">
//       {/* <div className="cart-button-container">
//         <button onClick={onAddToCart} className="cart-button">
//           Add to Cart
//         </button>
//       </div> */}
//       <div className="cart-icon-container">
//         <img src={cartIcon} alt="Cart" className="cart-icon" />
//         <span className="cart-count">{cartCount}</span>
//       </div>
//     </div>
//     <div className="products-container">
//         {products.map((product) => (
//           <Product
//             key={product.id}
//             id={product.id}
//             title={product.title}
//             description={product.description}
//             price={product.price}
//             images={product.images}
//             onAddToCart={onAddToCart}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cart;

// Cart.tsx
import React from 'react';
import cartIcon from './cart.png';
import './Cart.css';
interface CartProps {
  cartCount: number;
}

const Cart: React.FC<CartProps> = ({ cartCount }) => {
  return (
    <div className="cart-icon-container">
      <img src={cartIcon} alt="Cart" className="cart-icon" />
      <span className="cart-count">{cartCount}</span>
    </div>
  );
};

export default Cart;
