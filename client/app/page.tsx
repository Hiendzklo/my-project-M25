"use client";

import React from 'react';
import HeaderUser from './admin/users/HeaderUser';
import { CartProvider } from './admin/users/CartContext'; // Đảm bảo đường dẫn đến CartContext là chính xác
import PromoSection from './admin/users/PromoSection'; // Import PromoSection từ đúng đường dẫn
import CategorySection from './admin/users/CategorySection';
import FlashSaleSection from './admin/users/FlashSaleSection';
import PromotionSection from './admin/users/PromotionSection';
import TopProductsSection from './admin/users/TopProductsSection';
import ProductUser from './admin/users/ProductUser';
import Footer from './Footer';


const HomePage: React.FC = () => {
  return (
    <CartProvider username="testuser"> {/* Bao bọc toàn bộ component trong CartProvider */}
      <HeaderUser username="testuser" avatar="/path-to-avatar.jpg" />
      <PromoSection /> {/* Thêm PromoSection vào trang Home */}
      <CategorySection/>
      <FlashSaleSection/>
      <PromotionSection/>
      <TopProductsSection/>
      <ProductUser/>
      <Footer/>
    </CartProvider>
  );
};

export default HomePage;
