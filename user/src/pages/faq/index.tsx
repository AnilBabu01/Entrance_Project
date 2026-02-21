import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import Sms from "../../../public/assets/sms.svg";
import Image from "next/image";
import Faq from "@/components/Faq/index";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type faqItem = {
  question: string;
  ans: string;
};

function Index() {
  const { data } = useQuery({
    queryKey: ["getFaq"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-faq`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <>
      <Head>
        <title>Faq | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="FAQ" />
      <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[3rem] pl-[1rem] pr-[1rem] pt-[1rem]">
        <p className="font-bold text-[25px] leading-[30px] md:text-[50px] md:leading-[60px]">
          Freequently Asked <br /> Questions
        </p>
        <div className="md:flex justify-between">
          <div className="w-[100%] md:w-[30%]">
            <p className="text-slate-600 mt-2">
              can’t find what you are looking for?
            </p>
            <p className="text-black mt-2">We would like to chat with you</p>
            <Image src={Sms} alt="Sms" className="w-[3rem] mt-3" />
          </div>
          <div className="w-[100%] md:w-[70%] mt-3 md:mt-0">
            {data &&
              data?.data?.map((item: faqItem, index: number) => {
                return <Faq key={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
