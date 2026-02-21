import React, { useRef } from "react";
import Blogcard from "../BlogCard/index";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type Props = {
  item: {
    block: boolean;
    category_name: string;
    createdAt: string;
    id: string;
  };
};

type ArticleType = {
  br: string;
  img_url: string;
  title: string;
  description: string;
  created_at: string;
  id: string;
};

function Index({ item }: Props) {
  const sliderRef = useRef<Slider | null>(null);

  const { data, isFetching, isLoading } = useQuery({
    queryKey: [`getAllBlogsByCategory-${item?.id}`],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-blogs/${item?.id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: Boolean(item?.id),
  });

  const articles: ArticleType[] = data?.data || [];

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  const settings = {
    dots: false,
    infinite: articles.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    arrows: false, // We're using custom arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!item?.id) return null;

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-[30px] font-bold mt-[4rem] mb-[2rem]">
          {item?.category_name}
        </p>
        <div className="flex items-center pt-8">
          <FaArrowLeft
            onClick={handlePrev}
            className="mr-7 cursor-pointer hover:opacity-80 transition-opacity"
          />
          <FaArrowRight
            onClick={handleNext}
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <p>Loading...</p>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {articles.map((article) => (
            <div key={article.id}>
              <Blogcard item={article} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

export default Index;
