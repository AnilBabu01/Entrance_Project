import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import Card from "@/components/AiCom/Card";
import Image from "next/image";
import goSearch from "../../../public/assets/goSearch.svg";
import ChatingScreen from "@/components/ChatingScreen";

export type StaticItem = {
  title: string;
  desc: string;
  mobileDesc: string;
};

const staticData: StaticItem[] = [
  {
    title: "IT Course Information",
    desc: "Learn about IT courses in Nepal, including key details like duration, eligibility, and career options.",
    mobileDesc: "Learn about different IT courses in Nepal.",
  },
  {
    title: "University Selection",
    desc: "Discover universities offering IT programs and their admission criteria to find the best fit for you.",
    mobileDesc: "Discover universities offering IT programs.",
  },
  {
    title: "Subject Breakdown",
    desc: "Understand different IT subjects, and how they relate to your career.",
    mobileDesc: "Understand different IT subjects with career options.",
  },
  {
    title: "Admission Process",
    desc: "Get guidance on the admission process, from entrance exams to application deadlines.",
    mobileDesc: "Get guidance on the admission process.",
  },
];

const Index = () => {

  const [chating, setchating] = useState(false);

  return (
    <>
      <Head>
        <title>Notes | Study IT Nepal</title>
      </Head>

      {/* <div className="hidden sm:block"> */}
        <Navbar />
      {/* </div> */}
      {!chating && (
        <div className="hidden sm:block">
          <TitleHeader />
        </div>
      )}

      {!chating ? (
        <div className="flex justify-center items-center md:pl-0 pl-4 md:pr-0 pr-4">
          <div className="flex flex-col items-center text-center">
            <div className="md:w-[27rem] w-[80%] mb-[3rem] mt-[3rem]">
              <p className="text-[#007BB3] font-poppins font-medium md:text-[38px] text-[24px] leading-[100%] tracking-[0%]">
                AI Career Guidance
              </p>
              <p className="text-[#333333] md:text-[20px] text-[14px] mt-3">
                <span className="block md:hidden">
                  Find details on programs, courses, and what each subject
                  covers to help you make informed decisions.
                </span>
                <span className="hidden md:block">
                  Get information about universities, IT courses, and subjects
                  in Nepal. Find details on programs, courses, and what each
                  subject covers to help you make informed decisions.
                </span>
              </p>
            </div>
            <div className="w-full max-w-[1200px]">
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {staticData?.map((item: StaticItem, index: number) => (
                  <Card key={index} item={item} />
                ))}
              </div>
            </div>

            <div className="fixed bottom-0 w-full flex justify-center p-4 bg-white shadow-md">
              <span className="block md:hidden w-full max-w-[500px]">
                <div
                  onClick={() => setchating(true)}
                  className="p-2 w-full flex justify-between items-center border border-[#E6E6E6] rounded-[100px] bg-[#8C8C8C1A]"
                >
                  <p className="text-[19px] ml-6">
                    How can we assist you today?
                  </p>
                  <div className="bg-[#007BB3] p-4 rounded-[100px]">
                    <Image
                      src={goSearch}
                      height={15}
                      width={15}
                      alt="goSearch"
                    />
                  </div>
                </div>
              </span>
            </div>

            <span className="hidden md:block w-full">
              <div className=" w-full  flex justify-center mb-[4%] mt-[10%]">
                <div
                  onClick={() => setchating(true)}
                  className="p-2 md:w-[100%] w-[100%] flex justify-between items-center border border-[#E6E6E6] rounded-[100px] bg-[#8C8C8C1A]"
                >
                  <p className="text-[19px] ml-6">
                    How can we assist you today?
                  </p>
                  <div className="bg-[#007BB3] p-4 rounded-[100px]">
                    <Image
                      src={goSearch}
                      height={15}
                      width={15}
                      alt="goSearch"
                    />
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      ) : (
        <>
          <ChatingScreen />
        </>
      )}
    </>
  );
};

export default Index;
