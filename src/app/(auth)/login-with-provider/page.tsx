'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { LoadingPage } from '@/components/loading/loading-page';
import { useToast } from '@/components/ui/use-toast';

function LoginWithProvider() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();
  useEffect(() => {
    try{
      setIsLoading(true)
      const token = searchParams.get('token');

      if (token) {
        // Lưu token vào cookies
        Cookies.set('access_token', token, { expires: 7 });
        toast({
          title: "Đăng nhập thành công",
          description: "Giờ bạn đã có thể tạo cv của mình!",
        });
        // Chuyển hướng về trang chủ
        router.replace('/');
      }
    }catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Gmail không hợp lệ hoặc đã hết hạn!",
      });
      router.replace('/');
    }finally {
      setIsLoading(false)
    }
  }, [searchParams, router]);

  return (
    <div>
      <LoadingPage isLoading={isLoading} />
    </div>
  );
}

// Bọc LoginWithProvider trong Suspense
export default function WrappedLoginWithProvider() {
  return (
    <Suspense fallback={<LoadingPage isLoading={true} />}>
      <LoginWithProvider />
    </Suspense>
  );
}
