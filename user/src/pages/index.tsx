import Navbar from "@/components/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import Banner from "@/components/Home/Banner";
import HowAI from "@/components/Home/HowAI";
import WhyUs from "@/components/Home/WhyUs";
import OurClients from "@/components/Home/OurClients";
import LatestArticle from "@/components/Home/LatestArticle/LatestArticle";
import Head from "next/head";
import MessengerChat from "@/components/Common/MessengerChat ";
export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Studay IT Nepal</title>
      </Head>
      <Navbar />
      <Banner />
      <HowAI />
      <WhyUs />
      <OurClients />
      <LatestArticle />
      <Footer />
      <MessengerChat/>
    </>
  );
}
