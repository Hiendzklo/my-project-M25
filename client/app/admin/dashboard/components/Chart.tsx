"use client"; // Thêm dòng này ở đầu file để xác định đây là Client Component

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart: React.FC = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Earnings',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Costs',
        data: [8, 11, 13, 6, 3, 7, 10],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full h-full flex flex-col items-center justify-center">
      <div className="flex justify-between items-center w-full mb-4">
        <h2 className="text-lg font-bold">Sales Performance</h2>
        <div className="flex items-center space-x-2">
          <button className="bg-gray-200 px-2 py-1 rounded">Export data</button>
          <button className="bg-gray-200 px-2 py-1 rounded">Last 30 Days</button>
        </div>
      </div>
      <div className="h-96 w-full flex items-center justify-center"> 
        <Line data={data} />
      </div>
    </div>
  );
};

export default Chart;
