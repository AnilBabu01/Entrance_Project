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

function Index() {
  const router = useRouter();
  const { refetchUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

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
    onError: (error: { response: { data: { msg: string } } }) => {
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";

        console.log("erroe",error);
      toast.error(errorMessage);
    },
  });

  // Validation function
  const validateInputs = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email or Phone is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(email) && 
      !/^\d{10}$/.test(email) 
    ) {
      errors.email = "Enter a valid email or phone number.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: FormEvent) => {
    try {
      e.preventDefault();
      if (validateInputs()) {
        loginMutation.mutate({ email, password });
      }
    } catch (error) {
      console.log("error",error)
    }
   
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="hidden md:flex bg-[#007BB3D9] h-[50vh] items-center justify-center"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[100%] md:max-w-[65%] text-3xl">
        <div className="flex flex-wrap justify-center md:items-center bg-[#ffff] shadow-lg max-w-[100%] mx-auto md:rounded-3xl md:h-auto h-[100vh] md:w-[100%] p-5">
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
                  placeholder="Enter email or phone number"
                  title="Email or Phone Number"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-2">
                <Inputbox
                  type="password"
                  placeholder="Enter password"
                  title="Password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-black">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300 focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <Link href="/forgot-password">
                  <span className="text-sm text-[#007BB3D9] hover:underline ml-5">
                    Forgot Password?
                  </span>
                </Link>
              </div>
              <Button
                label="Login"
                type="submit"
                isLoading={loginMutation.isPending}
              />
            </form>
            <p className="mt-3 text-sm text-gray-600">
              Don’t have an account?
              <Link href="/signup" className="text-[#007BB3D9] hover:underline">
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

export default Index;
