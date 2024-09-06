"use client"; // Thêm dòng này ở đầu file

import React from 'react';

interface CardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, change, icon, className }) => {
  return (
    <div className={`shadow-lg rounded-lg p-4 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-bold">{title}</h2>
        {icon}
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-sm mt-1">{change}</p>
    </div>
  );
};

export default Card;
