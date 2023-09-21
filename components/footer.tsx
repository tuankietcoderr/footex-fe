"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const Footer = () => {
  return (
    <div className="mt-8 w-full bg-primary px-[5%] py-8">
      <div className="justify-between md:flex">
        <div className="mb-8">
          <Link href={"/"}>
            <Image src={"/next.svg"} alt={"Next.js"} width={100} height={100} />
          </Link>
          <ul className="ml-4 mt-4 list-disc">
            <li className="text-primary-foreground">Thủ Đức, Thành phố Hồ Chí Minh, Việt Nam</li>
            <li className="text-primary-foreground">Dĩ An, Bình Dương, Việt Nam</li>
          </ul>
        </div>
        <div className="flex flex-wrap gap-8">
          <div>
            <h3 className="font-bold text-primary-foreground">Dành cho chủ sân</h3>
            <ul className="mt-4">
              <li className="text-primary-foreground">
                <Link href={"/dang-ky"}>Đăng ký</Link>
              </li>
              <li className="text-primary-foreground">
                <Link href={"/dang-nhap"}>Đăng nhập</Link>
              </li>
              <li className="text-primary-foreground">
                <Link href={"/chu-san-bong"}>Quản lý sân bóng</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary-foreground">Dành cho khách</h3>
            <ul className="mt-4">
              <li className="text-primary-foreground">
                <Link href={"/dang-ky"}>Đăng ký</Link>
              </li>
              <li className="text-primary-foreground">
                <Link href={"/dang-nhap"}>Đăng nhập</Link>
              </li>
              <li className="text-primary-foreground">
                <Link href={"/san-bong"}>Tìm sân bóng</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary-foreground">Về chúng tôi</h3>
            <ul className="mt-4">
              <li className="text-primary-foreground">Giới thiệu</li>
              <li className="text-primary-foreground">Điều khoản sử dụng</li>
              <li className="text-primary-foreground">Chính sách bảo mật</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary-foreground">Liên hệ</h3>
            <ul className="mt-4">
              <li className="text-primary-foreground">Facebook</li>
              <li className="text-primary-foreground">Twitter</li>
              <li className="text-primary-foreground">Instagram</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-sm text-primary-foreground">
        © Bản quyền thuộc Footex 2023
      </p>
    </div>
  )
}

export default Footer
