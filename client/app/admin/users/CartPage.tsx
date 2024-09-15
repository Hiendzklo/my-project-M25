// users/CartPage.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useCart, CartItem } from './CartContext'; // Đảm bảo đường dẫn đúng tới CartContext và kiểu CartItem
import Link from 'next/link';
import Footer from '../../Footer'; // Cập nhật đường dẫn tới Footer nếu cần
import axiosInstance from '../../../store/axiosConfig'; // Đảm bảo đường dẫn đúng tới axiosConfig

const CartPage: React.FC = () => {
  const { removeFromCart, clearCart, updateQuantity } = useCart();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get('/carts?userId=1'); // Thay đổi userId tùy thuộc vào người dùng hiện tại
      if (response.data.length > 0) {
        setCartItems(response.data[0].items);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(id, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 bg-white shadow rounded-lg flex-grow">
          Giỏ hàng của bạn đang trống.
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-4 bg-white shadow rounded-lg flex-grow">
        <h1 className="text-2xl font-bold mb-4">Giỏ Hàng</h1>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="border p-2">Sản Phẩm</th>
              <th className="border p-2">Giá</th>
              <th className="border p-2">Số Lượng</th>
              <th className="border p-2">Tổng</th>
              <th className="border p-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover inline-block mr-2"
                  />
                  {item.name}
                </td>
                <td className="border p-2">₫{item.price.toLocaleString()}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                    className="w-16 p-2 border rounded"
                    min="1"
                  />
                </td>
                <td className="border p-2">
                  ₫{(item.price * item.quantity).toLocaleString()}
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center">
          <button
            onClick={handleClearCart}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Xóa Tất Cả
          </button>
          <Link href="/checkout" className="bg-green-500 text-white px-4 py-2 rounded">
            Thanh Toán
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
