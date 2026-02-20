import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";

function Index() {
  return (
    <>
      <Head>
        <title>Notes | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="Notes" />
    </>
  );
}

export default Index;
