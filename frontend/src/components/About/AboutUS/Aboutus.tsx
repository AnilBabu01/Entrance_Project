import { motion } from "framer-motion";
import Image from "next/image";
// import Chatbot from "../../../../public/assets/Chatbot.png";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

const Aboutus = () => {
  const { data } = useQuery({
    queryKey: ["getSetting"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-settings`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <motion.div
      className=" flex items-center justify-center bg-[#00A5E9] md:pr-28 md:pl-28 pb-2 pt-2 md:pb-0 md:pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="md:flex justify-between items-center pl-3 pr-3 md:pl-0 md:pr-0 mt-[4rem] mb-[4rem]">
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-[20px] md:text-[35px] font-bold text-white md:mb-4 mb-2 text-left ">
            About Us
          </h1>
          <div
            style={{ color: "#fff" }}
            dangerouslySetInnerHTML={{ __html: data?.data?.about_us ?? "" }}
          />
        </motion.div>
        <motion.div
          className="flex justify-center pl-3 pr-3 mt-5 md:pl-0 md:pr-0 md:mt-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Image
            src={`${ORIGINAL_BASE_URL}${data?.data?.about_img}`}
            alt="chatbot"
            width={300}
            height={300}
            className="rounded-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Aboutus;
