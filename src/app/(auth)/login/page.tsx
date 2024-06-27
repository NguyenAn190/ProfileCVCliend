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
import LoginSchema from "./login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { login, sendEmailForgotPassword } from "@/service/auth/auth.service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoadingPage } from "@/components/loading/loading-page";
import { ToastAction } from "@radix-ui/react-toast";
import { signIn } from "next-auth/react";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(LoginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const emailValue = watch("email");

  useEffect(() => {
    if (emailValue) {
      trigger("email");
    }
  }, [emailValue, trigger]);

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await login(data);
      console.log(response);
      Cookies.set("access_token", response.access_token, { expires: 7 });
      toast({
        title: "Thành công!",
        description: "Đăng nhập thành công!",
      });
      router.push("/");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setError("password", {
          type: "manual",
          message: error?.response?.data?.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const isValid = await trigger("email"); // Kiểm tra tính hợp lệ của email
    if (isValid) {
      clearErrors("email");
      try {
        const email = (document.getElementById("email") as HTMLInputElement)
          .value;
        setIsLoading(true);
        const response = await sendEmailForgotPassword(email);
        console.log(response);
        toast({
          title: "Thành công!",
          description: "Mã xác thực đã được gửi qua email của bạn!",
          action: (
            <ToastAction altText="Kiểm tra Gmail">
              <Button variant="outline">
                <a
                  href="https://mail.google.com/mail/u"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Kiểm tra Gmail
                </a>
              </Button>
            </ToastAction>
          ),
        });
        clearErrors("password");
      } catch (error: any) {
        console.log(error);
        if (error?.response?.data?.message) {
          setError("email", {
            type: "manual",
            message: error?.response?.data?.message,
          });
        }
      } finally {
        clearErrors("password");
        setIsLoading(false);
      }
    } else {
      setError("email", {
        type: "manual",
        message: "Email không hợp lệ!",
      });
    }
  };

  const signInWithGoogle = async () => {
    try {
      window.location.href = process.env.NEXT_PUBLIC_API_URL + '/users/auth/google';
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <LoadingPage isLoading={isLoading} />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập tài khoản của bạn để hoàn tất quá trình đăng nhập
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
                  placeholder="mail@example.com"
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
                  <button
                    onClick={handleForgotPassword}
                    className="ml-auto inline-block text-sm underline"
                    type="button"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••••"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={signInWithGoogle}
              >
                Đăng nhập với Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Bạn không có tài khoản?{" "}
              <Link href="/register" className="underline">
                Đăng kí
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
