"use client";
import useBigFieldStore from "@/store/useBigFieldStore";
import React, { useEffect } from "react";
import SanBongItem from "./san-bong-item";
import { Skeleton } from "../ui/skeleton";

const DanhSachSanBong = () => {
  const { loadBigFields, bigFields } = useBigFieldStore();
  useEffect(() => {
    (async () => {
      await loadBigFields();
    })();
  }, []);
  return (
    <div className="grid grid-auto-fit gap-4">
      {bigFields !== undefined ? (
        bigFields !== null ? (
          bigFields.map((bigField) => (
            <SanBongItem key={bigField._id} bigField={bigField} />
          ))
        ) : (
          <div>Không có sân bóng nào</div>
        )
      ) : (
        Array(8)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="w-full h-[240px]" />
          ))
      )}
    </div>
  );
};

export default DanhSachSanBong;
