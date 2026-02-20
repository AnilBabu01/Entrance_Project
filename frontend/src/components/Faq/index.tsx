import React, { useState } from "react";
import downarrow from "../../../public/assets/DownArrow.svg";
import Image from "next/image";

type props = {
  item: {
    question: string;
    ans: string;
  };
};

function Index({ item }: props) {
  const [isAns, setisAns] = useState(false);

  return (
    <>
      <div className="mb-2 border-b-2 pb-2">
        <div className="flex items-center">
          <Image
            onClick={() => setisAns(!isAns)}
            src={downarrow}
            alt="downarrow"
            className={`mr-3 transition-transform duration-300 ${
              isAns ? "rotate-180" : "rotate-0"
            }`}
          />
          <p className="text-black-600">{item?.question}</p>
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isAns ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p>{item?.ans}</p>
        </div>
      </div>
    </>
  );
}

export default Index;
