import React from 'react';

const AdminLogin = () => {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Phần hình ảnh chiếm 3/4 màn hình */}
      <div
        className="w-3/4 bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/admin-avatar.png')" }} // Hình nền admin-avatar.png từ public
      >
      </div>

      {/* Phần form đăng nhập chiếm 1/4 màn hình, với nền đen */}
      <div className="w-1/4 bg-black flex items-center justify-center">
        {/* Form màu trắng */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-8 text-center">Sign in</h2>
          <form className="w-full">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="user name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500 h-4 w-4"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
