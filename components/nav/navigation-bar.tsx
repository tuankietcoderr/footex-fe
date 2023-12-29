import Image from "next/image"
import Link from "next/link"
import AfterLoginNav from "./after-login-nav"
import NavItem from "./nav-item"
import Logo from "../logo"

const NavigationBar = () => {
  return (
    <div
      className={`z-[99] flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-[5%]`}
    >
      <Link href={"/"}>
        <Logo width={200} height={40} color="var(--primary)" className="fill-primary" />
      </Link>
      <NavItem />
      <AfterLoginNav />
    </div>
  )
}

export default NavigationBar
