import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"

const Onboard = () => {
  return (
    <div className="flex min-h-screen items-center bg-gradient-to-b from-emerald-100 to-white">
      <div className="mx-[5%] grid-cols-2 md:grid">
        <div className="flex  -translate-y-5 flex-col gap-4">
          <h2 className="text-7xl font-bold leading-tight">
            Thế giới trong
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-emerald-500 bg-clip-text text-transparent">
              đôi chân
            </span>
          </h2>
          <p className="text-gray-500">
            Một cách nhanh chóng và tiện lợi hơn khi bạn không biết phải đá bóng ở sân bóng nào cạnh
            khu vực mình đang sống bằng cách kết nối trực tiếp với các chủ sân bóng.
          </p>
          <Button size={"sm"} className="w-fit rounded-full px-8">
            <Link href="/dang-ky" className="w-full font-semibold">
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
