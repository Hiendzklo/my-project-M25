"use client";

import Sidebar from '../dashboard/components/Sidebar'; // Đường dẫn tới Sidebar của bạn
import ProductList from './ProductList'; // Import ProductList từ thư mục hiện tại

const ProductPage = () => {
  const handleLogout = () => {
    // Logic đăng xuất
    console.log('User logged out');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Nội dung trang Products */}
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Product Management</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductPage;
