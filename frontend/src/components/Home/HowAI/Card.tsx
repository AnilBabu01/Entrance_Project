import React from "react";
import Image from "next/image";

type props ={
  item:{
    br:string,
    icon:string,
    title:string,
    desc:string,
    arrow:string
  }
}

const Card = ({ item }: props) => {
  return (
    <div
      style={{ borderColor: item?.br }}
      className="relative border-[1px] p-4 rounded-lg flex justify-center items-center flex-col w-[20rem] md:w-[280px] h-[250px]"
    >
      <Image src={item?.icon} alt={item?.icon} />
      <p className="text-center">{item?.title}</p>
      <p className="text-center">{item?.desc}</p>
      <div className="absolute right-[-36px] top-1/2 transform -translate-y-1/2 hidden md:block">
        <Image src={item?.arrow} alt={item?.arrow} className="" />
      </div>
    </div>
  );
};

export default Card;
