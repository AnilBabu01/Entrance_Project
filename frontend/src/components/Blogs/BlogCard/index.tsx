import React from "react";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { ORIGINAL_BASE_URL } from "@/utils/config";
import { useRouter } from "next/navigation";
type Props = {
  item: {
    br: string;
    img_url: string;
    title: string;
    description: string;
    created_at: string;
    id:string;
  };
};

const Index = ({ item }: Props) => {

   const router = useRouter();
  
    const handleReadMore = () => {
      router.push(`/view/${encodeURIComponent(item.id)}`); 
    };

  return (
    <div
      style={{ borderColor: item?.br }}
      className="relative border-[1px] bg-[#ffff] rounded-[15px] flex-col w-[100%] md:w-[25rem] md:ml-1 md:mr-1 mb-4 md:mb-0 "
    >
      <Image
        src={`${ORIGINAL_BASE_URL}${item?.img_url}`}
        alt={item?.title}
        width={70}
        height={70}
        className="w-[100%] h-[15rem]  mr-3 rounded-t-[15px]"
      />
      <div className="flex h-[15rem]  items-start justify-between flex-col p-5">
        <div>
          <p className="text-sm text-slate-600">{item?.created_at}</p>
          <p className="font-bold mb-2 mt-2">{item?.title?.slice(0, 50)}...</p>
          <p className="text-sm text-slate-600">
            {item?.description?.slice(0, 80)}...
          </p>
        </div>
        <div className="mt-4">
          <button  onClick={handleReadMore} className="font-bold bg-[#ffff] border border-[#007BB3] flex items-center gap-1 text-[#007BB3] py-3 px-4 rounded-xl hover:bg-[#007BB3] hover:text-white transition duration-200">
            Read More <GoArrowRight className="text-xl font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
