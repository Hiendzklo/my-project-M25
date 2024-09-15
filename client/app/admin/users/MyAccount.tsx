// users/MyAccount.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MyAccount: React.FC = () => {
  const [newUsername, setNewUsername] = useState<string | null>(null);
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage khi component được tải
    setNewUsername(localStorage.getItem('username'));
    setNewEmail(localStorage.getItem('email') || '');
    setPhone(localStorage.getItem('phone') || '');
    setBirthdate(localStorage.getItem('birthdate') || '');
    setAvatar(localStorage.getItem('avatar'));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        localStorage.setItem('avatar', result); // Lưu avatar vào localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (newUsername) {
      localStorage.setItem('username', newUsername);
    }
    if (newEmail) {
      localStorage.setItem('email', newEmail);
    }
    localStorage.setItem('phone', phone);
    localStorage.setItem('birthdate', birthdate);
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Hồ Sơ Của Tôi</h1>
      <div className="flex">
        <div className="w-1/4">
          <ul className="space-y-4">
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <img
                  src="https://down-vn.img.susercontent.com/file/sg-11134004-7rdwq-lxjhfv41ctho89"
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <span className="align-middle">Ngày 15 Sale Giữa Tháng</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center">
                <img
                  src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4"
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <span className="align-middle">Tài Khoản Của Tôi</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center text-red-500">
                <span className="align-middle ml-8">Hồ Sơ</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <span className="align-middle ml-8">Ngân Hàng</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <span className="align-middle ml-8">Địa Chỉ</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <span className="align-middle ml-8">Đổi Mật Khẩu</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <span className="align-middle ml-8">Cài Đặt Thông Báo</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <span className="align-middle ml-8">Những Thiết Lập Riêng Tư</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center hover:text-red-500">
                <img
                  src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078"
                  alt="icon"
                  className="w-6 h-6 mr-2"
                />
                <span className="align-middle">Đơn Mua</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Avatar</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {avatar && <img src={avatar} alt="Avatar" className="w-16 h-16 rounded-full mt-2" />}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Tên đăng nhập</label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                value={newUsername || ''}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                className="border rounded w-full py-2 px-3"
                type="email"
                value={newEmail || ''}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Số điện thoại</label>
              <input
                className="border rounded w-full py-2 px-3"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Giới tính</label>
              <div className="flex space-x-4">
                <label>
                  <input type="radio" name="gender" value="Nam" /> Nam
                </label>
                <label>
                  <input type="radio" name="gender" value="Nữ" /> Nữ
                </label>
                <label>
                  <input type="radio" name="gender" value="Khác" /> Khác
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Ngày sinh</label>
              <div className="flex space-x-2">
                <input
                  className="border rounded py-2 px-3"
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Lưu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
