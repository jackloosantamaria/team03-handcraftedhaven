'use client';

import React, { useState, useEffect } from 'react';

type ProductImage = {
  id: number;
  product_id: number;
  image_url: string;
};

type ProductWithImages = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  created_at: string;
  images: ProductImage[];  // Include images associated with the product
};

const ProductPage = () => {
  const [products, setProducts] = useState<ProductWithImages[]>([]);  // Use ProductWithImages
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    imageUrl: ''
  });

  // Fetch all products from the API
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    console.log(data);  // Check what the data contains

    if (Array.isArray(data)) {
      setProducts(data);  // Only update if it's an array
    } else {
      console.error("Error: data is not an array", data);
    }
  };

  // Fetch products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for adding a new product
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        product: formData,
        imageUrl: formData.imageUrl,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newProduct = await res.json();

    // If the product includes images, update the product list
    setProducts((prevProducts) => [...prevProducts, newProduct]);  // Update state with new product including images
    setFormData({ name: '', description: '', price: 0, stock_quantity: 0, category_id: 0, imageUrl: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-24 text-center">
        <h1 className="text-5xl font-bold mb-4">Manage Your Products</h1>
        <p className="text-xl mb-8">Add, Update, and Manage your products easily.</p>
      </section>

      {/* Product Form Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-8 shadow-lg rounded-lg">
          <div>
            <label className="block text-lg font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product price"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Stock Quantity</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product stock quantity"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Category ID</label>
            <input
              type="number"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter product category ID"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Product Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter image URL"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-lg">Add Product</button>
          </div>
        </form>
      </section>

      {/* Display Products */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-blue-500">${product.price}</p>
              <div className="mt-4">
                {/* Check if product.images is defined and is an array */}
                {(product.images || []).map((image, index) => (
                  <img
                    key={image.id ? image.id : `${product.id}-image-${index}`}  // Use a fallback key if image.id is not available
                    src={image.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover mt-2"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
