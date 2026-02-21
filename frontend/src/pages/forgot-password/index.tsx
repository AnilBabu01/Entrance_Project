import React, { useState, FormEvent, useEffect } from "react";
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
import Link from "next/link";
type VerifyOtpData = {
  password: string;
  email: string;
  phone: string;
  otp: string;
};

function Index() {
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setotp] = useState("");
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>(
    {}
  );

  // Fetch settings
  const { data } = useQuery({
    queryKey: ["getSetting"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/get-settings`);
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  // Mutation to send OTP
  const sendOtpMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await axios.post(`${BASE_URL}/forgotPassword`, userData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setIsModalOpen(true);
      setIsResendDisabled(true);
      setTimer(30);
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Mutation to verify OTP
  const verifyOtpMutation = useMutation({
    mutationFn: async (userData: VerifyOtpData) => {
      const response = await axios.post(
        `${BASE_URL}/VerifyAndChangePassword`,
        userData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      setIsModalOpen(false);
      router.push("/auth/signin");
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await axios.post(
        `${BASE_URL}/ResendForgotOtp`,
        userData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("OTP sent successfully!");
      setIsModalOpen(true);
      setIsResendDisabled(true);
      setTimer(30);
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation function
  const validateInputs = () => {
    const errors: { phone?: string; password?: string } = {};

    if (!formData.phone) {
      errors.phone = "Email or Phone is required.";
    } else if (
      !/^\S+@\S+\.\S+$/.test(formData.phone) &&
      !/^\d{10}$/.test(formData.phone)
    ) {
      errors.phone = "Enter a valid email or phone number.";
    }

    if (isModalOpen) {
      if (!formData.password) {
        errors.password = "Password is required.";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
      } else if (!/[A-Z]/.test(formData.password)) {
        errors.password =
          "Password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(formData.password)) {
        errors.password =
          "Password must contain at least one lowercase letter.";
      } else if (!/[0-9]/.test(formData.password)) {
        errors.password = "Password must contain at least one number.";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle registration (send OTP)
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      sendOtpMutation.mutate(formData);
    }
  };

  // Handle OTP verification
  const verifyOtp = () => {
    if (validateInputs()) {
      verifyOtpMutation.mutate({
        password: formData.password,
        phone: formData.phone,
        email: formData.email,
        otp: otp,
      });
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleResendOTP = async () => {
    resendOtpMutation.mutate(formData);
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
              Forgot your password
            </h2>
            <form onSubmit={handleRegister}>
              <div className="mb-2">
                <Inputbox
                  type="email"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  title="Email address"
                  // required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div className="mt-7">
                <Button
                  label="Forgot password"
                  type="submit"
                  isLoading={sendOtpMutation.isPending}
                  onClick={() => {}}
                />
              </div>

              <p className="mt-3 text-sm text-gray-600">
              Do you want to ?
              <Link href="/signin" className="text-[#007BB3D9] hover:underline">
                {" "}
                Login
              </Link>
            </p>
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
              Verify your email
            </h2>
            <p className="text-gray-600 mt-[1rem]">
              A verification code has been sent to {formData.phone}
            </p>
            <div className="flex justify-center">
              <OTPInput length={6} onComplete={(otp) => setotp(otp)} />
            </div>
            <div className=" mt-3 mr-[7rem] ml-[7rem]">
              <Inputbox
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                title="Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <p className="text-gray-600 mt-[1rem]">
              {isResendDisabled ? (
                <p>
                  Didn’t receive a code? Resend in{" "}
                  <span className="font-bold">{timer}s</span>
                </p>
              ) : (
                <button
                  onClick={handleResendOTP}
                  className="text-blue-500 hover:underline"
                >
                  Didn’t receive a code? Resend
                </button>
              )}
            </p>
            <div className="flex justify-between">
              <button
                className="mt-4 px-5 py-2 text-[#007BB3] border-2 border-[#007BB3]"
                onClick={() => router.back()}
              >
                Go Back
              </button>
              <button
                className="mt-4 px-5 py-2 bg-[#007BB3] text-white border-2 border-[#007BB3]"
                onClick={verifyOtp}
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

export default Index;
