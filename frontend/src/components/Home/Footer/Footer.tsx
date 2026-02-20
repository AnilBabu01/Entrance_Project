import React from "react";
import Image from "next/image";
import logonepal1 from "../../../../public/assets/logonepal1.svg";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBrandYoutube } from "react-icons/tb";
import { BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "@/utils/config";

function Footer() {
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
    <div className="w-full  bg-[#007BB3D9]">
      <div className="p-7 border border-b-3 gap-6 block sm:flex">
        <div className=" w-1/3">
          <div className="flex  mb-4 justify-start ">
            <Image src={logonepal1} alt="logofooter" width={230} />
          </div>
          <div className="flex w-full flex-col justify-center  ">
            <p className="text-white mb-4">
              StudyITNepal is the go-to platform for IT students and tech
              professionals. We create tech articles and videos, offer career
              guidance, assist students with college placements, and keep you
              updated with the latest IT news and trends.
            </p>

            <ul className="flex gap-4 justify-start ">
              <li className="text-white text-2xl">
                <a
                  href={data?.data?.facebook_profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook />
                </a>
              </li>

              <li className="text-white text-2xl">
                <a
                  href={data?.data?.instagram_Profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoInstagram />
                </a>
              </li>
              <li className="text-white text-2xl">
                <a
                  href={data?.data?.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TbBrandYoutube />
                </a>
              </li>
              <li className="text-white text-2xl">
                <a
                  href={data?.data?.linkedln_Profile}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillTwitterCircle />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className=" md:flex gap-2 w-full justify-around ">
          <div>
            <ul className="mb-4 text-white text-sm leading-normal cursor-pointer ">
              <h2 className="text-white text-xl font-semibold mb-2 ">
                Important Links
              </h2>
              <li>
                <Link href="/privacy-policy">Privacy Policy </Link>
              </li>
              <li>
                <Link href="/terms-of-service">Terms of service</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="mb-4 text-white  text-sm  ">
              <h2 className="text-white text-lg mb-2">YouTube Channel</h2>
              <li>
                <a
                  href={data?.data?.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-center gap-2 items-center"
                >
                  <BsYoutube className="text-red-500 text-xl" />
                  Subscribe Study It Nepal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul className="mb-4 text-white  text-sm leading-normal cursor-pointer">
              <h2 className="text-white text-lg mb-2 font-semibold ">
                Contact Us
              </h2>
              <pre>{data?.data?.address}</pre>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-white p-3">
        <span>© 2025 StudyITNepal All Rights Reserved</span>
      </div>
    </div>
  );
}

export default Footer;
