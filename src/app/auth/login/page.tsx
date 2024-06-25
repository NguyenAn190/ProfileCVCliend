"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import LoginSchema from "./login-schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { login } from "@/service/auth/auth.service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await login(data); // Sử dụng hàm login từ services
      Cookies.set("access_token", response.access_token, { expires: 7 });
      router.push("/");
    } catch (error: any) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Lỗi!",
        description: error?.response.data.message,
        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email của bạn để hoàn tất quá trình đăng nhập
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Đăng nhập với Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Bạn không có tài khoản?{" "}
              <Link href="/auth/register" className="underline">
                Đăng kí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

export default LoginForm;
