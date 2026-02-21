import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TitleHeader from "@/components/Common/TitleHeader/index";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import Questioncard from "@/components/Entrance/QuestionCard/index";
import Image from "next/image";
import checked from "../../../../../public/assets/checked.svg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useTimer } from "@/utils/functions";
import { BASE_URL } from "@/utils/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import ResultIcon from "../../../../../public/assets/result.png";
import { toast } from "react-toastify";
import axios from "axios";

type DataType = {
  id?: number;
  title?: string;
  [key: string]: unknown;
};

type QuestionType = {
  id?: number;
  q: string;
  ans1: string;
  ans2: string;
  ans3: string;
  ans4: string;
  checked: boolean;
};

const btn = ["Physics", "Math", "Chemistry", "English", "Computer"];

function Id() {
  const router = useRouter();
  const { title, id, categoryid } = router.query;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState<Array<DataType>>([]);
  const [questionData, setQuestionData] = useState({});
  const [startedTest, setstartedTest] = useState(false);
  const [passTime, setpassTime] = useState("00:00:10");
  const [selectedSubject, setSelectedSubject] = useState(btn[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResult, setshowResult] = useState<boolean>(false);
  const itemsPerPage = 5;

  const { data: singleTest } = useQuery({
    queryKey: ["getSingleTest", title, id, categoryid],
    queryFn: async () => {
      if (!id && !title && !categoryid) return null;
      const response = await fetch(
        `${BASE_URL}/get-single-test/${categoryid}/${id}/${title}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!id && !!title && !!categoryid,
  });

  useEffect(() => {
    if (singleTest) {
      setpassTime(`${singleTest?.data?.time}:00`);
    }
  }, [singleTest]);

  useEffect(() => {
    if (passTime) {
      setTimeout(() => {
        setstartedTest(true);
      }, 500);
    }
  }, [passTime]);

  const { time, isTimeOver } = useTimer(passTime);

  useEffect(() => {
    if (isTimeOver && startedTest) {
      setIsModalOpen(isTimeOver);
    }
  }, [isTimeOver, startedTest]);

  const updateResultMutation = useMutation({
    mutationFn: async (resultData: {
      category_id: string;
      course_id: string;
      test_id: string;
      title: string;
      physics_question: string;
      math_question: string;
      chemistry_question: string;
      english_question: string;
      computer_question: string;
      marksPerQuestion: string;
      time: string;
    }) => {
      const token = localStorage.getItem("studyItToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(`${BASE_URL}/result`, resultData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.msg);

        setIsModalOpen(false);
        setshowResult(true);
        if (data?.data) {
          const questionData = {
            Math: JSON.parse(data?.data?.math_question),
            Physics: JSON.parse(data?.data?.physics_question),
            Chemistry: JSON.parse(data?.data?.chemistry_question),
            English: JSON.parse(data?.data?.english_question),
            Computer: JSON.parse(data?.data?.computer_question),
          };

          setQuestionData(questionData);

          console.log("sdf", questionData);
        }

        setTimeout(() => {
          // router.push("/");
          // router.back();
        }, 500);
      } else {
        toast.error(data?.msg);
        setIsModalOpen(false);
      }
    },
  });

  console.log("ss", showResult);

  const handleUpdateResult = () => {
    updateResultMutation.mutate({
      category_id: singleTest?.data?.category_id,
      course_id: singleTest?.data?.course_id,
      test_id: singleTest?.data?.id,
      title: singleTest?.data?.title,
      physics_question: JSON.stringify(questionData["Physics"]),
      math_question: JSON.stringify(questionData["Math"]),
      chemistry_question: JSON.stringify(questionData["Chemistry"]),
      english_question: JSON.stringify(questionData["English"]),
      computer_question: JSON.stringify(questionData["Computer"]),
      marksPerQuestion: singleTest?.data?.title,
      time: singleTest?.data?.time,
    });
  };

  useEffect(() => {
    if (singleTest?.data) {
      const data = {
        Math: JSON.parse(singleTest?.data?.math_question),
        Physics: JSON.parse(singleTest?.data?.physics_question),
        Chemistry: JSON.parse(singleTest?.data?.chemistry_question),
        English: JSON.parse(singleTest?.data?.english_question),
        Computer: JSON.parse(singleTest?.data?.computer_question),
      };

      setQuestionData(data);
    }
  }, [singleTest]);

  useEffect(() => {
    if (questionData && questionData[selectedSubject]) {
      setQuestions(questionData[selectedSubject]);
    }
  }, [selectedSubject, questionData]);

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleAnswerChange = (
    index: number,
    checked: boolean,
    answered: string
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].checked = checked;
    updatedQuestions[index].answered = answered;

    // Update both questions state and questionData
    setQuestions(updatedQuestions);
    setQuestionData((prev) => ({
      ...prev,
      [selectedSubject]: updatedQuestions,
    }));
  };

  useEffect(() => {
    console.log("Current Page:", currentPage);
    console.log(
      "Paginated Questions:",
      questions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [currentPage, questions]);

  const getQuestionStartIndex = (subject: string) => {
    let count = 0;
    for (let i = 0; i < btn.length; i++) {
      const currentSub = btn[i];
      if (currentSub === subject) break;
      count += questionData[currentSub]?.length || 0;
    }
    return count;
  };

  const allQuestions = Object.values(questionData).flat();
  const totalAllQuestions = allQuestions.length;
  const totalAnsweredQuestions = allQuestions.filter(
    (q: QuestionType) => q.checked
  ).length;

  return (
    <>
      <Head>
        <title>{singleTest?.data?.course_name} | Study IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="Exam" />

      <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[3rem] pl-[1rem] pr-[1rem] pt-[1rem]">
        <p className="font-[500] text-[20px] md:text-[35px]">
          {singleTest?.data?.title}
        </p>
        <div className="md:flex  block gap-4 mt-3">
          {btn.map((subject, index) => (
            <button
              key={index}
              onClick={() => setSelectedSubject(subject)}
              className={`px-6 py-3 mb-3 ml-1 md:w-[10rem] rounded-[10px] ${
                selectedSubject === subject
                  ? "bg-[#007BB3] text-white"
                  : "bg-[#F2F2F2] text-black"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <div className="flex mdS:justify-between flex-col-reverse  md:flex-row md:mt-[4rem]">
          <div className="md:w-[70%] w-[100%]">
            <div className="border-t-2 border-[#007BB3] relative mb-6">
              <p className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white px-2">
                {selectedSubject} ({questions?.length} x{" "}
                {singleTest?.data?.marksPerQuestion} ={" "}
                {Number(questions?.length) *
                  Number(singleTest?.data?.marksPerQuestion)}
                )
              </p>
            </div>
            {questions
              ?.slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item: QuestionType, index: number) => {
                const absoluteIndex = (currentPage - 1) * itemsPerPage + index;
                return (
                  <Questioncard
                    key={index}
                    item={item}
                    showResult={showResult}
                    index={
                      getQuestionStartIndex(selectedSubject) +
                      (currentPage - 1) * itemsPerPage +
                      index
                    }
                    currectIndex={absoluteIndex}
                    onAnswerChange={handleAnswerChange}
                  />
                );
              })}
          </div>
          <div className="md:w-[30%] md:pl-[4rem]">
            <div className="border border-[#00000026] p-4 rounded-lg md:w-[100%] mb-4">
              <p className="text-[#000000] font-[500]">
                Total Question: {totalAllQuestions}
              </p>
              <p className="md:mt-2 md:mb-2 text-[#000000] font-[500]">
                Answered: {totalAnsweredQuestions}
              </p>
              <p className="text-[#000000] font-[500]">
                Time Remaining: {time} {isTimeOver ? "(Time Over)" : ""}
              </p>
            </div>
            <div className="border border-[#00000026] p-4 rounded-lg md:w-[100%]">
              <p className="text-[#000000] font-[600]">Questions:</p>
              <div className="grid grid-cols-5 gap-3 mt-3">
                {questions?.map((item: QuestionType, index: number) => (
                  <div
                    key={index}
                    className={`${
                      item?.checked ? "bg-[#007BB3]" : "bg-[#F2F2F2]"
                    } md:w-12 md:h-12 flex items-center justify-center p-4 rounded-lg`}
                  >
                    <p className="text-center">
                      {item?.checked ? (
                        <Image src={checked} alt="image" />
                      ) : (
                        getQuestionStartIndex(selectedSubject) +
                        (currentPage - 1) * itemsPerPage +
                        index +
                        1
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Pagination Controls */}
        <div className="md:flex justify-between items-center pb-[4rem] pt-2">
          <div className="border border-[#00000026] flex justify-between items-center">
            <div
              className={`border-r-[1px] border-[#00000026] md:w-11 md:h-11 flex justify-center items-center cursor-pointer ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
            >
              <FaChevronLeft />
            </div>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <div
                key={page}
                className={`border-r-[1px] border-[#00000026] md:w-11 md:h-11 w-11 h-11 flex justify-center items-center cursor-pointer ${
                  currentPage === page ? "bg-[#007BB3] text-white" : "bg-white"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </div>
            ))}
            <div
              className={`p-2 md:w-11 md:h-11 flex justify-center items-center cursor-pointer ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
            >
              <FaChevronRight />
            </div>
          </div>
          {/* <div>
            <p className="text-[#007BB3] font-bold text-[18px]">Next: Math</p>
          </div> */}
          <div>
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to end the test?"
                );
                if (confirmed) {
                  setIsModalOpen(true);
                }
              }}
              className="px-6 py-3 md:w-[10rem] w-[100%] md:mt-0 mt-3 rounded-[10px] bg-[#007BB3] text-white"
            >
              End Test
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[800px] md:w-4/5 lg:w-3/5 
                    max-h-[80vh] overflow-y-auto"
          >
            <Image
              src={ResultIcon}
              height={50}
              width={50}
              alt="otpPhone"
              className="mx-auto"
            />
            <p className="text-lg md:text-xl font-semibold mb-4 mt-4 text-center">
              {singleTest?.data?.title}
            </p>
            <p className="text-lg md:text-xl font-semibold mb-4 mt-4 text-center">
              Overall Score
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border-t border-b text-center">
                <p className="mt-2 mb-2">Marks</p>
                <p className="font-semibold mb-2">
                  {(() => {
                    const totalCorrect = btn.reduce((sum, subject) => {
                      return (
                        sum +
                        (questionData[subject]?.filter(
                          (item) => item?.answered === item?.currect
                        ).length ?? 0)
                      );
                    }, 0);

                    return totalCorrect;
                  })()}
                </p>
              </div>
            </div>

            <p className="text-lg md:text-xl font-semibold mb-4 mt-4 text-center">
              Subject Wise Summary
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {["Math", "Physics", "Chemistry", "English", "Computer"].map(
                (subject) => (
                  <div key={subject} className="border p-4">
                    <p className="mt-1 mb-1 font-semibold">{subject}</p>
                    <p className="text-gray-600 mb-1">
                      Your Marks:{" "}
                      {(questionData[subject]?.filter(
                        (item) => item?.answered === item?.currect
                      ).length ?? 0) *
                        Number(singleTest?.data?.marksPerQuestion)}
                    </p>
                    <p className="text-gray-600 mb-1">
                      Total Marks:{" "}
                      {questionData[subject]?.length *
                        Number(singleTest?.data?.marksPerQuestion)}
                    </p>
                  </div>
                )
              )}
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-2 font-bold text-[#007BB3] rounded-md border-2 border-[#007BB3] w-full md:w-auto"
                onClick={handleUpdateResult}
              >
                Okay!
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Id;
