import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import { FaSearch } from "react-icons/fa";
import Footer from "@/components/Home/Footer/Footer";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/Home/LatestArticle/Card";

type ArticleType = {
  cardtitle: string;
  br: string;
  img_url: string;
  title: string;
  description: string;
  id: string;
};

function Index() {
  const [searchValue, setSearchValue] = useState("");

  const { data } = useQuery({
    queryKey: ["searchBlog", searchValue],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/search-blog/${searchValue}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log("sss", data?.data);

  return (
    <>
      <Head>
        <title>Blogs | Study IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="Blogs" />
      <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[5rem] pl-[1rem] pr-[1rem] pt-[1rem] pb-6  bg-[#f2f2f2]">
        <div className="md:flex justify-between mb-7 md:mb-0">
          <p className="text-[25px] md:text-[30px] font-bold mb-8">
            Read our Latest Blog{" "}
          </p>
          <div className="border border-[#007BB3] flex justify-between items-center pl-4 pr-4 pb-2 pt-2 rounded-[10px] md:h-[3rem]">
            <input
              className="outline-none text-[#007BB3] placeholder-[#007BB3] bg-[#f2f2f2]"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FaSearch color="#007BB3" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data &&
            data?.data?.map((item: ArticleType, index: number) => (
              <div key={index}>
                <Card item={item} />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
