import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axiosInstance from '../../../store/axiosConfig';  // Chắc chắn đường dẫn axiosConfig đúng với cấu trúc Next.js

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
}

// Tạo context cho Cart
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook để sử dụng context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component
export const CartProvider: React.FC<{ username: string; children: ReactNode }> = ({ username, children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Gọi API lấy thông tin giỏ hàng từ username
        const response = await axiosInstance.get(`/users?username=${username}`);
        const user = response.data[0];

        if (user && user.cart) {
          // Gọi API lấy chi tiết sản phẩm trong giỏ hàng
          const productResponses = await Promise.all(
            user.cart.map((item: any) => axiosInstance.get(`/products/${item.productId}`))
          );
          
          // Xử lý dữ liệu sản phẩm
          const products = productResponses.map(res => res.data);
          const cartItems = user.cart.map((item: any, index: number) => ({
            id: item.productId,
            quantity: item.quantity,
            name: products[index].name,
            price: products[index].price,
            image: products[index].image || ''
          }));
          setCartItems(cartItems);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, [username]);

  const addToCart = async (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        return [...prevItems, item];
      }
    });

    try {
      const response = await axiosInstance.get(`/users?username=${username}`);
      const user = response.data[0];
      const updatedCart = [...user.cart, { productId: item.id, quantity: item.quantity }];
      await axiosInstance.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    try {
      const response = await axiosInstance.get(`/users?username=${username}`);
      const user = response.data[0];
      const updatedCart = user.cart.filter((item: any) => item.productId !== id);
      await axiosInstance.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    setCartItems([]);

    try {
      const response = await axiosInstance.get(`/users?username=${username}`);
      const user = response.data[0];
      await axiosInstance.patch(`/users/${user.id}`, { cart: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );

    try {
      const response = await axiosInstance.get(`/users?username=${username}`);
      const user = response.data[0];
      const updatedCart = user.cart.map((item: any) =>
        item.productId === id ? { ...item, quantity } : item
      );
      await axiosInstance.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
