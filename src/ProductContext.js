// ProductContext.js

import React, { createContext, useContext, useEffect, useState } from 'react';

const baseURL = 'https://crudcrud.com/api/e3f9086af91c4db8ac74db92c737a111';

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/products`);
      if (response.ok) {
        const data = await response.json();
        setProductList(data);
      } else {
        throw new Error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch the product data when the component mounts
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const response = await fetch(`${baseURL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        // Product added successfully
        await fetchProducts(); // Fetch updated product list
      } else {
        throw new Error('Error adding product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const decreaseProductQuantity = async (product) => {
    try {
        const response = await fetch(`${baseURL}/products/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            medicineName : product.medicineName,
            description : product.description,
            price : product.price,quantity : product.quantity -1 }),
        });
  
        if (response.ok) {
          // Product added successfully
          await fetchProducts(); // Fetch updated product list
        } else {
          throw new Error('Error decreasing quantity');
        }
      } catch (error) {
        console.error('Error decreasing quantity', error);
      }
  };

  return (
    <ProductContext.Provider
      value={{ productList, addProduct, decreaseProductQuantity }}
    >
      {children}
    </ProductContext.Provider>
  );
};


