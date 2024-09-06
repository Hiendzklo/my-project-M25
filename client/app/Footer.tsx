//Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-10 border-t">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">CHĂM SÓC KHÁCH HÀNG</h3>
            <ul className="text-gray-600 text-base space-y-2">
              <li>Trung Tâm Trợ Giúp</li>
              <li>Shopee Blog</li>
              <li>Shopee Mall</li>
              <li>Hướng Dẫn Mua Hàng</li>
              <li>Hướng Dẫn Bán Hàng</li>
              <li>Thanh Toán</li>
              <li>Shopee Xu</li>
              <li>Vận Chuyển</li>
              <li>Trả Hàng & Hoàn Tiền</li>
              <li>Chăm Sóc Khách Hàng</li>
              <li>Chính Sách Bảo Hành</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">VỀ SHOPEE</h3>
            <ul className="text-gray-600 text-base space-y-2">
              <li>Giới Thiệu Về Shopee Việt Nam</li>
              <li>Tuyển Dụng</li>
              <li>Điều Khoản Shopee</li>
              <li>Chính Sách Bảo Mật</li>
              <li>Chính Hãng</li>
              <li>Kênh Người Bán</li>
              <li>Flash Sales</li>
              <li>Chương Trình Tiếp Thị Liên Kết Shopee</li>
              <li>Liên Hệ Với Truyền Thông</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">THANH TOÁN</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img src="https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8" alt="Visa" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16" alt="Mastercard" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08" alt="JCB" className="h-8"/>
              </div>
              <div className="flex space-x-4">
                <img src="https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c" alt="Shopee" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281" alt="Amex" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09" alt="Amex" className="h-8"/>
              </div>
              <div className="flex space-x-4">
                <img src="https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06" alt="Shopee" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492" alt="Amex" className="h-8"/>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">THEO DÕI CHÚNG TÔI TRÊN</h3>
            <ul className="text-gray-600 text-base space-y-2">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-700 font-semibold mb-4">TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h3>
            <div className="space-y-4">
              <img src="https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472" alt="QR Code" className="h-24"/>
              <div className="flex space-x-4">
                <img src="https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163" alt="App Store" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def" alt="Google Play" className="h-8"/>
                <img src="https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0" alt="App Gallery" className="h-8"/>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t mt-10 pt-6 text-center text-base text-gray-600">
          <p>&copy; 2024 Shopee. Tất cả các quyền được bảo lưu.</p>
          <p>Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil | Mexico | Colombia | Chile | Đài Loan</p>
          <p className="mt-4">CHÍNH SÁCH BẢO MẬT | QUY CHẾ HOẠT ĐỘNG | CHÍNH SÁCH VẬN CHUYỂN | CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</p>
          <div className="flex justify-center space-x-8 mt-4">
            <img src="http://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-dang-ky-bo-cong-thuong.png" alt="Đã đăng ký Bộ Công Thương" className="h-12"/>
            <img src="https://dangkywebvoibocongthuong.com/wp-content/uploads/2021/11/logo-da-thong-bao-bo-cong-thuong.png" alt="Bộ Công Thương" className="h-12"/>
          </div>
          <p className="mt-4">Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
