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
import { useState } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
export function LoginForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        formData
      );
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error?.response.data);
      toast({
        variant: "destructive",
        title: "Lỗi!",
        description: error?.response.data.message,
        action: <ToastAction altText="Try again">Thử lại</ToastAction>
      });
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
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
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
