import { motion, useInView } from "framer-motion";
import Image from "next/image";
import frame from "../../../../public/assets/offer1.svg";
import tech from "../../../../public/assets/offer2.svg";
import career from "../../../../public/assets/offer3.svg";
import Group from "../../../../public/assets/offer4.svg";
import facebook from "../../../../public/assets/facebook.svg";
import insta from "../../../../public/assets/insta.svg";
import youtuube from "../../../../public/assets/youtuube.svg";
import limkdlen from "../../../../public/assets/limkdlen.svg";
import { useRef } from "react";

import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

const Mission = () => {
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

  const { data: isMission } = useQuery({
    queryKey: ["getMission"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/getmission`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log("isMission  is isMission", data);

  const cardData = [
    {
      icon: frame,
      title: "Career Guidance",
      text: "Lorem ipsum dollor sit amet, odio pellentesque libero.",
    },
    {
      icon: tech,
      title: "Skill Development",
      text: "Lorem ipsum dollor sit amet, odio pellentesque libero.",
    },
    {
      icon: career,
      title: "Learning Resources",
      text: "Lorem ipsum dollor sit amet, odio pellentesque libero.",
    },
    {
      icon: Group,
      title: "Tech Awareness",
      text: "Lorem ipsum dollor sit amet, odio pellentesque libero.",
    },
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true }); // Trigger animation only once when in view

  // Variants for cards animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="md:p-14 pt-3 md:pt-14">
      <div>
        <p className="text-center text-[25px] md:text-[45px]">
          <span className="font-semibold text-[#007BB3]">What</span> We Offer ?
        </p>
        <p className="text-center mb-8 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a
          turpis neque.
        </p>
        <motion.div
          ref={containerRef}
          className="md:flex md:justify-between md:pr-12 md:pl-12 pr-4 pl-4 items-center "
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.2 }}
        >
          {cardData.map((card, index) => (
            <motion.div
              key={index}
              className="w-[100%] md:w-[19rem] mb-5 md:mb-20 h-[17rem] p-6 border border-[#007BB3] rounded-lg shadow-lg flex items-center flex-col justify-center"
              variants={cardVariants}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#007BB3] rounded-lg p-4 mb-3">
                <Image src={card.icon} alt="icon" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-center">{card.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="md:flex justify-between items-center  w-full pl-4 pr-4 md:pl-11 md:pr-11 md:mb-8 ">
        {isMission?.data?.map((item, index) => {
          return (
            <div key={index} className="w-[100%] md:w-[49%] rounded-lg bg-[#F2F2F2] border border-[#007BB3]">
              <div className="p-4">
                {/* <p className="text-3xl gap-2 flex my-4">{item?.title}</p> */}
                <p className="text-center text-[20px] md:text-[35px] gap-2 flex my-4">
                  <span className="text-[#007BB3] font-bold">
                    {item?.title?.split(" ")[0]}
                  </span>{" "}
                  {item?.title?.split(" ").slice(1).join(" ")}
                </p>
                <p className="text-sm">{item?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {data?.data?.hideTextStatus && (
        <div className="w-full pl-4 pr-4 md:pl-11 md:pr-11 mt-2">
          <div className="md:p-12 p-4 md:w-full w-[100%] border border-gray-300">
            <div
              dangerouslySetInnerHTML={{ __html: data?.data?.hideText ?? "" }}
            />
          </div>
        </div>
      )}

      {/* Follow Us section */}
      <div className="flex justify-evenly items-center md:p-12 p-4 md:w-full  w-[100%]">
        <div className="bg-[#F2F2F2] md:p-10 p-5 rounded-lg shadow-lg w-full text-center">
          <p className="text-center text-[25px] md:text-[45px]">
            <span className="font-semibold text-[#007BB3]">Follow</span> Us
          </p>
          <div
            style={{ color: "black", marginBottom: "15px" }}
            dangerouslySetInnerHTML={{ __html: data?.data?.follow_us ?? "" }}
          />
          <ul className="flex gap-8 justify-center">
            <li className="text-3xl">
              <a
                href={data?.data?.facebook_profile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={facebook} alt="facebook" />
              </a>
            </li>
            <li className="text-3xl">
              <a
                href={data?.data?.instagram_Profile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={insta} alt="instagram" />
              </a>
            </li>
            <li className="text-3xl">
              <a
                href={data?.data?.youtube_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={youtuube} alt="youtuube" />
              </a>
            </li>
            <li className="text-3xl">
              <a
                href={data?.data?.linkedln_Profile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={limkdlen} alt="limkdlen" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Mission;
