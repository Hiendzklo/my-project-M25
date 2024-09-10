// src/app/user/PromoSection.tsx (hoặc src/pages/user/PromoSection.tsx nếu bạn dùng Pages Directory)
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const PromoSection: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto py-4 flex">
        <div className="w-2/3 mr-4"> 
          <Slider {...settings}>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lwvnhla0s5azc4_xxhdpi" alt="Slide 1" className="w-full"/>
            </div>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhyohqocwyjb5_xxhdpi" alt="Slide 2" className="w-full"/>
            </div>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhyu30dsau11d_xxhdpi" alt="Slide 3" className="w-full"/>
            </div>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhz8q7ian6j9f_xxhdpi" alt="Slide 3" className="w-full"/>
            </div>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhyy1f3dza149_xxhdpi" alt="Slide 3" className="w-full"/>
            </div>
            <div>
              <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhz6nkjioyj5a_xxhdpi" alt="Slide 3" className="w-full"/>
            </div>
          </Slider>
        </div>
        <div className="w-1/3 flex flex-col space-y-4"> 
          <div className="flex-1 h-1/2"> 
            <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxhuianqytwb35_xhdpi" alt="Ad 1" className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1 h-1/2">
            <img src="https://cf.shopee.vn/file/vn-11134258-7r98o-lxjdeu47j74r9f_xhdpi" alt="Ad 2" className="w-full h-full object-cover"/>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-5 gap-4 text-center">
          <div>
            <img src="https://cf.shopee.vn/file/vn-50009109-f6c34d719c3e4d33857371458e7a7059_xhdpi" alt="Voucher" className="mx-auto"/>
            <p className="mt-2">Voucher Giảm Đến 1 Triệu</p>
          </div>
          <div>
            <img src="https://cf.shopee.vn/file/vn-50009109-c7a2e1ae720f9704f92f72c9ef1a494a_xhdpi" alt="Freeship" className="mx-auto"/>
            <p className="mt-2">Miễn Phí Ship - Có Shopee</p>
          </div>
          <div>
            <img src="https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi" alt="Discount" className="mx-auto"/>
            <p className="mt-2">Mã Giảm Giá</p>
          </div>
          <div>
            <img src="https://cf.shopee.vn/file/vn-50009109-c02353c969d19918c53deaa4ea15bdbe_xhdpi" alt="Shopee Style" className="mx-auto"/>
            <p className="mt-2">Shopee Style Voucher 40%</p>
          </div>
          <div>
            <img src="https://cf.shopee.vn/file/a08ab28962514a626195ef0415411585_xhdpi" alt="International" className="mx-auto"/>
            <p className="mt-2">Hàng Quốc Tế</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoSection;
