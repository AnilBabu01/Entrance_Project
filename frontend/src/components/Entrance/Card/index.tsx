import React from "react";
import Button from "@/components/Common/Button/Index";
import { useRouter } from "next/router";
import { parseTime } from "@/utils/functions";

import { QuizDataItem } from "../../types";

function Index({ item }: QuizDataItem) {
  const router = useRouter();

  console.log("Entrance/Card/index.tsx", item);

  return (
    <div className="border border-[#00000026] m-2 p-3 rounded-[5px] md:w-auto w-[98%]">
      <p className="font-bold text-[18px]">{item?.title}</p>
      <div className="flex justify-between mt-2 mb-2 items-center">
        <p>
          Time :{" "}
          <span className="text-[#007BB3] font-bold">
            {parseTime(item?.time)}
          </span>
        </p>
        <p>
          Question :
          <span className="text-[#007BB3] font-bold">
            {item &&
              item?.chemistry_question &&
              JSON.parse(item?.chemistry_question).length +
                JSON.parse(item?.computer_question).length +
                JSON.parse(item?.english_question).length +
                JSON.parse(item?.math_question).length +
                JSON.parse(item?.physics_question).length}
          </span>
        </p>
      </div>
      <p className="font-bold text-[16px]">Top Scores</p>
      <div className="mt-2">
        <p className="text-[#000026]">@{item?.firstLevel}</p>
        <p className="text-[#000026]">@{item?.secondLevel}</p>
        <p className="text-[#000026]">@{item?.thirdLevel}</p>
      </div>
      <div className="md:w-[7rem] mt-3">
        <Button
          label="Take Test"
          onClick={() => {
            router.push(
              `/take-test/${item?.course_id}/${item?.id}/${item?.category_id}`
            );
          }}
          type="submit"
          isLoading={false}
          style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
        />
      </div>
    </div>
  );
}

export default Index;
