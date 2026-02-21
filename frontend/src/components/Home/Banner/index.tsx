import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ORIGINAL_BASE_URL, BASE_URL } from "@/utils/config";
import { useRouter } from "next/navigation";

const Index = () => {
  const router = useRouter();
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

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <div className="mainContainer md:pl-[7rem] md:pr-[7rem] pl-[3px] pr-[3px] pt-[4%] md:pb-[5%]">
      <div className="md:flex">
        <motion.div
          className="w-[100%] md:w-[50%] md:pt-5  pl-5 pt-5 pr-5"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <p className="font-[300] text-[25px] md:text-[50px] text-[#fff] leading-[1]">
            Get Career <span className="font-semibold">Counseling</span>
          </p>
          <p className="font-light text-[25px] md:text-[50px] text-[#fff] leading-[1.3]">
            <span className="font-semibold">from</span> our   AI Assistant
          </p>
          {/* <p className="font-light text-[25px] md:text-[50px] text-[#fff] leading-[1]">
            AI Assistant
          </p> */}
          <p className="text-[#fff] text-[16px] md:text-[25px] mt-6">
            Get personalized career guidance powered by advanced
            <br /> AI technology
          </p>
          <motion.button
            className="bg-[#fff] mt-[3rem]  md:mb-[7rem] text-[#007BB3] text-[16px] rounded-lg pt-2 pb-2 pl-4 pr-4"
            variants={buttonVariants}
            onClick={() => router.push("/start-ai-counseling")}
            style={{fontWeight:'700'}}
          >
            Start AI Counseling
          </motion.button>
        </motion.div>
        <motion.div
          className="w-full md:w-1/2 md:h-auto mt-5 md:p-0 p-4 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            className="rounded-lg w-full max-w-[500px] md:max-w-[80%] h-auto object-cover"
            src={`${ORIGINAL_BASE_URL}${data?.data?.home_screen_img}`}
            alt="banner3dd"
            width={500}
            height={500}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
