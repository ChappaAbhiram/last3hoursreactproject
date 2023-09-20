import React from 'react';
import { useCart } from '../CartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <ul>
      {cart.map((cartItem, index) => (
        <li key={index}>
          {cartItem.medicineName} - ${cartItem.price} - Quantity: {cartItem.quantity}
        </li>
      ))}
    </ul>
  );
}

export default Cart;
