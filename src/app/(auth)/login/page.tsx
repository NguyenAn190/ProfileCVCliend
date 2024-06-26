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
import { useState, useEffect  } from "react";
import { login, sendEmailForgotPassword } from "@/service/auth/auth.service";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { LoadingPage } from "@/components/loading/loading-page";

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
          message: "Email hoặc mật khẩu không hợp lệ",
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
        const email = (document.getElementById("email") as HTMLInputElement).value;
        setIsLoading(true);
        const response = await sendEmailForgotPassword(email);
        toast({
          title: "Thành công!",
          description: "Mã xác thực đã được gửi qua email của bạn!",
        });
        clearErrors("password");
      } catch (error: any) {
        console.log(error)
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

  return (
    <section className="flex items-center justify-center h-screen">
      <LoadingPage isLoading={isLoading} />
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
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
