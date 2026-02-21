import React from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { ORIGINAL_BASE_URL } from "@/utils/config";
import { useRouter } from "next/navigation";

type props = {
  item: {
    cardtitle: string;
    br: string;
    img_url: string;
    title: string;
    description: string;
    id: string;
  };
};

const Card = ({ item }: props) => {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/view/${encodeURIComponent(item.id)}`); 
  };

  return (
    <div
      style={{ borderColor: item?.br }}
      className="relative border-[1px] bg-[#f2f2f2]  rounded-[15px] flex-col w-[100%] md:w-[27rem] md:ml-3 md:mr-3 mb-4 md:mb-0 "
    >
      <Image
        src={`${ORIGINAL_BASE_URL}${item?.img_url}`}
        alt={item?.title}
        width={70}
        height={70}
        className="w-[100%] md:h-[15rem] h-[12rem] mr-3 rounded-tl-[15px] rounded-tr-[15px]"
      />
      <div className="flex md:h-[15rem] h-[12rem] items-start flex-col p-5 justify-between ">
        <div>
          <p className="font-bold md:text-[25px] text-[16px] mb-2">{item?.title?.slice(0,50)}</p>
          <p className="text-sm text-slate-600">{item?.description?.slice(0,80)}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={handleReadMore}
            className="font-bold bg-[#ffff] border border-[#007BB3] flex items-center gap-1 text-[#007BB3] py-3 px-4 rounded-xl hover:bg-[#007BB3] hover:text-white transition duration-200"
          >
            Read More <GoArrowRight className="text-xl font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
