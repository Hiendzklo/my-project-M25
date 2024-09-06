'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Dùng useRouter để điều hướng
import axiosInstance from '@/store/axiosConfig'; // Import axiosInstance để sử dụng

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Hàm xử lý khi form được submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Gửi yêu cầu GET tới API để lấy danh sách người dùng
      const res = await axiosInstance.get('/users');
      
      // Tìm người dùng có username và password khớp
      const user = res.data.find(
        (user: any) => user.username === username && user.password === password
      );

      if (user) {
        // Nếu đăng nhập thành công, điều hướng tới trang dashboard
        router.push('/admin/dashboard');
      } else {
        // Nếu sai username hoặc password
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Phần hình ảnh chiếm 3/4 màn hình */}
      <div
        className="w-3/4 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/admin-avatar.png')" }} // Hình nền admin-avatar.png từ public
      >
      </div>

      {/* Phần form đăng nhập chiếm 1/4 màn hình, với nền đen */}
      <div className="w-1/4 bg-black flex items-center justify-center">
        {/* Form màu trắng */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">Sign in</h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="user name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log in
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
