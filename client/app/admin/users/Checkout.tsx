// app/admin/users/Checkout.tsx
'use client';

import { useState } from 'react';
import { useCart } from './CartContext'; // Đảm bảo đường dẫn chính xác tới CartContext
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Footer from '../../Footer'; // Cập nhật đường dẫn nếu cần

const Checkout: React.FC = () => {
  const { cartItems, clearCart, checkout } = useCart();
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const router = useRouter();

  const handleCheckout = async () => {
    if (!address || !phone || !name) {
      toast.error('Vui lòng điền đầy đủ thông tin người nhận');
      return;
    }

    // Giả sử bạn có userId, thay thế userId này bằng userId thực tế của người dùng đăng nhập
    const userId = 2; // Thay thế bằng giá trị thực tế
    await checkout(userId);
    router.push('/');
  };

  return (
    <>
      <div className="container mx-auto p-4 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Thanh Toán</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Tên Người Nhận</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Địa Chỉ</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Số Điện Thoại</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <h2 className="text-xl font-bold mb-4">Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg">{item.name}</h3>
                  <p>Số Lượng: {item.quantity}</p>
                  <p>Giá: ₫{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-orange-500 text-white px-4 py-2 rounded mt-4"
            >
              Thanh Toán
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
