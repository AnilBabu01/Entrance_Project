import React from "react";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type ArticleType = {
  cardtitle: string;
  br: string;
  img_url: string;
  title: string;
  description: string;
  id: string;
};

const chunkArray = (arr: ArticleType[], size: number) => {
  return arr.reduce((acc: ArticleType[][], _, index) => {
    if (index % size === 0) acc.push(arr.slice(index, index + size));
    return acc;
  }, []);
};

const LatestArticle = () => {
  const { data } = useQuery({
    queryKey: ["getLatestBlogs"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-blogs/1?page=1&limit=5`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const articles: ArticleType[] = data?.data || [];
  const gridSize = 3;
  const articleChunks = chunkArray(articles, gridSize);

  const settings = {
    dots: true,
    infinite: articleChunks.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
  };

  return (
    <div className="px-6 md:px-20 md:pt-12 pb-14">
      <p className="text-center text-[20px] md:text-[50px]">
        <span className="font-semibold text-[#007BB3]">Latest</span> Articles
      </p>
      <p className="text-center mb-8 mt-2 text-gray-600">
        Explore our recent blog posts offering valuable insights, tips and
        trend.
      </p>

      {articles?.length > 0 ? (
        <Slider {...settings}>
          {articleChunks?.map((chunk, index) => (
            <div key={index} style={{ width: "auto", display: "block" }}>
              <div className="md:flex flex-row">
                {chunk.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-gray-500">No articles available</p>
      )}
    </div>
  );
};

export default LatestArticle;
