"use client";

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
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 0.5 },
    },
  };

  return (
    <div className="mainContainer md:px-[7rem] px-[10px] pt-[4%] md:pb-[5%]">
      <div className="md:flex items-center">
        
        {/* LEFT TEXT */}
        <motion.div
          className="w-full md:w-1/2 md:pt-5 p-5"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          <p className="font-[300] text-[28px] md:text-[50px] text-white leading-tight">
            Get Career <span className="font-semibold">Counseling</span>
          </p>

          <p className="font-light text-[28px] md:text-[50px] text-white leading-tight">
            <span className="font-semibold">from</span> our AI Assistant
          </p>

          <p className="text-white text-[16px] md:text-[22px] mt-6">
            Get personalized career guidance powered by advanced AI technology
          </p>

          <motion.button
            className="bg-white mt-[2rem] md:mt-[3rem] text-[#007BB3] text-[16px] rounded-lg px-4 py-2 font-bold"
            variants={buttonVariants}
            onClick={() => router.push("/start-ai-counseling")}
          >
            Start AI Counseling
          </motion.button>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          className="w-full md:w-1/2 mt-5 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="relative w-full max-w-[500px] h-[300px] md:h-[400px]">
            <Image
              src={`${ORIGINAL_BASE_URL}${data?.data?.home_screen_img}`}
              alt="banner"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;