import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "ProfileCV - Trang chủ",
  description: "Tạo ProfileCV của bạn",
  openGraph: {
    title: "ProfileCV - Đăng nhập",
    description: "Trang đăng nhập của ProfileCV",
    url: "https://profile-cliend.vercel.app/login",
    images: [
      {
        url: `https://profile-cliend.vercel.app`,
        width: 1200,
        height: 630,
        alt: "ProfileCV Login Image",
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
      <div>   
          {children}
      </div>
  );
}
