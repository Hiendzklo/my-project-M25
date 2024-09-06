"use client"; // Đảm bảo đây là Client Component

import React from 'react';
import Card from './components/Card'; // Đảm bảo đường dẫn đúng
import Chart from './components/Chart';
import Category from './components/Category';
import Sidebar from './components/Sidebar'; // Import Sidebar
import { FaDollarSign, FaUsers, FaShoppingCart } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const handleLogout = () => {
    console.log('Logged out');
    // Thêm logic đăng xuất tại đây, ví dụ xóa token
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} /> {/* Truyền hàm handleLogout vào Sidebar */}
      
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome back, Rikkei Academy</h1>
        
        {/* Phần hiển thị Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card
            title="Total Sales"
            value="$9,328.55"
            change="+15.6% +$1.4k this week"
            icon={<FaDollarSign className="text-3xl text-gray-400" />}
            className="bg-black text-white"
          />
          <Card
            title="Visitors"
            value="12,302"
            change="+12.7% +1.2k this week"
            icon={<FaUsers className="text-3xl text-gray-400" />}
          />
          <Card
            title="Orders"
            value="963"
            change="-12.7% -213"
            icon={<FaShoppingCart className="text-3xl text-gray-400" />}
          />
        </div>

        {/* Phần hiển thị Chart và Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Chart />
          </div>
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
