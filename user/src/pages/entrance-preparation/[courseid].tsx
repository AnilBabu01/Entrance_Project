import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Category from "@/components/Entrance/Category/index";
import Footer from "@/components/Home/Footer/Footer";
import Banner from "@/components/Entrance/Banner/index";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

type itemType = {
  block: boolean;
  category_name: string;
  createdAt: string;
  id: number;
};

function Index() {
  const router = useRouter();
  const { courseid } = router.query;

  const { data } = useQuery({
    queryKey: ["getTestCategory"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-test-cetegory`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <>
      <Head>
        <title>Entrance preparation | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <Banner courseid={courseid as string} />
      <div className="md:pb-16">
        {data &&
          data?.data?.map((item: itemType, index: number) => {
            return (
              <Category
                key={index}
                item={item}
                courseid={courseid as string}
              />
            );
          })}
      </div>
      <Footer />
    </>
  );
}

export default Index;
