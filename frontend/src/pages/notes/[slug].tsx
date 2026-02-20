import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import { useRouter } from "next/router";
import SemDropDown from "@/components/Note/SemDropDown/index";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type item = {
  id: number;
  sem_name: string;
  subjects: Array<{ id: number; name: string }>;
};

function Index() {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useQuery({
    queryKey: ["getSem", slug],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/getSem-by-courseId/${slug}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isCourse } = useQuery({
    queryKey: ["getCourseByID", data?.data?.[0]?.course_id],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/get-course-by-id/${data?.data?.[0]?.course_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log("from notes course list data?.data?.[0]?.course_id",data?.data?.[0]?.course_id)

  return (
    <>
      <Head>
        <title>{isCourse?.data[0]?.course_name} notes | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title={`${isCourse?.data[0]?.course_name} notes`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 px-4 md:px-[7rem] md:pt-[3rem]">
        {data &&
          data?.data?.map((item: item, index: number) => {
            return (
              <SemDropDown
                key={index}
                item={item}
                index={index}
                course={slug}
              />
            );
          })}
      </div>
    </>
  );
}

export default Index;
