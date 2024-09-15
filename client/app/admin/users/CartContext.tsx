// app/admin/users/CartContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import axiosInstance from '../../../store/axiosConfig'; // Sử dụng axiosInstance thay vì axios

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  updateQuantity: (id: number, quantity: number) => void;
  checkout: (userId: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

type CartAction =
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR_CART' }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'ADD_ITEM': {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, action.payload];
      }
    }
    case 'REMOVE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode; userId: number }> = ({ children, userId }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Khởi tạo giỏ hàng từ `db.json` thông qua API khi component được mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get(`/carts?userId=${userId}`);
        if (response.data.length > 0) {
          dispatch({ type: 'SET_CART', payload: response.data[0].items });
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, [userId]);

  // Hàm cập nhật giỏ hàng trong `db.json`
  const updateCartInDB = async (items: CartItem[]) => {
    try {
      const response = await axiosInstance.get(`/carts?userId=${userId}`);
      if (response.data.length > 0) {
        await axiosInstance.patch(`/carts/${response.data[0].id}`, { items });
      } else {
        await axiosInstance.post(`/carts`, { userId, items });
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const addToCart = (item: CartItem) => {
    const updatedItems = cartReducer(cartItems, { type: 'ADD_ITEM', payload: item });
    dispatch({ type: 'SET_CART', payload: updatedItems });
    updateCartInDB(updatedItems);
  };

  const removeFromCart = (id: number) => {
    const updatedItems = cartReducer(cartItems, { type: 'REMOVE_ITEM', payload: id });
    dispatch({ type: 'SET_CART', payload: updatedItems });
    updateCartInDB(updatedItems);
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    updateCartInDB([]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    const updatedItems = cartReducer(cartItems, { type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    dispatch({ type: 'SET_CART', payload: updatedItems });
    updateCartInDB(updatedItems);
  };

  const checkout = async (userId: number) => {
    if (cartItems.length === 0) {
      alert('Giỏ hàng đang trống!');
      return;
    }

    const order = {
      userId: userId,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      await axiosInstance.post('/orders', order); // Lưu đơn hàng vào `orders`
      clearCart();
      alert('Đơn hàng đã được đặt thành công!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};
