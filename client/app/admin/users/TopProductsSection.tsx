"use client"; // Đảm bảo rằng component này được xử lý phía client

import React from 'react';
import Link from 'next/link'; // Thêm Link từ Next.js

const topProducts = [
  { name: 'Set Bộ Đồ Nữ', image: 'https://down-vn.img.susercontent.com/file/177bbf07292a750897797001e49b13aa', sales: 'Bán 118k+ / tháng' },
  { name: 'Chiếu Điều Hoà', image: 'https://down-vn.img.susercontent.com/file/25b15c148768895db8c04a5e2eea08cf', sales: 'Bán 141k+ / tháng' },
  { name: 'Son Kem Lì Mịn Môi Romand', image: 'https://down-vn.img.susercontent.com/file/ee2b1da4a8393468cfdbae245f39f62c', sales: 'Bán 154k+ / tháng' },
  { name: 'Mi Giả 3D Cao Cấp', image: 'https://down-vn.img.susercontent.com/file/d4e12493164f7c25783c5a5769e1addf', sales: 'Bán 196k+ / tháng' },
  { name: 'Bông Tẩy Trang 3 Lớp Cotton Pads', image: 'https://down-vn.img.susercontent.com/file/e3568f284358e6f5c46223036e54ef84', sales: 'Bán 168k+ / tháng' },
  { name: 'Kính Cường Lực Iphone', image: 'https://down-vn.img.susercontent.com/file/2a1bd5bea2b3747e3793222d2a42338c', sales: 'Bán 92k+ / tháng' },
];

const TopProductsSection: React.FC = () => {
  return (
    <div className="bg-white py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-red-500 font-bold">TÌM KIẾM HÀNG ĐẦU</h2>
          {/* Sử dụng Link từ Next.js thay cho thẻ <a> */}
          <Link href="#">
            <span className="text-red-500">Xem Tất Cả &gt;</span>
          </Link>
        </div>
        <div className="flex overflow-x-auto no-scrollbar">
          {topProducts.map((product, index) => (
            <div key={index} className="flex-shrink-0 w-1/6 p-2">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2 rounded-lg" />
                <div className="absolute top-0 left-0 bg-orange-500 text-white p-1 rounded-br-lg">TOP</div>
                <div className="absolute bottom-0 left-0 bg-gray-800 bg-opacity-50 text-white p-1 rounded-tr-lg">{product.sales}</div>
              </div>
              <p className="text-center text-lg font-semibold">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProductsSection;
