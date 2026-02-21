import React, { useState } from "react";

type Props = {
  index: number;
  item: {
    id?: number;
    q: string;
    ans1: string;
    ans2: string;
    ans3: string;
    ans4: string;
    checked: boolean;
    answered?: string;
   
  };
  currectIndex: number;
  showResult?:boolean
  onAnswerChange: (index: number, checked: boolean, answered: string) => void;
};


function Index({ index, currectIndex,item, showResult,onAnswerChange }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleChange = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswerChange(currectIndex, true,answer);

    console.log("answer is answer", answer);
  };


  return (
    <div className="mb-4">
      <p className="mb-2">
        <span className="font-bold">QN {index + 1}:- </span>
        {item.q}
      </p>
      <div className="flex mb-2">
        <input
          type="radio"
          name={`question-${index}`}
          checked={selectedAnswer === item.ans1}
          onChange={() => handleChange(item.ans1)}
          className="mr-2 border-[#007BB3] focus:ring-blue-500"
          disabled={showResult}
        />
        {item.ans1}
      </div>
      <div className="flex mb-2">
        <input
          type="radio"
          name={`question-${index}`}
          checked={selectedAnswer === item.ans2}
          onChange={() => handleChange(item.ans2)}
          className="mr-2 border-[#007BB3] focus:ring-blue-500"
          disabled={showResult}
        />
        {item.ans2}
      </div>
      <div className="flex mb-2">
        <input
          type="radio"
          name={`question-${index}`}
          checked={selectedAnswer === item.ans3}
          onChange={() => handleChange(item.ans3)}
          className="mr-2 border-[#007BB3] focus:ring-blue-500"
          disabled={showResult}
        />
        {item.ans3}
      </div>
      <div className="flex mb-2">
        <input
          type="radio"
          name={`question-${index}`}
          checked={selectedAnswer === item.ans4}
          onChange={() => handleChange(item.ans4)}
          className="mr-2 border-[#007BB3] focus:ring-blue-500"
          disabled={showResult}
        />
        {item.ans4}
      </div>
    </div>
  );
}

export default Index;
