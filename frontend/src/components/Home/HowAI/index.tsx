import React from "react";
import { motion, useInView } from "framer-motion";
import { howAidata } from "@/utils/contents";
import Card from "./Card";

type HowAIItem = {
  br: string;
  arrow: string;
  icon: string;
  title: string;
  desc: string;
  description: string;
};

const Index = () => {
  const ref = React.useRef(null);

  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[8%] pt-[2rem]">
      <p className="text-center text-[20px] md:text-[50px]">
        <span className="font-semibold text-[#007BB3]">How AI</span> Counseling
        Works?
      </p>
      <p className="text-center mb-8 mt-2">
        Our AI-powered career counseling process is designed to help you
        discover the best career path based on your interests, skills, and
        preferences. By answering a few simple questions, you&aposll receive
        personalized recommendations to guide your career decisions.
      </p>
      <div
        ref={ref}
        className="flex md:justify-between justify-center gap-3 items-center md:flex-row flex-col flex-wrap"
      >
        {howAidata?.map((item: HowAIItem, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card item={item} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Index;
