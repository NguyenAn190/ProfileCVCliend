import Image from "next/image";
import bg from "./image/banner.jpg";
import anhcv from "./image/anhcv.jpg";

export default function InfoProfileComponent() {
  return (
    <section className="info-profile w-full h-fit relative">
      <div
        className="relative w-full bg-cover bg-center h-fit flex flex-col items-center justify-center pt-20"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="w-full h-full absolute top-0 left-0"></div>
        <div className="relative z-10 max-w-screen-lg text-center p-8 rounded-lg">
          <h1 className="text-3xl font-bold">Thông tin cá nhân</h1>
          <div className="w-[80px] bg-blue-700 h-[4px] mx-auto my-3"></div>
          <p className="text-start">
            Tôi tên là Nguyễn Thọ An, một lập trình viên full-stack với bằng cử
            nhân từ FPT Polytechnic Cần Thơ. Tôi đã có nhiều kinh nghiệm làm việc
            với các công nghệ web và phát triển phần mềm, bao gồm Java Spring, JavaFX, HTML, CSS,
            JavaScript, và Node.js. Trong suốt quá trình học tập và làm việc,
            tôi luôn nỗ lực học hỏi và áp dụng những công nghệ mới nhất để mang
            đến những giải pháp phát triển hiệu quả và sáng tạo cho các dự án.{" "}
            <br />
            Tôi luôn mong muốn học hỏi và cập nhật các công nghệ mới nhất. Hiện
            tại, tôi đang tìm kiếm cơ hội để áp dụng những kiến thức và kỹ năng
            của mình vào các dự án thực tế, mang lại giá trị cho người dùng và
            doanh nghiệp. Tôi tin rằng với sự kiên trì, tinh thần học hỏi không
            ngừng, và khả năng làm việc nhóm tốt, tôi có thể đóng góp tích cực
            vào sự thành công của bất kỳ dự án nào.
            <br />
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8 px-4">
        <div className="rounded-[20px] overflow-hidden shadow-lg max-w-screen-lg mx-auto flex flex-col md:flex-row">
          <div className="relative w-full md:w-[500px] h-[500px] md:h-[500px]">
            <div>
              <Image
                src={anhcv}
                alt="Profile Image"
                layout="fill"
                objectFit="cover"
                className=" md:rounded-t-none md:rounded-l-[20px]"
              />
            </div>
          </div>
          <div className="p-5 md:p-20 gap-2 text-white flex flex-col justify-center bg-[#1a1a2e] ">
            <h1 className="text-3xl font-bold">Xin chào,</h1>
            <p className="mt-4">
              <strong>Tôi tên là:</strong> Nguyễn Thọ An
            </p>
            <p>
              <strong>Tuổi:</strong> 21
            </p>
            <p>
              <strong>Số điện thoại:</strong> 0969653264
            </p>
            <p>
              <strong>Email:</strong> nguyenthoan.dev@gmail.com
            </p>
            <p>
              <strong>Git:</strong> Nguyenan190
            </p>
            <p>
              <strong>Địa chỉ:</strong> Chợ Nguyễn Đình Chiểu, Khu phố 1, Quận
              3, TPHCM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
