import React, { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import otpPhone from "../../../public/assets/otophone.svg";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { BASE_URL, ORIGINAL_BASE_URL } from "@/utils/config";
import OTPInput from "@/components/Common/OTPInput/OTPInput";
import { useRouter } from "next/router";

type VerifyOtpData = {
  email: string;
  phone: string;
  otp: string;
};

function Login() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setotp] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const { data } = useQuery({
    queryKey: ["getSetting"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-settings`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await axios.post(`${BASE_URL}/register`, userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Otp sent successfully!");
      setIsModalOpen(true);
    },
   
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (userData: VerifyOtpData) => {
      const response = await axios.post(`${BASE_URL}/verify`, userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP verified successfully!");
      setIsModalOpen(false);
      router.push("/auth/signin");
    },
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const verifyOtp = () => {
    const verifyData = {
      email: formData.email,
      phone: formData.phone,
      otp: otp, // OTP from state
    };

    verifyOtpMutation.mutate(verifyData);
  };
  

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-[#007BB3D9] h-[50vh] flex items-center justify-center"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[100%] md:max-w-[65%] text-3xl">
        <div className="flex flex-wrap justify-center md:items-center bg-[#ffff] shadow-lg max-w-[100%] mx-auto md:rounded-3xl md:h-auto h-[100vh] md:w-[100%] p-5">
          <div className="w-full md:w-[50%] flex justify-center mb-6 md:mb-0 rounded-l-3xl pt-[6rem]">
            <Image
              src={`${ORIGINAL_BASE_URL}${data?.data?.signin_img}`}
              alt="Login illustration"
              width={300}
              height={300}
              className="w-full"
            />
          </div>
          <div className="md:p-8 p-0 pr-3 pl-3 md:rounded md:w-[50%] w-[100%]">
            <h2 className="text-lg font-bold mb-3 text-[#007BB3D9]">
              Create your Account
            </h2>
            <form onSubmit={handleRegister}>
              <div className="flex justify-between mb-2">
                <div className="w-[48%]">
                  <Inputbox
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    title="First Name"
                    required
                  />
                </div>
                <div className="w-[48%]">
                  <Inputbox
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    title="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <Inputbox
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  title="Email"
                  required
                />
              </div>
              <div className="mb-2">
                <Inputbox
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  title="Phone Number"
                  required
                />
              </div>
              <div className="mb-2">
                <Inputbox
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  title="Password"
                  required
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-black">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300 focus:ring-blue-500"
                    required
                  />
                  I agree to the terms and conditions
                </label>
              </div>
              <Button
                label="Create Account"
                type="submit"
                isLoading={registerMutation.isPending}
                onClick={() => {}}
              />
            </form>
            <p className="mt-3 text-sm text-gray-600">
              Already have an account?
              <Link
                href="/auth/signin"
                className="text-[#007BB3D9] hover:underline"
              >
                {" "}
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm md:max-w-lg lg:max-w-xl text-center">
            <Image src={otpPhone} alt="otpPhone" className="mx-auto" />
            <h2 className="text-xl font-semibold mb-4 mt-4">
              Verify your phone number
            </h2>
            <p className="text-gray-600 mt-[1rem]">
              A verification code has been sent to {formData.phone}
            </p>
            <h2 className="text-xl font-semibold mb-4 mt-4">
              {formData.phone}
            </h2>
            <p className="text-gray-600 mt-[1rem] mb-4">
              Please enter the code here.
            </p>
            <div className="flex justify-center">
              <OTPInput length={6} onComplete={(otp) => setotp(otp)} />
            </div>
            <p className="text-gray-600 mt-[1rem]">
              Didn’t receive a code? Resend
            </p>
            <div className="flex justify-between md:pl-[8rem] md:pr-[8rem] pr-4 pl-4">
              <button
                className="mt-4 px-5 py-2 font-bold text-[#007BB3] rounded-md border-2 border-[#007BB3]"
                onClick={() => setIsModalOpen(false)}
              >
                Go Back
              </button>
              <button
                className="mt-4 px-5 py-2 font-bold bg-[#007BB3] text-white rounded-md border-2 border-[#007BB3]"
                onClick={() => verifyOtp()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
