import Image from "next/image"
import Link from "next/link"
import AfterLoginNav from "./after-login-nav"
import NavItem from "./nav-item"

const NavigationBar = () => {
  return (
    <div
      className={`z-[99] flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-[5%]`}
    >
      <Link href={"/"}>
        <Image src={"/next.svg"} alt={"Next.js"} width={100} height={100} priority />
      </Link>
      <NavItem />
      <AfterLoginNav />
    </div>
  )
}

export default NavigationBar
