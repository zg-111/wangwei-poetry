import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '诗中有画 - 王维的山水诗世界',
  description:
    '探索王维山水诗的艺术世界，感受"诗中有画，画中有诗"的永恒魅力。',
  keywords: ['王维', '山水诗', '唐诗', '诗中有画', '中国古典文学'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
