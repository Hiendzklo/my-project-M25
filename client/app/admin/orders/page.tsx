"use client"; // Đảm bảo đây là Client Component

import React from 'react';
import Sidebar from '../dashboard/components/Sidebar'; // Đường dẫn tới Sidebar
import OrderList from './OrderList'; // Đường dẫn tới OrderList

const OrderPage = () => {
  const handleLogout = () => {
    // Logic cho việc logout (ví dụ: xoá token hoặc chuyển hướng)
    console.log('User logged out');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Nội dung trang Orders */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Orders</h1>
        <OrderList />
      </div>
    </div>
  );
};

export default OrderPage;
