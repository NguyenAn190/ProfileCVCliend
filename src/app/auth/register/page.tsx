import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm() {
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
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">Họ</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Tên</Label>
              <Input id="last-name" placeholder="Robinson" required />
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
            <Input id="password" type="password" />
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
          <Link href="/auth/login" className="underline">
            Đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
    </section>
  )
}

export default RegisterForm;