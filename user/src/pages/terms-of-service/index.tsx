import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/config";

function Index() {
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

  return (
    <>
      <div className="md:pl-24 md:pr-24 md:pt-5 pl-5 pr-5 pt-5">
        <div dangerouslySetInnerHTML={{ __html: data?.data?.terms_of_service ?? "<p>Coming soon</p>" }} />
      </div>
    </>
  );
}

export default Index;
