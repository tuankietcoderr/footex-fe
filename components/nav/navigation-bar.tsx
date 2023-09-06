import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import AfterLoginNav from "./after-login-nav";

interface INav {
  title: string;
  href: string;
}

const NavigationBar = () => {
  return (
    <div className="flex justify-between py-4 px-8 bg-white items-center sticky top-0 shadow-sm z-[99]">
      <Link href={"/"}>
        <Image src={"/next.svg"} alt={"Next.js"} width={100} height={100} />
      </Link>
      <div className="flex gap-2 items-center">
        <Button asChild variant={"link"}>
          <Link href={"/"}>Trang chủ</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/san-bong"}>Sân bóng</Link>
        </Button>
        <Button asChild variant={"link"}>
          <Link href={"/giai-dau"}>Giải đấu</Link>
        </Button>
      </div>
      <AfterLoginNav />
    </div>
  );
};

export default NavigationBar;
