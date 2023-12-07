import React from "react"
import { Button } from "../../components/ui/button"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const HomeIntro = () => {
  return (
    <div className="mt-4 grid gap-8 rounded-lg p-8 shadow-md grid-auto-fit">
      <div className="flex flex-col justify-between gap-6">
        <h2 className="text-2xl font-bold">Chào mừng bạn đến với Footex</h2>
        <ul className="ml-4 flex list-disc flex-col gap-2">
          <li>
            <p className="text-justify">
              Footex là một trang web giúp bạn tìm kiếm sân bóng, đặt sân bóng và tham gia các giải
              đấu. Bạn có thể tìm kiếm sân bóng theo địa điểm, giá, thời gian và đặt sân bóng ngay
              trên trang web của chúng tôi.
            </p>
          </li>
          <li>
            <p className="text-justify">
              Bạn cũng có thể tạo đội bóng của riêng mình và tham gia các giải đấu. Tham gia các
              giải đấu sẽ giúp bạn có thể giao lưu, tìm kiếm đối thủ và nâng cao kỹ năng của mình.
              Có thể mời các thành viên khác vào đội bóng của mình.
            </p>
          </li>
          <li>
            <p className="text-justify">
              Nếu bạn là chủ sân bóng, bạn có thể đăng ký sân bóng của mình lên trang web của chúng
              tôi để thu hút khách hàng. Bạn có thể đăng ký sân bóng của mình bằng cách nhấn vào nút
              đăng ký bên dưới.
            </p>
          </li>
        </ul>
        <div className="flex flex-wrap justify-end gap-4">
          <Button asChild>
            <Link href="/san-bong/dang-ky">Đăng ký sân bóng</Link>
          </Button>
          <Button variant={"link"} asChild>
            <Link href="/san-bong">
              Tìm kiếm sân bóng <ChevronRight />
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src={"/main.jpg"}
        alt="Picture of the author"
        width={800}
        height={800}
        className="h-full w-full rounded-lg object-cover"
        quality={100}
        priority
        loading="eager"
      />
    </div>
  )
}

export default HomeIntro
