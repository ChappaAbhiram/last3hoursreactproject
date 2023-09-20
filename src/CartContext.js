import React, { createContext, useContext, useState, useEffect } from 'react';

const baseURL = 'https://crudcrud.com/api/e3f9086af91c4db8ac74db92c737a111';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = async (product) => {
    // Check if the item with the same name already exists in the local cart
    const existingCartItem = cart.find((item) => item.medicineName === product.medicineName);

    if (existingCartItem) {
      // Item with the same name exists in the local cart, increase quantity
      const updatedCart = cart.map((item) =>
        item.medicineName === product.medicineName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      // Item does not exist in the local cart, make an API request to add it
      try {
        const response = await fetch(`${baseURL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product, quantity: 1 }),
        });

        if (response.ok) {
          // Successfully added the item to the cart API
          setCart([...cart, { ...product, quantity: 1 }]);
        } else {
          throw new Error('Error adding item to cart');
        }
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  };

  useEffect(() => {
    // Fetch cart data when the component mounts
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${baseURL}/cart`);
        if (response.ok) {
          // You can update the cart context with this data if needed
          const data = await response.json();
          setCart(data);
        } else {
          throw new Error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
