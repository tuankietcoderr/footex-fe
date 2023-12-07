import Image from "next/image"
import React from "react"
import GradientText from "../../components/gradient-text"

const WhyChooseUs = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 z-[-1] bg-white bg-opacity-70 bg-[url('/stadium.png')] bg-contain bg-repeat-round blur-lg" />
      <h2 className="mb-2 text-5xl font-semibold">
        Tại sao nên <GradientText>chọn</GradientText> chúng tôi?
      </h2>
      <p className="text-gray-500">
        Chúng tôi mang lại những dịch vụ phục vụ chủ sân và khách muốn đặt sân
      </p>
      <div>
        <div className="items-center md:flex">
          <Image
            src={"/field.png"}
            alt="Why choose us"
            width={400}
            height={600}
            quality={100}
            className="w-full object-contain"
          />
          <div>
            <h3 className="mb-2 text-center text-3xl font-semibold text-red-700 md:text-left">
              Đặt sân bóng dễ dàng hơn
            </h3>
            <p className="text-center md:text-left">
              Chúng tôi cung cấp cho bạn những sân bóng phù hợp với nhu cầu của bạn và những sân
              bóng được tạo ra bởi chính chủ sân bóng.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse items-center md:flex-row">
          <div>
            <h3 className="mb-2 text-center text-3xl font-semibold text-yellow-500 md:text-right">
              Nhiều mục tiêu hơn
            </h3>
            <p className="text-center md:text-right">
              Chúng tôi cung cấp dịch vụ cho chủ sân bóng tạo ra những giải đấu bóng đá và những
              giải đấu này sẽ mang lại những mục tiêu cho khách đặt sân bóng.
            </p>
          </div>
          <Image
            src={"/cup.png"}
            alt="Why choose us"
            width={400}
            height={600}
            quality={100}
            className="w-full object-contain"
          />
        </div>
        <div className="items-center md:flex">
          <Image
            src={"/field-with-ball.png"}
            alt="Why choose us"
            width={400}
            height={600}
            quality={100}
            className="w-full object-contain"
          />
          <div>
            <h3 className="mb-2 text-center text-3xl font-semibold text-blue-700 md:text-left">
              Thách đấu đối thủ
            </h3>
            <p className="text-center md:text-left">
              Chúng tôi cung cấp cho bạn danh sách những đối thủ gần khu vực bạn đang sống và bạn có
              thể thách đấu với họ.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
