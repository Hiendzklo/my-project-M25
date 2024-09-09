"use client"; // Đánh dấu đây là Client Component trong Next.js

import React from 'react';

interface ProductProps {
  id: number;
  name: string;
  status: string;
  category: string;
  price: number;
  date: string;
  sold: number;
  discount: number;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({
  id,
  name,
  status,
  category,
  price,
  date,
  sold,
  discount,
  onView,
  onEdit,
  onDelete
}) => {
  return (
    <tr>
      <td className="px-4 py-2">{id}</td>
      <td className="px-4 py-2">{name}</td>
      <td className="px-4 py-2">{status}</td>
      <td className="px-4 py-2">{category}</td>
      <td className="px-4 py-2">{price}</td>
      <td className="px-4 py-2">{date}</td>
      <td className="px-4 py-2 text-green-600">{sold}</td> 
      <td className="px-4 py-2 text-red-600">{discount}%</td> 
      <td className="px-4 py-2 flex space-x-2">
        <button
          className="text-white bg-blue-500 px-3 py-1 rounded-full hover:bg-blue-600"
          onClick={() => onView(id)}
        >
          View
        </button>
        <button
          className="text-white bg-yellow-500 px-3 py-1 rounded-full hover:bg-yellow-600"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>
        <button
          className="text-white bg-red-500 px-3 py-1 rounded-full hover:bg-red-600"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Product;
