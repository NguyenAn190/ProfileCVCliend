import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProfileCV - Trang chủ",
  description: "Tạo ProfileCV của bạn",
  openGraph: {
    title: 'ProfileCV - Đăng nhập',
    description: 'Trang đăng nhập của ProfileCV',
    url: 'https://profile-cliend.vercel.app/login',
    images: [
      {
        url: `https://profile-cliend.vercel.app`,
        width: 1200,
        height: 630,
        alt: 'ProfileCV Login Image',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          {children}
           <Toaster />
        </main>
      </body>
    </html>
  );
}