import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import { useRouter } from "next/router";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";
import PdfIcon from "../../../../../../public/assets/pdfIcon.webp";
import Image from "next/image";
import {
  BookType,
  NotesType,
  PracticalType,
} from "../../../../../components/types";
import Link from "next/link";

function Index() {
  const router = useRouter();
  const { course, subject, id } = router.query;
  const [selectedBtn, setselectedBtn] = useState("Syllabus");
  const btn = ["Syllabus", "Notes", "Old Questions", "Book", "Practical"];

  const { data: isCourse } = useQuery({
    queryKey: ["getCourseByID", course],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-course-by-id/${course}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isSubject } = useQuery({
    queryKey: ["getsubjectByID", id],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/getSubject-by-id/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const semId = isSubject?.data?.sem_id; // Extract sem_id safely

  const { data: isSyllabus } = useQuery({
    queryKey: ["getSyllabusByIds", id, course, semId],
    enabled: !!semId, // Runs only when semId is available
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getSyllabus-by-ids/${course}/${semId}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isNotes } = useQuery({
    queryKey: ["getNotesByIds", id, course, semId],
    enabled: !!semId,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getNotes-by-ids/${course}/${semId}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isOldQuestionModal } = useQuery({
    queryKey: ["getOldQuestionModalByIds", id, course, semId],
    enabled: !!semId,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getOldQuestions-by-ids/${course}/${semId}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isBooks } = useQuery({
    queryKey: ["getBooksByIds", id, course, semId],
    enabled: !!semId,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getBooks-by-ids/${course}/${semId}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const { data: isPractical } = useQuery({
    queryKey: ["getPracticalByIds", id, course, semId],
    enabled: !!semId,
    queryFn: async () => {
      const response = await fetch(
        `${BASE_URL}/getPracticals-by-ids/${course}/${semId}/${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  console.log({
    isSubject,
    isSyllabus,
    isNotes,
    isOldQuestionModal,
    isBooks,
    isPractical,
    isCourse,
  });

  return (
    <>
      <Head>
        <title>
          {isCourse && isCourse?.data[0]?.course_name} ({subject}) notes |
          Studay IT Nepal
        </title>
      </Head>
      <Navbar />
      <TitleHeader
        title={`${
          isCourse && isCourse?.data[0]?.course_name
        } (${subject}) notes`}
      />
      <div className="overflow-x-hidden">
        <div className="mt-3 md:pl-[7rem] md:pr-[7rem] md:pt-[3rem] pl-[1rem] pr-[1rem] pt-[1rem] pb-5 md:mb-0 mb-[5rem]">
          <div className="rounded-[11px] bg-[#ffff] custom-shadow p-8">
            <p className="text-center font-bold text-[20px]">
              {isSubject?.data?.subject_name} Notes
            </p>
            <p className="text-center mt-4 mb-4 break-words max-w-[100%] md:max-w-[90%] mx-auto">
              {isSubject?.data?.description}
            </p>

            <div className="flex flex-wrap gap-4 mt-3 justify-center">
              {btn?.map((key) => (
                <button
                  key={key}
                  onClick={() => setselectedBtn(key)}
                  className={`px-6 py-3 md:w-[10rem] w-[100%] rounded-[10px] ${
                    selectedBtn === key
                      ? "bg-[#007BB3] text-white"
                      : "bg-[#F2F2F2] text-[black]"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>

            {selectedBtn === "Notes" && isNotes?.data && (
              <>
                <div className="mt-6">
                  {isNotes?.data?.map((item: NotesType, index: number) => {
                    return (
                      <div
                        key={index}
                        className="bg-[#F2F2F2] mt-3 mb-3 p-4 rounded-[10px]"
                      >
                        <p className="text-[#007BB3]">
                          <Link href={`/unit/${course}/${subject}/${item?.id}`}>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.unit ?? "",
                            }}
                          />
                          </Link>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {selectedBtn === "Syllabus" && isSyllabus?.data && (
              <>
                <div className="mt-6">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: isSyllabus?.data?.syllabus ?? "",
                    }}
                  />
                </div>
              </>
            )}

            {selectedBtn === "Old Questions" && isOldQuestionModal?.data && (
              <>
                <div className="mt-5">
                  {isOldQuestionModal?.data?.map((item, index: number) => {
                    return (
                      <div
                        key={index}
                        className="bg-[#F2F2F2] mt-3 mb-3 p-4 rounded-[10px]"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.questions ?? "",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {selectedBtn === "Book" && isBooks?.data?.length > 0 && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isBooks?.data?.map((item: BookType, index: number) => (
                  <div
                    key={index}
                    className="bg-[#F2F2F2] p-4 rounded-[10px] shadow-md flex flex-col items-center text-center"
                  >
                    <Image
                      src={PdfIcon}
                      alt="PDF Icon"
                      width={45}
                      height={45}
                    />
                    <p className="mt-2 text-gray-700 font-medium">
                      {item?.pdf_book?.slice(20)}
                    </p>

                    <a
                      href={`${ORIGINAL_BASE_URL}/${item.pdf_book}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
                    >
                      Download PDF
                    </a>
                  </div>
                ))}
              </div>
            )}

            {selectedBtn === "Practical" && isBooks?.data?.length > 0 && (
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isPractical?.data?.map(
                  (item: PracticalType, index: number) => (
                    <div
                      key={index}
                      className="bg-[#F2F2F2] p-4 rounded-[10px] shadow-md flex flex-col items-center text-center"
                    >
                      <Image
                        src={PdfIcon}
                        alt="PDF Icon"
                        width={45}
                        height={45}
                      />
                      <p className="mt-2 text-gray-700 font-medium">
                        {item?.pdf_book?.slice(20)}
                      </p>

                      <a
                        href={`${ORIGINAL_BASE_URL}/${item.pdf_book}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-300"
                      >
                        Download PDF
                      </a>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
