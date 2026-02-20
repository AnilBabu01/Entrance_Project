import React from "react";
import { TestList } from "@/utils/contents";
import Image from "next/image";
import { useRouter } from "next/router";
import { ORIGINAL_BASE_URL, BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type Props = {
  courseid: string;
};

function Index({ courseid }: Props) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["getSetting"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-settings`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: oneTest } = useQuery({
    queryKey: ["getOneTest", courseid],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-test-one/${courseid}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: Boolean(courseid),
  });

  return (
    <div className="mainContainer md:px-[7rem] px-[1rem] md:py-[4rem] py-2">
      {TestList?.slice(0, 1)?.map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap md:flex-nowrap justify-between"
        >
          <div className="w-full md:w-1/2">
            <p className="text-[20px] leading-[30px] md:text-[45px] text-[#fff] md:leading-[55px]">
              Take Free {oneTest?.data?.course_name} <br /> Entrance Exam
            </p>
            <div className="flex mt-2 space-x-6">
              <p className="text-[#F5F5F5]">
                <span className="font-bold">{item?.Time}</span>
              </p>
              <p className="text-[#F5F5F5]">
                Question:{" "}
                <span className="font-bold">
                  {oneTest?.data?.chemistry_question &&
                    JSON.parse(oneTest?.data?.chemistry_question).length +
                      JSON.parse(oneTest?.data?.computer_question).length +
                      JSON.parse(oneTest?.data?.english_question).length +
                      JSON.parse(oneTest?.data?.math_question).length +
                      JSON.parse(oneTest?.data?.physics_question).length}
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                router.push(
                  `/take-test/${oneTest?.data?.course_id}/${oneTest?.data?.id}/${oneTest?.data?.category_id}`
                );
              }}
              className="bg-[#fff] mb-2 mt-2 md:mt-4 md:mb-[1rem] text-[#007BB3] text-[16px] rounded-lg p-3 font-bold w-full md:w-auto"
            >
              Start Test
            </button>

            <p className="text-[#ffff] font-bold mb-1">Top Scorer:</p>
            <p className="text-[#F5F5F5]">@ {oneTest?.data?.firstLevel}</p>
            <p className="text-[#F5F5F5]">@ {oneTest?.data?.secondLevel}</p>
            <p className="text-[#F5F5F5]">@ {oneTest?.data?.thirdLevel}</p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
            <Image
              src={`${ORIGINAL_BASE_URL}${data?.data?.entrance_img}`}
              alt="testimage"
              className="rounded-[15px] max-w-full md:w-[35rem]"
              width={300}
              height={400}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Index;
