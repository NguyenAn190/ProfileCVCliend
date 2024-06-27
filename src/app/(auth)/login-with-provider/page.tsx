'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LoginWithProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // Lưu token vào cookies
      Cookies.set('access_token', token, { expires: 7 });

      // Chuyển hướng về trang chủ
      router.replace('/');
    }
  }, [searchParams, router]);

  return (
    <div>
      Đang xử lý...
    </div>
  );
}
