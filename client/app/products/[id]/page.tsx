// products/[id]/page.tsx
"use client";

import React from 'react';
import { CartProvider } from '../../admin/users/CartContext'; // Đảm bảo đường dẫn đúng đến CartContext
import ProductDetail from '../../admin/users/ProductDetail'; // Đảm bảo đường dẫn đúng đến component ProductDetail
import HeaderUser from '@/app/admin/users/HeaderUser';
import Footer from '@/app/Footer';

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <CartProvider username="testuser"> {/* Bao bọc component với CartProvider */}
      <HeaderUser username="testuser" avatar="/path-to-avatar.jpg" />
      <ProductDetail params={params} />
      <Footer/>
    </CartProvider>
  );
};

export default ProductDetailPage;
