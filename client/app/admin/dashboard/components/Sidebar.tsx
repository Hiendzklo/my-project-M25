"use client"; // Đảm bảo đây là Client Component

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Sử dụng useRouter từ next/navigation trong App Router
import { FaHome, FaBox, FaUsers, FaClipboardList, FaQuestionCircle, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

interface SidebarProps {
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleLogout }) => {
  const router = useRouter(); // Sử dụng useRouter để điều hướng

  const onLogoutClick = () => {
    handleLogout(); // Gọi hàm handleLogout từ props
    router.push('/admin/login'); // Điều hướng tới trang login
  };

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <h2 className="text-xl font-bold">Rikkei Academy</h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaHome className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link href="/products" className="flex items-center py-2 px-4 rounded hover:bg-gray-700 bg-gray-800">
              <FaBox className="mr-3" /> Products
            </Link>
          </li>
          <li>
            <Link href="/orders" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaClipboardList className="mr-3" /> Orders
            </Link>
          </li>
          <li>
            <Link href="/customers" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaUsers className="mr-3" /> Customers
            </Link>
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-gray-700">
        <ul className="space-y-2">
          <li>
            <Link href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaQuestionCircle className="mr-3" /> Help
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <FaEnvelope className="mr-3" /> Contact us
            </Link>
          </li>
          <li>
            <button
              onClick={onLogoutClick} // Gọi hàm onLogoutClick khi nhấn vào nút logout
              className="flex items-center py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
            >
              <FaSignOutAlt className="mr-3" /> Log out
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
