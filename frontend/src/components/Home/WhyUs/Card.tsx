import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";

 type  props={
  item:{
    br?:string,
    icon: string | StaticImageData;
    title:string
  }
}

const Card = ({ item }: props) => {
  return (
    <div
      style={{ borderColor: item?.br }}
      className="relative border-[1px] p-4  rounded-lg flex justify-center items-center flex-col  w-[20rem] md:w-[230px] h-[230px]"
    >
      <Image src={item?.icon} alt='imageIcon' />
      <p className="text-center text-[22px] font-bold mt-2">{item?.title}</p>
    </div>
  );
};


export default Card;
