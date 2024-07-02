"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import anhcv from "./image/anhcv.jpg";
import Image from "next/image";
import start from "./image/star.png";
import moon from "./image/moon.png";

export default function Home() {
  useEffect(() => {
    gsap.to(".circle-1", {
      y: 100,
      duration: 3,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(".circle-2", {
      y: 70,
      duration: 4,
      ease: "power2.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(".moon-1", {
      y: -70,
      duration: 5,
      ease: "power3.inOut",
      repeat: -1,
      yoyo: true,
    });
    gsap.to(".moon-2", {
      y: 200,
      duration: 6,
      ease: "power4.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <section className="h-fit p-2.5 bg-black rounded-br-[200px]">
      <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between items-center py-32 pb-200">
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <p className="text-white text-2xl">Xin chào, tôi là</p>
          <h1 className="text-5xl font-bold text-white">
            Nguyễn Thọ <span className="text-blue-700">An</span>
          </h1>
          <div className="text-white">
            <div className="flex items-center mr-3">
              <div className="w-[50px] bg-blue-700 h-[4px]"></div>
              <span className="ml-2">Fullstack Developer</span>
            </div>
          </div>
          <p className="text-white">
            Xin chào, tôi là Nguyễn Thọ An, một full-stack developer với kinh
            nghiệm trong việc phát triển và duy trì các tính năng trên website.
            Tôi đặc biệt quan tâm đến việc tối ưu hóa hiệu suất và trải nghiệm
            người dùng, và luôn sẵn sàng giải quyết các vấn đề kỹ thuật để đảm
            bảo sự hoạt động suôn sẻ của hệ thống.
          </p>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Xem thêm
            </button>
            <button
              type="button"
              className=" hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-12 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 text-white"
            >
              Tải CV
            </button>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center items-center relative md:pt-5">
          <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px]">
            <div
              className="absolute bottom-[-70px] left-[40%] transform -translate-x-1/2 w-60 h-60 rounded-full"
              style={{ background: "#0d112a" }}
            ></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full"></div>
            <div className="rounded-full w-[350px] h-[350px] md:w-[450px] md:h-[450px] border-4 border-blue-700 overflow-hidden flex justify-center items-center">
              <Image
                src={anhcv}
                width={600}
                height={600}
                loading="lazy"
                alt="Picture of the author"
                className="rounded-full w-[320px] h-[320px] md:w-[390px] md:h-[390px] object-cover z-10"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-10 w-20 h-20 rounded-full circle-1">
            <Image
              src={start}
              width={100}
              height={100}
              alt="Picture of the author"
            />
          </div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full circle-2"></div>
          <div className="absolute bottom-0 right-24 w-14 h-14 bg-gray-500 rounded-full moon-1"></div>
          <div className="absolute top-10 right-0 w-20 h-20 rounded-full moon-2">
            <Image src={moon} width={100} height={100} alt="moon" />
          </div>
            </div>
            </div>
    </section>
  );
}
