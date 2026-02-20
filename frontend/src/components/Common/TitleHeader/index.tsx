import React from "react";
import Image from "next/image";
import titleBgImg from "../../../../public/assets/titleBgImmg.svg";

type props = {
  title?: string;
};

function Index({ title }: props) {
  return (
    <>
      <div className="relative w-full">
        <Image
          src={titleBgImg}
          alt="titleBgImg"
          layout="responsive"
          objectFit="cover"
          className="w-full"
        />
        <div className="absolute inset-0 flex items-center">
          <p className="text-white text-2xl font-bold  md:ml-[7rem] ml-[1rem] z-10">
            {title}
          </p>
        </div>
        <div className="absolute inset-0 bg-custom-title-gradient bg-opacity-50"></div>
      </div>
    </>
  );
}

export default Index;
