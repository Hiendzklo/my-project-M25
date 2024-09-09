"use client"; // Đánh dấu đây là Client Component

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../store/axiosConfig';
import Product from './Product';
import { FaSort } from 'react-icons/fa';
import AddProductForm from './AddProductForm';

interface Product {
  id: number;
  name: string;
  status: string;
  category: number;
  price: number;
  date: string;
  image?: string;
  description?: string;
  sku: string;
  sold: number;
  discount: number;
}

interface Category {
  id: number;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsPerPage = 5;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('There was an error fetching the products!', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
    }
  };

  const handleView = (id: number) => {
    const product = products.find(product => product.id === id);
    if (product) {
      setSelectedProduct(product);
      alert(JSON.stringify(product, null, 2));
    }
  };

  const handleEdit = (id: number) => {
    const product = products.find(product => product.id === id);
    if (product) {
      setSelectedProduct(product);
      setShowEditForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('There was an error deleting the product!', error);
    }
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      {showAddForm ? (
        <AddProductForm onCancel={() => {
          setShowAddForm(false);
          fetchProducts();
        }} />
      ) : showEditForm && selectedProduct ? (
        <AddProductForm
          product={selectedProduct}
          onCancel={() => {
            setShowEditForm(false);
            setSelectedProduct(null);
            fetchProducts();
          }}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <button
              className="bg-black text-white px-4 py-2 rounded-full"
              onClick={() => setShowAddForm(true)}
            >
              + Add Product
            </button>
            <div className="relative">
              <select className="bg-gray-100 rounded-full px-4 py-2">
                <option>Sort by: ID</option>
              </select>
              <FaSort className="absolute top-3 right-3 text-gray-400" />
            </div>
          </div>
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Sold</th>
                <th className="px-4 py-2 text-left">Discount (%)</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map(product => (
                <Product
                  key={product.id}
                  {...product}
                  category={getCategoryName(product.category)}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <nav>
              <ul className="flex list-none">
                {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                  <li key={index} className={`mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="px-3 py-1 rounded-full">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
