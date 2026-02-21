import Image from "next/image";
import { StaticImageData } from "next/image";
import { ORIGINAL_BASE_URL } from "@/utils/config";
interface Props {
  item: {
    br?: string;
    profile_url: string | StaticImageData;
    name: string;
    course: string;
    review: string;
  };
}

const Card: React.FC<Props> = ({ item }) => {
  return (
    <div
      style={{ borderColor: item.br || "defaultColor" }} // Provide a fallback value for 'br'
      className="relative border-[1px] bg-[#f2f2f2] md:p-8 p-2 rounded-[15px] flex-col w-[100%] md:w-[97%] h-[250px]"
    >
      <div className="flex items-center">
        <Image
          src={`${ORIGINAL_BASE_URL}${item.profile_url}`}
          alt="profile"
          width={70}
          height={70}
          className="w-[70px] h-[70px] mr-3 rounded-full"
        />
        <div>
          <p className="text-[#007BB3] font-bold">{item.name}</p>
          <p className="">{item.course}</p>
        </div>
      </div>
      <p className="mt-2">{item?.review}</p>
    </div>
  );
};

export default Card;
