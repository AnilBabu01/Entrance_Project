import React, { useState, useRef } from "react";
import Card from "../Card/index";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { QuizData } from "../../types";

type Props = {
  item: {
    id: number;
    category_name: string;
  };
  courseid?: string;
};

function Index({ item, courseid }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const [page, setPage] = useState(1);
  const limit = 5; // Set items per page

  // Fetch data with pagination
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ["getAllTest", item?.id, courseid, page],
    queryFn: async () => {
      if (!item?.id || !courseid) return null;
      const response = await fetch(
        `${BASE_URL}/get-test/${item.id}/${courseid}?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!item?.id && !!courseid,
  });

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (data?.pagination?.totalPages && page < data.pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(4, data?.data?.length || 1),
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: Math.min(2, data?.data?.length || 1) },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  

  console.log("data  is data",data);

  return (
    <div className="md:pl-[7rem] md:pr-[7rem] pl-[1rem] pr-[1rem] ">
      <div className="flex justify-between mt-5 mb-4">
        <div className="hidden sm:block" />
        <p className="text-center text-[20px] md:text-[35px] md:mt-[2rem] md:mb-[1rem]">
          <span className="text-[#007BB3] font-bold">
            {item?.category_name?.split(" ")[0]}
          </span>{" "}
          {item?.category_name?.split(" ").slice(1).join(" ")}
        </p>
        <div className="flex items-center md:pt-[2rem]">
          <FaArrowLeft
            onClick={handlePrev}
            className={`mr-7 cursor-pointer ${
              page === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          <FaArrowRight
            onClick={handleNext}
            className={`cursor-pointer ${
              data?.pagination?.totalPages && page >= data.pagination.totalPages
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          />
        </div>
      </div>
      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {data?.data?.map((test: QuizData, index: number) => (
            <Card key={index} item={test} />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Index;
