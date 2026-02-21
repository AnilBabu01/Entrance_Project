import React, { useState, FormEvent, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "@/context/authContext";
import { useRouter } from "next/router";


function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refetchUser } = useContext(UserContext);
  
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

  const loginMutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.status) {
        
        toast.success(data?.msg);
        localStorage.setItem("studyItToken", data?.data[0]?.token);
        refetchUser();
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        toast.error(data?.msg);
      }
    },
    
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

 

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="hidden md:flex bg-[#007BB3D9] h-[50vh] items-center justify-center"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full  max-w-[100%] md:max-w-[65%] text-3xl">
        <div className="flex flex-wrap justify-center md:items-center bg-[#ffff] shadow-lg max-w-[100%] mx-auto md:rounded-3xl md:h-auto h-[100vh]  md:w-[100%] p-5">
          <div className="w-full md:w-[50%] flex justify-center mb-6 md:mb-0 rounded-l-3xl">
            <Image
              src={`${ORIGINAL_BASE_URL}${data?.data?.signin_img}`}
              alt="Login illustration"
              width={300}
              height={300}
              className="w-full md:rounded-l-[20px]"
            />
          </div>
          <div className="md:p-8 p-0 pr-3 pl-3 md:rounded md:w-[50%] w-[100%]">
            <h2 className="text-lg font-bold mb-3 text-[#007BB3D9]">
              Login to StudyITNepal
            </h2>
            <form onSubmit={handleLogin}>
              <div className="mb-2">
                <Inputbox
                  type="text"
                  placeholder="Enter Email or Phone Number"
                  title="Email or Phone Number"
                  aria-label="Email or Phone Number"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <Inputbox
                  type="password"
                  placeholder="Enter Password"
                  title="Password"
                  aria-label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-black">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <Link href="/auth/forgot-password">
                  <span className="text-sm text-[#007BB3D9] hover:underline ml-5">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <Button
                label="Login"
                type="submit"
                isLoading={loginMutation.isPending}
                onClick={() => {}}
              />
            </form>
            <p className="mt-3 text-sm text-gray-600">
              Don’t have an account?
              <Link
                href="/auth/signup"
                className="text-[#007BB3D9] hover:underline"
              >
                {" "}
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex bg-white h-[50vh] items-center justify-center"></div>
    </div>
  );
}

export default Signin;
