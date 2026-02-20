import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import BlogCategory from "@/components/Blogs/BlogCategory/index";
import Footer from "@/components/Home/Footer/Footer";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { GoArrowRight } from "react-icons/go";
import { useRouter } from "next/router";
import { dateToMonthName } from "@/utils/functions";
type blog = {
  block: boolean;
  category_name: string;
  createdAt: string;
  id: string;
};

function Index() {
  const router = useRouter();

  const handleReadMore = () => {
    router.push(`/view/${encodeURIComponent(data?.data[0]?.id)}`);
  };

  const { data } = useQuery({
    queryKey: ["getOneBlog"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-blogs/1?page=1&limit=1`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });
  

  const { data: blogCategory } = useQuery({
    queryKey: ["getBlogCategory"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-blog-category`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <>
      <Head>
        <title>Blogs | Study IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="Blogs" />
      <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[5rem] pl-[1rem] pr-[1rem] pt-[1rem] pb-6  bg-[#f2f2f2]">
        <div className="md:flex justify-between">
          <p className="text-[25px] md:text-[30px] font-bold mb-4">
            Read our Latest Blog{" "}
          </p>
          <div
            onClick={() => router.push("/search-blog")}
            className="border border-[#007BB3] flex justify-between items-center pl-4 pr-4 pb-2 pt-2 rounded-[10px] md:h-[3rem]"
          >
            <input
              className="outline-none text-[#007BB3] placeholder-[#007BB3] bg-[#f2f2f2]"
              type="text"
              placeholder="Search"
            />
            <FaSearch color="#007BB3" />
          </div>
        </div>
        <div className="w-full md:flex justify-between items-center md:mt-[3rem] mt-[1rem]">
          <div className="md:w-[50%] w-[100%] pr-5">
            {data?.data?.length > 0 ? (
              <>
                <p className="text-[#333333CC] text-[16px]">
                  {dateToMonthName(data?.data[0]?.createdAt)}
                </p>
                <p className="text-[black] font-semibold text-[30px] mb-4 mt-3">
                  {data?.data[0]?.title?.slice(0, 50)}
                </p>
                <p className="text-[#333333CC] text-[18px]">
                  {data?.data[0]?.description?.slice(0, 500)}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
            <div className="w-[10rem] mt-3">
              <button
                onClick={handleReadMore}
                className="font-bold bg-[#ffff] border border-[#007BB3] flex items-center gap-1 text-[#007BB3] py-3 px-4 rounded-xl hover:bg-[#007BB3] hover:text-white transition duration-200"
              >
                Read More <GoArrowRight className="text-xl font-bold" />
              </button>
            </div>
          </div>
          <div className="w-[100%] md:w-[50%] mt-4">
            <Image
              src={
                data?.data[0]?.img_url
                  ? `${ORIGINAL_BASE_URL}${data?.data[0]?.img_url}`
                  : "/fallback.jpg"
              }
              alt="image"
              width={400}
              height={400}
              className="rounded-[10px] w-full"
            />
          </div>
        </div>

        {blogCategory?.data?.map((item: blog, index: number) => {
          return <BlogCategory item={item} key={index} />;
        })}
      </div>
      <Footer />
    </>
  );
}

export default Index;
