// app/layout.tsx
'use client'; // Giữ lại vì cần chạy phía client

import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from './admin/users/CartContext'; // Đảm bảo đường dẫn đúng

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const username = 'guest'; // Hoặc giá trị từ state/context nếu cần

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider username={username}>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
