import React, { createContext, useContext, useEffect, useState } from 'react';

const baseURL = 'https://crudcrud.com/api/27c9f33be6ea4d8b987a685de6650b58';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Local cart state

  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${baseURL}/cart`);
      if (response.ok) {
        const data = await response.json();
        setCart(data); // Update the local cart state
      } else {
        throw new Error('Failed to fetch cart items');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addToCart = async (product) => {
    try {
      // Check if the item already exists in the cart
      const existingCartItem = cart.find((item) => item.medicineName === product.medicineName);

      if (existingCartItem) {
        // Item with the same name exists in the cart, increase quantity
        await fetch(`${baseURL}/cart/${existingCartItem._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ medicineName : existingCartItem.medicineName,price : existingCartItem.price, quantity: existingCartItem.quantity + 1 }),
        });
      } else {
        // Item does not exist in the cart, add it with quantity 1
        await fetch(`${baseURL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...product,quantity : 1 }),
        });
      }
      
      // After making API request, fetch the updated cart data
      fetchCartItems();
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    // Fetch cart data when the component mounts
    fetchCartItems();
  }, []);

  return (
    <CartContext.Provider value={{ addToCart, cart }}>
      {children}
    </CartContext.Provider>
  );
};
