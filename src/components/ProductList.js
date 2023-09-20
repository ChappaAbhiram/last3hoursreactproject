// ProductList.js

import React, { useEffect, useState } from 'react';
import { useProduct } from '../ProductContext';
import { useCart } from '../CartContext';

function ProductList() {
  const { productList , decreaseProductQuantity } = useProduct();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    console.log(product);
      addToCart(product);
      decreaseProductQuantity(product); // Decrease quantity in product list
    // After adding the product, you can fetch the updated product list again
  };

  return (
    <div>
      <ul>
        {productList.map((product) => (
          <li key={product._id}>
            {product.medicineName} - {product.description} - ${product.price} -{' '}
            {product.quantity === 0 ? (
              <span>Out of Stock</span>
            ) : (
              <>
                {product.quantity} in stock
                <button
                  onClick={() => handleAddToCart({
                    medicineName : product.medicineName,
                    description : product.description,
                    price : product.price,
                    quantity : product.quantity,
                    id : product._id
                  })}
                  disabled={product.quantity === 0}
                >
                  Add to Cart
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;



