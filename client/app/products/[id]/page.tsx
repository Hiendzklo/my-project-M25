"use client"; // Đảm bảo rằng component này được render ở phía client

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useCart } from '../../admin/users/CartContext'; // Điều chỉnh lại đường dẫn cho phù hợp
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Lấy ID từ params
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image || 'https://via.placeholder.com/150',
      });
      toast.success('Sản phẩm đã được thêm vào Giỏ hàng!', {
        position: 'bottom-center',
        autoClose: 3000,
      });
    }
  };

  const addToCartWithoutNotification = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image || 'https://via.placeholder.com/150',
      });
    }
  };

  const handleBuyNow = () => {
    addToCartWithoutNotification();
    router.push('/checkout');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={product.image || 'https://via.placeholder.com/150'}
            alt={product.name}
            className="w-full h-96 object-cover mb-2 rounded"
          />
        </div>
        <div className="w-1/2 pl-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="mb-2">
            <span className="text-xl text-red-500 font-bold">₫{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-gray-500 line-through">₫{(product.price / (1 - product.discount / 100)).toLocaleString()}</span>
            )}
            <span className="ml-2 text-red-500 font-bold">{product.discount}% GIẢM</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500">SKU: {product.sku}</span>
          </div>
          <div className="mb-2">
            <span className="text-gray-500">Đã bán: {product.sold}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-700">{product.description}</p>
          </div>
          <div className="mb-2 flex items-center">
            <span className="mr-4">Số Lượng</span>
            <button
              onClick={() => handleQuantityChange(-1)}
              className="px-2 py-1 bg-gray-300"
            >
              -
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="px-2 py-1 bg-gray-300"
            >
              +
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Thêm Vào Giỏ Hàng
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
