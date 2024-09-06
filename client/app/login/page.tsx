'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../store/axiosConfig';
import { auth, googleProvider, facebookProvider } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
import Footer from '../Footer';


interface LoginProps {
  onLogin: (role: string, username: string) => void;
}

const validationSchema = yup.object({
  username: yup.string().required('Tên đăng nhập là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc'),
});

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.get('/users');
        const user = response.data.find((u: any) => u.username === values.username && u.password === values.password);

        if (user) {
          if (!user.isActive) {
            alert('Tài khoản của bạn đã bị khóa.');
          } else {
            onLogin(user.role, user.username);
            if (user.role === 'Admin') {
              router.push('/admin');
            } else {
              router.push('/');
            }
          }
        } else {
          alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
      } catch (error) {
        console.error('There was an error logging in!', error);
        alert('Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại.');
      }
    },
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Google Login Success:', user);
      onLogin('User', user.displayName || user.email || 'Google User');
      router.push('/');
    } catch (error) {
      console.error('Google Login Error:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log('Facebook Login Success:', user);
      onLogin('User', user.displayName || user.email || 'Facebook User');
      router.push('/');
    } catch (error) {
      console.error('Facebook Login Error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-red-600">Shopee</div>
        <div className="text-sm text-red-600">Bạn cần giúp đỡ?</div>
      </header>
      <div className="relative flex-1 flex bg-gray-100" style={{ minHeight: '90vh' }}>
        <div className="relative w-2/3">
          <img 
            src="https://down-vn.img.susercontent.com/file/sg-11134004-7rd47-lwqocuzahgi2c3" 
            alt="Background" 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        </div>
        <div className="relative z-10 w-1/3 bg-white p-8 rounded-lg shadow-lg flex items-center justify-center border border-red-500 m-8">
          <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Đăng nhập</h2>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Tên đăng nhập"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-red-500"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                ) : null}
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Đăng nhập
              </button>
            </form>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
              <a href="#" className="hover:text-red-500">Quên mật khẩu</a>
              <a href="#" className="hover:text-red-500">Đăng nhập với SMS</a>
            </div>
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400">HOẶC</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleFacebookLogin}
                className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-300 mr-2"
              >
                Facebook
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ml-2"
              >
                Google
              </button>
            </div>
            <div className="text-center mt-6 text-sm text-gray-600">
              Bạn mới biết đến Shopee? <Link href="/register" className="text-red-500 hover:underline">Đăng ký</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
