import { Metadata } from 'next';
import seoImage from '@/app/(auth)/login/image/login.png';

export const metadata: Metadata = {
  title: 'ProfileCV - Đăng nhập',
  description: 'Trang đăng nhập của ProfileCV',
  openGraph: {
    title: 'ProfileCV - Đăng nhập',
    description: 'Trang đăng nhập của ProfileCV',
    url: 'https://profile-cliend.vercel.app/login',
    images: [
      {
        url: `https://profile-cliend.vercel.app${seoImage.src}`,
        width: 1200,
        height: 630,
        alt: 'ProfileCV Login Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProfileCV - Đăng nhập',
    description: 'Trang đăng nhập của ProfileCV',
    images: [`https://profile-cliend.vercel.app${seoImage.src}`],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
