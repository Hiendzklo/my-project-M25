// app/cart/page.tsx
'use client'; // Dòng này cần thiết nếu sử dụng các hook client-side

import CartPage from '../../app/admin/users/CartPage'; // Đảm bảo đường dẫn đúng tới CartPage
import HeaderUser from '../../app/admin/users/HeaderUser'; // Đảm bảo đường dẫn đúng tới HeaderUser

const Cart: React.FC = () => {
  return (
    <>
      <HeaderUser /> {/* Thêm HeaderUser vào trang */}
      <CartPage />
    </>
  );
};

export default Cart;
