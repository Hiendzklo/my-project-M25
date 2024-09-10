// app/admin/users/HeaderUser.tsx
"use client"; // Thêm vào khi sử dụng các hook như useState hoặc useEffect

import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaBell, FaQuestionCircle, FaShoppingCart, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext'; // Nếu bạn có context riêng cho Cart
import axiosInstance from '../../../store/axiosConfig'; // Gọi API với axios

interface HeaderUserProps {
  username: string | null;
  avatar: string | null;
}

const HeaderUser: React.FC<HeaderUserProps> = ({ username, avatar }) => {
  const router = useRouter();
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const response = await axiosInstance.get(`/users/${storedUserId}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = () => {
    router.push('/login');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('avatar');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${searchQuery}`);
  };

  return (
    <>
       <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-2 text-base">
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:underline">Kênh Người Bán</a>
            <a href="#" className="hover:underline">Trở thành Người bán Shopee</a>
            <a href="#" className="hover:underline">Tải ứng dụng</a>
            <div className="flex space-x-2">
              <span>Kết nối</span>
              <a href="#" className="hover:text-gray-300"><FaFacebook /></a>
              <a href="#" className="hover:text-gray-300"><FaInstagram /></a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:underline"><FaBell className="inline mr-1" />Thông Báo</a>
            <a href="#" className="hover:underline"><FaQuestionCircle className="inline mr-1" />Hỗ Trợ</a>
            <div className="relative">
              <button className="hover:underline">Tiếng Việt</button>
              <div className="absolute mt-1 w-full bg-white text-black rounded shadow hidden">
                <a href="#" className="block px-4 py-2 hover:bg-gray-200">Tiếng Anh</a>
              </div>
            </div>
            {username ? (
              <div className="relative group">
                <button className="hover:underline flex items-center">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
                  ) : (
                    <FaUser className="mr-2" />
                  )}
                  {username}
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white text-black rounded shadow hidden group-hover:block">
                  <Link href="/my-account" className="block px-4 py-2 hover:bg-gray-300">Tài Khoản Của Tôi</Link>
                  <Link href="/order-history" className="block px-4 py-2 hover:bg-gray-300">Đơn Mua</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-300">Đăng Xuất</button>
                </div>
              </div>
            ) : (
              <>
                <button onClick={handleRegister} className="hover:underline">Đăng Ký</button>
                <button onClick={handleLogin} className="hover:underline">Đăng Nhập</button>
              </>
            )}
          </div>
        </div>
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="Shopee"
              className="w-60 cursor-pointer"
              onClick={handleLogoClick}
            />
            <form onSubmit={handleSearch} className="ml-4 flex">
              <input
                type="text"
                placeholder="Shopee bao ship 0Đ - Đăng ký ngay!"
                className="px-4 py-2 rounded-l-full w-[900px] text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-white text-red-500 px-4 py-2 rounded-r-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="relative cursor-pointer" onClick={handleCartClick}>
            <FaShoppingCart className="text-white text-5xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
        <div className="container mx-auto py-2">
          <div className="flex space-x-4 justify-center text-lg">
            <a href="#" className="hover:text-gray-300">Set Đồ Gơn Phố</a>
            <a href="#" className="hover:text-gray-300">Ghế Lười Cute</a>
            <a href="#" className="hover:text-gray-300">Săn Sale 1k iPhone</a>
            <a href="#" className="hover:text-gray-300">Lovito</a>
            <a href="#" className="hover:text-gray-300">Dép 0 Đồng Nữ</a>
            <a href="#" className="hover:text-gray-300">Ăn Vặt</a>
            <a href="#" className="hover:text-gray-300">Áo Phông</a>
            <a href="#" className="hover:text-gray-300">Váy Nữ Dài 1k</a>
            <a href="#" className="hover:text-gray-300">Son</a>
            <a href="#" className="hover:text-gray-300">Gấu Bông</a>
          </div>
        </div>
      </header>
      <div className="pt-32">
      </div>
      <br/><br/><br/><br/>
    </>
  );
};

export default HeaderUser;
