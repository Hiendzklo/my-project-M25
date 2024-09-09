"use client"; // Đánh dấu đây là Client Component cho Next.js

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../store/axiosConfig';
import { storage } from '../../../config/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

interface AddProductFormProps {
  onCancel: () => void;
  product?: Product;
}

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
  smallImage?: string;
}

interface Category {
  id: number;
  name: string;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onCancel, product }) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [smallImage, setSmallImage] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sold, setSold] = useState('');
  const [discount, setDiscount] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setPrice(product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
      setSku(product.sku);
      setStatus(product.status);
      setDescription(product.description || '');
      setCategory(product.category.toString());
      setSold(product.sold.toString());
      setDiscount(product.discount.toString());
    }
    fetchCategories();
  }, [product]);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSmallImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSmallImage(e.target.files[0]);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    setPrice(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const uploadImage = async (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    };

    try {
      const [imageUrl, smallImageUrl] = await Promise.all([
        image ? uploadImage(image) : Promise.resolve(product?.image || ''),
        smallImage ? uploadImage(smallImage) : Promise.resolve(product?.smallImage || '')
      ]);

      saveProduct(imageUrl, smallImageUrl);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const saveProduct = async (imageUrl: string, smallImageUrl: string) => {
    const newProduct = {
      name: productName,
      price: parseFloat(price.replace(/\./g, '')), // Chuyển đổi lại giá trị thành số
      sku,
      status,
      description,
      image: imageUrl,
      smallImage: smallImageUrl,
      date: product?.date || new Date().toISOString().split('T')[0],
      category: parseInt(category),
      sold: parseInt(sold),
      discount: parseInt(discount)
    };

    try {
      if (product) {
        await axiosInstance.put(`/products/${product.id}`, newProduct);
      } else {
        await axiosInstance.post('/products', newProduct);
      }
      onCancel();
    } catch (error) {
      console.error('There was an error saving the product!', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <button className="text-blue-500 mb-4" onClick={onCancel}>
          &larr; Back
        </button>
        <h1 className="text-2xl font-bold mb-6">{product ? 'Edit Product' : 'Add Product'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Price
            </label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={handlePriceChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Price"
              required
            />
          </div>
          {/* Other fields */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
              SKU
            </label>
            <input
              id="sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="SKU"
              required
            />
          </div>
          {/* Other fields */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
