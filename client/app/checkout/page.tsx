// app/checkout/page.tsx
'use client';

import Checkout from '../../app/admin/users/Checkout';
import { CartProvider } from '../admin/users/CartContext'; // Cập nhật đường dẫn chính xác
import HeaderUser from '../admin/users/HeaderUser';

const CheckoutPage: React.FC = () => {
  const username = 'guest'; // Bạn có thể thay thế bằng giá trị username động từ context hoặc state

  return (
    <CartProvider username={username}> {/* Truyền username vào đây */}
      <HeaderUser/>
      <Checkout />

    </CartProvider>
  );
};

export default CheckoutPage;
