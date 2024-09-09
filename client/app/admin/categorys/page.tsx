"use client"; // Đánh dấu đây là Client Component

import React from 'react';
import Sidebar from '../dashboard/components/Sidebar'; // Đảm bảo đường dẫn tới Sidebar đúng
import CategoryList from './CategoryList'; // Import CategoryList để hiển thị danh sách danh mục

const CategoryPage: React.FC = () => {
  const handleLogout = () => {
    // Logic để đăng xuất (nếu có)
    console.log('User logged out');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Nội dung chính: Danh sách danh mục */}
      <div className="flex-1 p-8 bg-gray-100">
        <CategoryList /> {/* Hiển thị danh sách danh mục */}
      </div>
    </div>
  );
};

export default CategoryPage;
