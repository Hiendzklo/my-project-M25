"use client"; // Đảm bảo rằng component này được xử lý ở phía client

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Thay thế useNavigate bằng useRouter
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  sku: string;
  status: string;
  description?: string;
  image?: string;
  date: string;
  category: number;
  sold: number;
  discount: number;
  smallImage?: string;
}

const ProductUser: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter(); // Sử dụng useRouter từ Next.js để điều hướng

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto w-full">
      <h2 className="text-2xl font-bold mb-4">Gợi Ý Hôm Nay</h2>
      <div className="grid grid-cols-6 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white shadow p-4 rounded relative transform transition duration-300 hover:scale-105 hover:shadow-lg border border-transparent hover:border-orange-500 cursor-pointer"
            onClick={() => router.push(`/products/${product.id}`)} // Thay thế useNavigate bằng router.push để điều hướng trong Next.js
          >
            {product.discount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs z-10">
                -{product.discount}%
              </span>
            )}
            <div className="relative mb-2">
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              {product.smallImage && (
                <img
                  src={product.smallImage}
                  alt="Badge"
                  className="absolute bottom-0 left-0 w-44 h-44 z-20"
                />
              )}
            </div>
            <h3 className="text-lg font-bold mb-2 truncate">{product.name}</h3>
            <div className="flex justify-between items-center mb-2">
              <p className="text-red-500 font-bold">₫{product.price.toLocaleString()}</p>
              <p className="text-gray-500">Đã bán {product.sold}</p>
            </div>
            <p className="text-gray-500 mb-2 truncate-2-lines">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductUser;
