"use client"; // Đảm bảo đây là Client Component

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../store/axiosConfig'; // Đường dẫn tới file axiosConfig của bạn

interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Tạo state để lưu danh mục
  const [categoryName, setCategoryName] = useState(''); // Trạng thái để lưu tên danh mục mới hoặc sửa đổi
  const [editingCategory, setEditingCategory] = useState<Category | null>(null); // Trạng thái để lưu danh mục đang chỉnh sửa
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const categoriesPerPage = 10; // Số lượng danh mục trên mỗi trang

  // Fetch danh sách danh mục từ API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories'); // Lấy dữ liệu từ endpoint /categories
      setCategories(response.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
    }
  };

  // Thêm mới hoặc cập nhật danh mục
  const handleAddOrUpdateCategory = async () => {
    try {
      if (editingCategory) {
        // Nếu đang sửa danh mục
        const updatedCategory = { ...editingCategory, name: categoryName };
        await axiosInstance.put(`/categories/${editingCategory.id}`, updatedCategory);
        setCategories(
          categories.map(cat => (cat.id === editingCategory.id ? updatedCategory : cat))
        );
      } else {
        // Thêm danh mục mới
        const newCategory = { id: categories.length + 1, name: categoryName };
        const response = await axiosInstance.post('/categories', newCategory);
        setCategories([...categories, response.data]);
      }
      setCategoryName(''); // Reset form
      setEditingCategory(null); // Reset editing state
    } catch (error) {
      console.error('Error adding/updating category', error);
    }
  };

  // Chỉnh sửa danh mục
  const handleEditCategory = (category: Category) => {
    setCategoryName(category.name); // Đặt tên danh mục vào input
    setEditingCategory(category); // Đặt trạng thái chỉnh sửa
  };

  // Xóa danh mục
  const handleDeleteCategory = async (id: number) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  // Phân trang
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Chuyển trang
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full">
      <h1 className="text-2xl font-bold mb-6">Quản lý danh mục</h1>

      {/* Form thêm/sửa danh mục */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Tên danh mục"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="px-4 py-2 border rounded w-full mb-2"
        />
        <button
          onClick={handleAddOrUpdateCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingCategory ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        </button>
      </div>

      {/* Danh sách danh mục */}
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Tên danh mục</th>
            <th className="px-4 py-2 text-left">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map(category => (
            <tr key={category.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{category.id}</td>
              <td className="px-4 py-2">{category.name}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(categories.length / categoriesPerPage) }, (_, index) => (
              <li key={index} className={`mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : ''}`}>
                <button
                  onClick={() => paginate(index + 1)}
                  className="px-3 py-1 rounded-full"
                >
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

export default CategoryList;
