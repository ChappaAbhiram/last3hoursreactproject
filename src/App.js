import React, { useState } from 'react';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './CartContext';
import { ProductProvider } from './ProductContext';

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <ProductProvider>
    <CartProvider>
      <div>
        <header>
          <h1>Medical Shop Inventory</h1>
          <button onClick={toggleCartVisibility}>Cart</button>
        </header>
        <div>
          <h2>Add Products</h2>
          <AddProduct />
        </div>
        <div>
          <h2>Product List</h2>
          <ProductList />
        </div>
        {isCartVisible && (
          <div>
            <h2>Cart</h2>
            <Cart />
          </div>
        )}
      </div>
    </CartProvider>
    </ProductProvider>
  );
}

export default App;