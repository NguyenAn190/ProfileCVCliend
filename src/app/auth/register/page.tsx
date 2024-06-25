"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RegisterSchema from '@/app/auth/register/register-schema';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data); // Xử lý logic gửi form ở đây
  };

  return (
    <section className="flex items-center justify-center h-screen">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Đăng kí</CardTitle>
        <CardDescription>
          Nhập thông tin của bạn để hoàn tất quá trình tạo tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Họ</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Max"
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Tên</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Robinson"
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Tạo tài khoản
            </Button>
            <Button variant="outline" className="w-full">
              Đăng nhập với Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Bạn đã có tài khoản?{" "}
            <Link href="/auth/login" passHref>
              <span className="underline">Đăng nhập</span>
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
    </section>
  );
}
