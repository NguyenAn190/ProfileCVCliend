"use client";
import { Button } from "@/components/ui/button";
import checkImage from "./check.png";
import errorImage from "./warning.png";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { veryfyTokenActiveUser } from "@/service/auth/auth.service";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/loading/loading-page";
import Link from "next/link";

const AuthenticationPage = () => {
  const params = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("loading");
  let { token, id } = params;

  // Đảm bảo token và id là chuỗi
  if (Array.isArray(token)) token = token[0];
  if (Array.isArray(id)) id = id[0];

  const handleVerifyToken = async () => {
    setIsLoading(true);
    try {
      const checkToken = await veryfyTokenActiveUser(token, id);
        setStatus("success");
      console.log(checkToken)
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Gmail không hợp lệ hoặc đã hết hạn!",
        });
      }
      setStatus("error");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    handleVerifyToken();
  }, []);

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
    <LoadingPage isLoading={isLoading} />
      <Card className="w-full max-w-sm p-4 bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {status === "success" && (
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Image
                  src={checkImage}
                  alt="Check icon"
                  className="mx-auto mb-3"
                  width={90}
                  height={90}
                />
              </motion.div>
            )}
            {status === "error" && (
                <motion.div
                initial={{ scale: 0 }}
                animate={{ rotate: 360, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <Image
                  src={errorImage}
                  alt="Check icon"
                  className="mx-auto mb-3"
                  width={90}
                  height={90}
                />
              </motion.div>
            )}
            
          </CardTitle>
          <CardDescription className="text-center mt-4 text-gray-600">
          {status === "success" && "Chúc mừng! Tài khoản của bạn đã được kích hoạt thành công."}
        {status === "error" && "Có lỗi xảy ra! Vui lòng thử lại."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="grid gap-4">
          <Button className="w-full ">
            <Link href="/login">
                Quay lại trang đăng nhập
            </Link>
          </Button>
          <Button variant="outline"><Link href="/login">
                Liên hệ hỗ trợ
            </Link></Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default AuthenticationPage;
