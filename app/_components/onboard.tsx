import Link from "next/link"
import { Button } from "../../components/ui/button"
import Image from "next/image"
import GradientText from "../../components/gradient-text"

const Onboard = () => {
  return (
    <div className="flex min-h-screen items-center bg-gradient-to-b from-primary to-white">
      <div className="mx-[5%] grid-cols-2 md:grid">
        <div className="flex  -translate-y-5 flex-col gap-4">
          <h2 className="text-7xl font-bold leading-tight">
            Thế giới
            <br />
            <GradientText>trên đôi chân của bạn</GradientText>
          </h2>
          <p className="text-gray-500">
            Một cách nhanh chóng và tiện lợi hơn khi bạn không biết phải đá bóng ở sân bóng nào cạnh
            khu vực mình đang sống bằng cách kết nối trực tiếp với các chủ sân bóng.
          </p>
          <Button
            size={"sm"}
            className="w-fit rounded-full bg-gradient-to-r from-emerald-300 to-emerald-500 px-12 py-6 sm:hover:from-emerald-200 sm:hover:to-emerald-600"
          >
            <Link href="/dang-ky" className="w-full text-lg font-semibold">
              Bắt đầu ngay
            </Link>
          </Button>
        </div>
        <div className="hidden place-items-center md:grid">
          <Image src={"/football-feet.png"} alt="Football" width={400} height={400} />
        </div>
      </div>
    </div>
  )
}

export default Onboard
