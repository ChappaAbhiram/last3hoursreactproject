import React, { useState } from 'react';
import { useProduct } from '../ProductContext';

function AddProduct() {
  const [formData, setFormData] = useState({
    medicineName: '',
    description: '',
    price: '',
    quantity: '',
  });

  const { addProduct } = useProduct();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the fields are empty before adding the product
    if (
      formData.medicineName.trim() === '' ||
      formData.description.trim() === '' ||
      formData.price.trim() === '' ||
      formData.quantity.trim() === ''
    ) {
      alert('Please fill in all fields.');
      return;
    }

    // Create a new product object from the form data
    const newProduct = {
      medicineName: formData.medicineName,
      description: formData.description,
      price: parseFloat(formData.price), // Parse price as a float
      quantity: parseInt(formData.quantity), // Parse quantity as an integer
    };

    // Add the new product to the product list
    await addProduct(newProduct); // Use await to wait for the product to be added

    // Clear the form fields
    setFormData({
      medicineName: '',
      description: '',
      price: '',
      quantity: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="medicineName"
        placeholder="Medicine Name"
        value={formData.medicineName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;



// import React, { useState } from 'react';
// import { addProductToAPI } from '../api'; // Import the API function

// function AddProduct() {
//   const [formData, setFormData] = useState({
//     medicineName: '',
//     description: '',
//     price: '',
//     quantity: '',
//   });

//   const handleChange = (e) => {
//     // ... (same as before)
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Make a POST request to add the product to the backend
//       await addProductToAPI(formData);
//       // Clear the form fields
//       setFormData({
//         medicineName: '',
//         description: '',
//         price: '',
//         quantity: '',
//       });
//     } catch (error) {
//       // Handle errors here
//     }
//   };

//   return (<>
//   </>
//   );
// }

// export default AddProduct;
