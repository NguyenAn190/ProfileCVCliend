"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEmailForgotPassword, changePassword } from '@/service/auth/auth.service';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChangePasswordSchema from '@/app/(auth)/forgot-password/[token]/[id]/chang-password.schema';
import { LoadingPage } from '@/components/loading/loading-page';

const ForgotPassword = () => {
  const params = useParams();
  let { token, id } = params;

  // Đảm bảo token và id là chuỗi
  if (Array.isArray(token)) token = token[0];
  if (Array.isArray(id)) id = id[0];

  const router = useRouter();
  const { toast } = useToast();
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        setIsLoading(true);
        const checkToken = await checkEmailForgotPassword(token, id);
        console.log(checkToken);
      } catch (error: any) {
        if (error?.response?.data?.message) {
          toast({
            variant: "destructive",
            title: "Thất bại",
            description: "Gmail không hợp lệ hoặc đã hết hạn!",
            action: <ToastAction altText="Try again">Thử lại</ToastAction>,
          });
        }
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && id) {
      verifyToken();
    }
  }, [token, id, router, toast]);

  const handleChangePassword = async (data: { password: string; confirmPassword: string }) => {
    try {
      setIsLoading(true);
      await changePassword(id, data.password);
      toast({
        title: "Thành công",
        description: "Mật khẩu đã được thay đổi thành công!",
      });
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Thất bại",
        description: "Có lỗi xảy ra, vui lòng thử lại sau!",
        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <LoadingPage isLoading={isLoading} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Đổi mật khẩu</CardTitle>
          <CardDescription>
            Nhập mật khẩu mới của bạn để thay đổi mật khẩu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleChangePassword)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                {...register('password')}
                className={errors.password ? "border-red-500" : ""}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className={errors.confirmPassword ? "border-red-500" : ""}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
              )}
            </div>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ForgotPassword;
