import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import { useRouter } from "next/router";
import { BASE_URL } from "@/utils/config";
import { useQuery } from "@tanstack/react-query";

function UnitId() {
  const router = useRouter();
  const { course, unitId } = router.query;

  const { data: isUnit } = useQuery({
    queryKey: ["getnote_by_id", course],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/getnote_by_id/${unitId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-3 md:pl-[7rem] md:pr-[7rem] md:pt-[3rem] pl-[1rem] pr-[1rem] pt-[1rem] pb-5">
        <p className="text-center font-bold text-[25px]">Note Section</p>

        <div
          dangerouslySetInnerHTML={{
            __html: isUnit?.data?.note ?? "not found",
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

export default UnitId;
