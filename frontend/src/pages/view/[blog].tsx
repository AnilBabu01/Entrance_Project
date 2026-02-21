import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

function Index() {
  const router = useRouter();
  const { blog } = router.query;

  const { data } = useQuery({
    queryKey: [`GetBlogById?${blog}`, blog],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/GetBlogById/${blog}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!blog,
  });

  return (
    <>
      <Head>
        <title> Read blog | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title={`${data?.data?.title}`} />
      <div className="md:p-8 p-3">
        <div dangerouslySetInnerHTML={{ __html: data?.data?.blog ?? "" }} />
      </div>
    </>
  );
}

export default Index;
