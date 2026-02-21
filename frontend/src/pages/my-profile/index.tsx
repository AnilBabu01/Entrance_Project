import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import TitleHeader from "@/components/Common/TitleHeader/index";
import Profile from "@/components/Profile/Profile";
import PersonalDetails from "@/components/Profile/PersonalDetails";
import Address from "@/components/Profile/Address";
import ChangePassword from "@/components/Profile/ChangePassword";
import AdditionalInfo from "@/components/Profile/AdditionalInfo";

function Index() {
  return (
    <>
      <Head>
        <title>My Profile | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <TitleHeader title="My Profile" />
      <div className="md:pl-[7rem] md:pr-[7rem] md:pt-[3rem] md:pb-[3rem] pl-[1rem] pr-[1rem] pt-[1rem] bg-[#f2f2f2]">
        <Profile />
        <PersonalDetails />
        <Address />
        <ChangePassword />
        <AdditionalInfo />
      </div>
    </>
  );
}

export default Index;
