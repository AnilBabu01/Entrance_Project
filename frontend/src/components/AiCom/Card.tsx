import React from "react";
import goTo from "../../../public/assets/Goto.svg";
import Image from "next/image";

type StaticItem = {
  title: string;
  desc: string;
  mobileDesc: string;
};

function Card({ item }: { item: StaticItem }) {
  return (
    <div className="md:w-[16rem] w-[100%] border border-[#E6E6E6] rounded-[18px] p-4 shadow-md">
      <div className="flex justify-between relative">
        <div className=" w-[50%]">
          <h2 className="text-left text-[18px] md:text-[25px] leading-tight">
            {item.title}
          </h2>
        </div>
        <div className="absolute left-[85%]">
          <Image
            src={goTo}
            height={25}
            width={25}
            alt="goTo"
            className="ml-2"
          />
        </div>
      </div>
      <p className="text-left text-sm text-gray-600 md:mt-[2rem] mt-3">
        <span className="block md:hidden">{item?.mobileDesc}</span>
        <span className="hidden md:block">{item?.desc}</span>
      </p>
    </div>
  );
}

export default Card;
