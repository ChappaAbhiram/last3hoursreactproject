import React from 'react';
import { useCart } from '../CartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <ul>
      {cart && cart.length > 0 ? (
        cart.map((cartItem, index) => (
          <li key={index}>
            {cartItem.medicineName} - ${cartItem.price} - Quantity: {cartItem.quantity}
          </li>
        ))
      ) : (
        <li>Your cart is empty</li>
      )}
    </ul>
  );
}

export default Cart;
