"use client"; // Đánh dấu đây là Client Component

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../store/axiosConfig'; // Thay bằng đường dẫn chính xác tới axiosConfig của bạn
import { FaSort } from 'react-icons/fa';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  date: string;
  isActive: boolean;
}

const CustomerList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // Trạng thái tìm kiếm
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('There was an error fetching the users!', error);
    }
  };

  // Hàm tìm kiếm người dùng theo tên
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUserStatus = async (id: number) => {
    try {
      const user = users.find(u => u.id === id);
      if (user && user.role !== 'admin') { // Chỉ cho phép khoá/mở với người dùng không phải Admin
        const updatedUser = { ...user, isActive: !user.isActive };
        await axiosInstance.put(`/users/${id}`, updatedUser);
        setUsers(users.map(u => (u.id === id ? updatedUser : u)));
      }
    } catch (error) {
      console.error('There was an error updating the user status!', error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        {/* Ô tìm kiếm người dùng theo tên */}
        <input
          type="text"
          placeholder="Tìm kiếm theo tên"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật trạng thái tìm kiếm
          className="bg-gray-100 rounded-full px-4 py-2"
        />
      </div>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên đăng nhập</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Vai trò</th>
            <th className="px-4 py-2 text-left">Ngày tạo</th>
            <th className="px-4 py-2 text-left">Trạng thái</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.id}</td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">{user.date}</td>
              <td className="px-4 py-2">
                {user.isActive ? 'Active' : 'Inactive'}
              </td>
              <td className="px-4 py-2">
                {/* Nếu là Admin chỉ hiển thị nút Xem */}
                {user.role === 'admin' ? (
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1">Xem</button>
                ) : (
                  // Chỉ user mới có nút Mở/Khoá và Xem
                  <div className="flex">
                    <button
                      className={`px-4 py-2 rounded-full ${
                        user.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.isActive ? 'Mở' : 'Khóa'}
                    </button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded mx-1">Xem</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, index) => (
              <li key={index} className={`mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}>
                <button onClick={() => paginate(index + 1)} className="px-3 py-1 rounded-full">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CustomerList;
