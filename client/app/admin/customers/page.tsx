"use client"; // Đánh dấu đây là Client Component

import React from 'react';
import Sidebar from '../dashboard/components/Sidebar'; // Đường dẫn tới Sidebar của bạn
import CustomerList from './CustomerList'; // Import component CustomerList

const CustomerPage = () => {
  const handleLogout = () => {
    // Logic để đăng xuất
    console.log('User logged out');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Nội dung trang Customers */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Customer Management</h1>
        <CustomerList />
      </div>
    </div>
  );
};

export default CustomerPage;
