import React from "react";
import { motion, useInView } from "framer-motion";
import { whyUsdata } from "@/utils/contents";
import Card from "./Card";
import { StaticImageData } from "next/image";

type whyItme = {
  br?: string;
  icon: string | StaticImageData;
  title: string;
};

const Index = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <div className="whyBgImage bg-[#f2f2f2] md:pl-[7rem] md:pr-[7rem] pt-[4%] pb-[6%] mt-[5%] relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[#fbfbfb] opacity-50 z-[0]" />
      <p className="text-center text-[20px] md:text-[50px] relative z-[1]">
        <span className="font-semibold text-[#007BB3]">Why</span> Us?
      </p>
      <p className="text-center mb-8 mt-2 relative z-[1]">
        We are the one-stop solution for IT and computer science students in
        Nepal—whether you&apos;re studying, planning to study, or exploring career
        options.
      </p>
      <div
        ref={ref}
        className="flex justify-between gap-3 items-center relative z-[1] md:flex-row flex-col flex-wrap"
      >
        {whyUsdata?.map((item: whyItme, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card key={index} item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;
