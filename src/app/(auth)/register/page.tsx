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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoadingPage } from "@/components/loading/loading-page";
import { registerUser } from "@/service/auth/auth.service";
import RegisterSchema from "@/app/(auth)/register/register.schema";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("Dữ liệu gửi lên server:", data); // Kiểm tra dữ liệu trước khi gửi lên server
    setIsLoading(true);

    try {
      const response = await registerUser(data);
      toast({
        title: "Tạo tài khoản thành công!",
        description: "Vui lòng kiểm tra email để kích hoạt tài khoản!",
      });
      router.push("/login");
    } catch (e: any) {
      console.log("Lỗi khi gửi dữ liệu:", e);
      if (e?.response?.data?.message) {
        setError("confirmPassword", {
          type: "manual",
          message: e?.response?.data?.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <LoadingPage isLoading={isLoading} />
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
            <div className="grid gap-2">
                <Label htmlFor="fullname">Họ và tên</Label>
                <Input
                  id="fullname"
                  type="text"
                  {...register("fullname")}
                  placeholder="Nguyễn Văn A"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="gmail@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
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
              <Link href="/login" passHref>
                <span className="underline">Đăng nhập</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
