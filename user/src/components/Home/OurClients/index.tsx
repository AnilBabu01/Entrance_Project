import React from "react";
import { StaticImageData } from "next/image";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type itemProps = {
  br?: string;
  profile_url: string | StaticImageData;
  name: string;
  course: string;
  review: string;
};

const Index = () => {
  const { data } = useQuery({
    queryKey: ["getClientData"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-what-say-client`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="px-6 md:px-20 pt-12 pb-14">
      <p className="text-center text-[20px]  md:text-[50px]">
        <span className="font-semibold text-[#007BB3]">What </span>
        IT Professionals Say
      </p>
      <p className="text-center mb-8 mt-2 text-gray-600">
        Hear from tech professionals on the value of StudyITNepal and how it can
        guide aspiring IT students towards success
      </p>

      <Slider {...settings}>
        {data &&
          data?.data?.map((item: itemProps, index: number) => {
            return <Card key={index} item={item} />;
          })}
      </Slider>
    </div>
  );
};

export default Index;
