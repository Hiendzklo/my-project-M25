"use client"; // Thêm dòng này ở đầu file

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Category: React.FC = () => {
  const data = {
    labels: ['Electronics', 'Laptops', 'Phones'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-lg font-bold mb-2">Top Categories</h2>
      <div className="h-96 w-full flex items-center justify-center"> 
        <Doughnut data={data} />
      </div>
      <div className="text-center text-2xl font-bold mt-4">$6.2k</div>
    </div>
  );
};

export default Category;
