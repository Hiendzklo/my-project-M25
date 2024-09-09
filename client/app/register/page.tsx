'use client';

import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../store/axiosConfig'; // Đảm bảo đường dẫn đúng tới axiosConfig.ts
import Link from 'next/link';
import Footer from '../Footer';

// Xác thực biểu mẫu với Yup
const validationSchema = yup.object({
  username: yup.string().required('Tên đăng nhập là bắt buộc'),
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Xác nhận mật khẩu là bắt buộc'),
});

const Register: React.FC = () => {
  const router = useRouter();

  // Sử dụng Formik để quản lý biểu mẫu và xác thực
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: 'User', // Mặc định phân quyền là User
        date: new Date().toISOString(),
        isActive: true,
        cart: [], // Thêm giỏ hàng nếu cần thiết
      };

      try {
        // Sử dụng axiosInstance để gửi yêu cầu POST tới API /users
        const response = await axiosInstance.post('/users', newUser);

        if (response.status === 201 || response.status === 200) {
          router.push('/'); // Điều hướng tới trang chủ sau khi đăng ký thành công
        } else {
          console.error('Failed to register user');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
  });

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-red-600">Shopee</div>
        <div className="text-sm text-red-600">Bạn cần giúp đỡ?</div>
      </header>

      {/* Background image */}
      <div className="relative flex min-h-screen">
        <div className="absolute inset-0">
          <img
            src="/register-image.png"  // Đảm bảo đường dẫn hình ảnh đúng
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form đăng ký */}
        <div className="relative w-full md:w-1/3 bg-white p-8 m-8 rounded-lg shadow-lg self-center ml-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng ký</h2>
          <form onSubmit={formik.handleSubmit} className="w-full">
            {/* Tên đăng nhập */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">Tên đăng nhập</label>
              <input
                id="username"
                name="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Tên đăng nhập"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
              ) : null}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
              ) : null}
            </div>

            {/* Mật khẩu */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Mật khẩu</label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
              ) : null}
            </div>

            {/* Xác nhận mật khẩu */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Xác nhận mật khẩu"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            {/* Nút đăng ký */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Đăng ký
            </button>
          </form>

          {/* Điều khoản dịch vụ */}
          <p className="mt-6 text-xs text-center text-gray-600">
            Bằng việc đăng kí, bạn đã đồng ý với Shopee về{' '}
            <a href="#" className="text-red-500 hover:underline">Điều khoản dịch vụ</a> &{' '}
            <a href="#" className="text-red-500 hover:underline">Chính sách bảo mật</a>
          </p>

          {/* Điều hướng đến trang đăng nhập nếu đã có tài khoản */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Bạn đã có tài khoản?{' '}
            <Link href="/login" className="text-red-500 hover:underline">Đăng nhập</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Register;
