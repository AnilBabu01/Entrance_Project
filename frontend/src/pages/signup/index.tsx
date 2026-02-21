import React, { useState, FormEvent, useEffect } from "react";
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

function Index() {
  const router = useRouter();
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [otp, setotp] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    studyIn: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      toast.success("OTP sent successfully!");
      setIsModalOpen(true);
      setIsResendDisabled(true);
      setTimer(30);
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.msg ||
          "Something went wrong. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred.");
      }
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
      router.push("/signin");
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log("sdf", error);
      const errorMessage =
        error.response?.data?.msg || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (userData: typeof formData) => {
      const response = await axios.post(`${BASE_URL}/resendOtp`, userData);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      errors.email = "Enter a valid email";

    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone))
      errors.phone = "Enter a valid 10-digit phone number";
    if (!formData.password.trim()) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      registerMutation.mutate(formData);
    }
  };

  const verifyOtp = () => {
    if (!otp) {
      toast.error("Please enter otp");
      return;
    }
    const verifyData = {
      email: formData.email,
      phone: formData.phone,
      otp: otp,
    };

    verifyOtpMutation.mutate(verifyData);
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


  console.log("studyIn  is ",formData);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="bg-[#007BB3D9] h-[50vh] flex items-center justify-center"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[100%] md:max-w-[65%] text-3xl">
        <div className="flex flex-wrap justify-center md:items-center bg-[#ffff] shadow-lg max-w-[100%] mx-auto md:rounded-3xl md:h-auto h-[100vh] md:w-[100%] p-5">
          <div className="w-full md:w-[50%] flex justify-center mb-6 md:mb-0 rounded-l-3xl pt-[6rem]">
            <Image
              src={`${ORIGINAL_BASE_URL}${data?.data?.signup_img}`}
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
                    title="FirstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="border p-2 w-full"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className="w-[48%]">
                  <Inputbox
                    type="text"
                    name="lastName"
                    title="LastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="border p-2 w-full"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="mb-2">
                <Inputbox
                  type="email"
                  name="email"
                  title="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="border p-2 w-full"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-2">
                <Inputbox
                  type="text"
                  name="phone"
                  title="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="border p-2 w-full"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="label">
                  Studying
                </label>
                <select
                  value={formData.studyIn} // Bind the value to formData.studyIn
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setFormData({
                      ...formData, // Keep other form data unchanged
                      studyIn: e.target.value, // Update only the studyIn field
                    })
                  }
                  className="defaultStyles"
                  
                >
                  <option value="">Select your current status</option>
                  <option value="Currently studying +2">
                    ✅ Currently studying +2
                  </option>
                  <option value="+2 graduate">✅ +2 graduate</option>
                  <option value="Bachelor student">✅ Bachelor student</option>
                  <option value="Bachelor graduate">
                    ✅ Bachelor graduate
                  </option>
                  <option value="Not interested in IT">
                    ✅ Not interested in IT
                  </option>
                </select>
              </div>
              <div className="mb-2">
                <Inputbox
                  type="password"
                  name="password"
                  title="Password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="border p-2 w-full"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-sm text-black">
                  <input
                    type="checkbox"
                    className="mr-2 border-gray-300"
                    required
                  />
                  I agree to the
                  <Link
                    href="/terms-of-service"
                    target="_blank"
                    className="text-blue-500 underline ml-1"
                  >
                    terms and conditions
                  </Link>
                </label>
              </div>
              <Button
                label="Create Account"
                type="submit"
                isLoading={registerMutation.isPending}
              />
            </form>
            <p className="mt-3 text-sm text-gray-600">
              Already have an account?
              <Link href="/signin" className="text-[#007BB3D9] hover:underline">
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

export default Index;
