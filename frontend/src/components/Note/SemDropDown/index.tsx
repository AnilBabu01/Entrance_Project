import React from "react";
import Link from "next/link";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

type props = {
  index: number;
  course: string | string[];
  item: {
    id: number;
    sem_name: string;
    subjects: Array<{ id: number; name: string }>;
  };
};

type itemType = {
  id: number;
  subject_name: string;
};

function Index({ item, index, course }: props) {
  const { data } = useQuery({
    queryKey: ["getSubjects", item?.id, course],
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getSubject-by-courseIdAndSem/${course}/${item?.id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log("data is getSem", data?.data);

  return (
    <>
      <div>
        <div className={`${"bg-[#F2F2F2]"}   p-4 rounded-[11px]`}>
          <div className="flex">
            <div
              className={` ${"bg-[#007BB3]"} md:w-[3rem] md:h-[3rem] w-[3rem] h-[3rem] rounded-[11px] flex justify-center items-center mr-3`}
            >
              <p className={`"text-[#ffff]"}`}>{index + 1}</p>
            </div>
            <div className="w-[80%]">
              <p className={` "text-[black]"}`}>{item?.sem_name}</p>
              <div className="flex justify-between w-[100%]">
                <p className={` "text-[black]"}`}>Subjects</p>
              </div>
            </div>
          </div>
          {data &&
            data?.data?.map((it: itemType, index: number) => {
              return (
                <Link
                  key={index}
                  href={`/notes/view/${course}/${it?.subject_name}/${it?.id}`}
                  className="block px-4 py-2 text-sm text-blue-600 underline hover:text-blue-800 "
                >
                  {it?.subject_name}
                </Link>
              );
            })}
        </div>

      </div>
    </>
  );
}

export default Index;
