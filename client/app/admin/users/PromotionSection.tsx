"use client"; // Đảm bảo rằng component này được xử lý ở phía client

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const banners = [
  'https://cf.shopee.vn/file/sg-11134258-7rdx1-lxjs116gnld506',
  'https://cf.shopee.vn/file/sg-11134258-7rdyc-lxjruk47r3vqb1',
  'https://cf.shopee.vn/file/sg-11134258-7rdvm-lxjrukvoliaxe2',
  'https://cf.shopee.vn/file/vn-11134258-7r98o-lxkz5ub65pll02',
  'https://cf.shopee.vn/file/vn-11134258-7r98o-lxjruw9hxsd50d',
  'https://cf.shopee.vn/file/sg-11134258-7rdvj-lxjs0zw4m72k7c',
];

const promotions = [
  { name: 'Samsung', image: 'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lxcf0kac85p515_xhdpi', discount: 'Quà mọi đơn' },
  { name: 'Vaseline', image: 'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lx6pdo1qy3177a_xhdpi', discount: 'Giảm sóc 50%' },
  { name: 'Feellex', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-b40bffb7cc40ddfe3e234c9d72c8584f_xhdpi', discount: 'Giảm đến 50%' },
  { name: 'Deli', image: 'https://down-vn.img.susercontent.com/file/be40023a9d9cff397a470460bc7a924d_xhdpi', discount: 'Deli siêu sale' },
  { name: 'Lovito', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-06fb832ef52b45481158c26831cc459b_xhdpi', discount: 'Giảm đến 50%' },
  { name: 'OMO', image: 'https://down-vn.img.susercontent.com/file/vn-11134258-7r98o-lx6pdo1qwogrf1_xhdpi', discount: 'Mua 1 được 3' },
  { name: 'L\'Oreal', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-7e80ab64bdc989f5c0862ed828f343a2_xhdpi', discount: 'Ưu đãi đến 50%' },
  { name: 'La Roche-Posay', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-08a87dd1e828b4bef31dafa67d5300ec_xhdpi', discount: 'Quà mọi đơn' },
  { name: 'Cool Mate', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-b44bb96f2e16efe70badc41661365c8a_xhdpi', discount: 'Mua 1 tặng 1' },
  { name: 'W', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-7ce7d5800afb2b6c80a7242236ec7409_xhdpi', discount: 'Mua là có quà' },
  { name: 'Thiên Long', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-b71e5e73e9d5705a0eba35f0d03c33c6_xhdpi', discount: 'Giảm đến 50%' },
  { name: 'FOCALLURE', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-e8e0b80b57828bee61eb7e31c3d83765_xhdpi', discount: 'Giảm đến 50%' },
  { name: 'Cocoon', image: 'https://down-vn.img.susercontent.com/file/5fb3f7b359a582f322ea39313e10260b_xhdpi', discount: 'Mua 1 tặng 1' },
  { name: 'GARNIOR', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-38bd1887c97742c1ccadde3fb952c75f_xhdpi', discount: 'Mua là có quà' },
  { name: 'CeraVe', image: 'https://down-vn.img.susercontent.com/file/vn-50009109-5d6b20755f4ef36cf1f73d431c819c9e_xhdpi', discount: 'Mua 1 được 6' },
];

const PromotionSection: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 
  const totalPages = Math.ceil(promotions.length / itemsPerPage);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.pageX;
    const scrollLeft = bannerRef.current?.scrollLeft || 0;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const moveX = moveEvent.pageX - startX;
      if (bannerRef.current) {
        bannerRef.current.scrollLeft = scrollLeft - moveX;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const scrollLeft = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const scrollRight = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentPromotions = promotions.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-red-500 font-bold mr-4">SHOPEE MALL</span>
            <div className="flex items-center mr-4">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/6c502a2641457578b0d5f5153b53dd5d.png" alt="Return" className="w-4 h-4 mr-2" />
              <span>Trả Hàng Miễn Phí 15 Ngày</span>
            </div>
            <div className="flex items-center mr-4">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/511aca04cc3ba9234ab0e4fcf20768a2.png" alt="Auth" className="w-4 h-4 mr-2" />
              <span>Hàng Chính Hãng 100%</span>
            </div>
            <div className="flex items-center">
              <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepagefe/511aca04cc3ba9234ab0e4fcf20768a2.png" alt="Free Ship" className="w-4 h-4 mr-2" />
              <span>Miễn Phí Vận Chuyển</span>
            </div>
          </div>
          <Link href="#">
            <span className="text-red-500">Xem Tất Cả &gt;</span>
          </Link>
        </div>
        <div className="flex">
          <div
            className="flex-shrink-0 w-2/5 relative"
            onMouseDown={handleMouseDown}
            ref={bannerRef}
          >
            <div className="relative">
              <img
                src={banners[currentBanner]}
                alt={`Banner ${currentBanner + 1}`}
                className="mb-2 rounded-lg h-[600px] object-cover"
              />
            </div>
          </div>
          <div className="flex-grow relative w-3/5">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
            >
              &lt;
            </button>
            <div className="flex overflow-x-auto no-scrollbar h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex justify-between">
                  {currentPromotions.slice(0, 4).map((promotion, index) => (
                    <div key={index} className="flex flex-col items-center w-1/4 p-2">
                      <img
                        src={promotion.image}
                        alt={promotion.name}
                        className="w-full h-48 mb-2 object-cover"
                      />
                      <p className="text-center text-lg font-semibold">
                        {promotion.name}
                      </p>
                      <span className="text-red-500 text-lg">
                        {promotion.discount}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  {currentPromotions.slice(4).map((promotion, index) => (
                    <div key={index} className="flex flex-col items-center w-1/4 p-2">
                      <img
                        src={promotion.image}
                        alt={promotion.name}
                        className="w-full h-48 mb-2 object-cover"
                      />
                      <p className="text-center text-lg font-semibold">
                        {promotion.name}
                      </p>
                      <span className="text-red-500 text-lg">
                        {promotion.discount}
                      </span>
                    </div>
                  ))}
                  {currentPage === totalPages - 1 && (
                    <div className="flex flex-col items-center justify-center w-1/4 p-2">
                      <Link href="#">
                        <span className="text-red-500 text-lg font-semibold">
                          Xem tất cả
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionSection;
