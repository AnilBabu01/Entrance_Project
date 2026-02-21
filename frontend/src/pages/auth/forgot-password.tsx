import React, { useState, FormEvent } from "react";
import Image from "next/image";
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
  password: string;
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

  const sendOtpMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await axios.post(`${BASE_URL}/forgotPassword`, userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Otp sent successfully!");
      setIsModalOpen(true);
    },
  
  });

  const verifyOtpMutation = useMutation({
    mutationFn: async (userData: VerifyOtpData) => {
      const response = await axios.post(`${BASE_URL}/VerifyAndChangePassword`, userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setIsModalOpen(false);
      router.push("/auth/signin");
    },
   
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    sendOtpMutation.mutate(formData);
  };

  const verifyOtp = () => {
    const verifyData = {
      password: formData.password,
      phone: formData.phone,
      otp: otp,
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
              Enter your registered mobile no
            </h2>
            <form onSubmit={handleRegister}>
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
              <div className="mt-7">
                <Button
                  label="Forgot password"
                  type="submit"
                  isLoading={sendOtpMutation.isPending}
                  onClick={() => {}}
                />
              </div>
            </form>
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
            <div className="flex justify-center mt-3">
              <div className="w-[54%]">
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
