// app/myAccount/page.tsx
import React from 'react';
import MyAccount from '../../app/admin/users/MyAccount'; 
import HeaderUser from '../../app/admin/users/HeaderUser'; 
import Footer from '../Footer'; 

const MyAccountPage = () => {
  return (
    <>
      {/* Hiển thị HeaderUser */}
      <HeaderUser username="testuser" avatar="/path/to/avatar.png" /> 
      
      {/* Nội dung trang MyAccount */}
      <div className="container mx-auto py-4">
        <MyAccount /> 
      </div>
      
      {/* Hiển thị Footer */}
      <Footer />
    </>
  );
};

export default MyAccountPage;
