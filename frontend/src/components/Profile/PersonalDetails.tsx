import React, { useState, useEffect, useContext } from "react";
import Edit from "../../../public/assets/editIcon.svg";
import Image from "next/image";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { UserContext } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/config";

const PersonalDetails = () => {
  const { user, refetchUser } = useContext(UserContext);
  const [fName, setfName] = useState<string>("");
  const [lName, setlName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNO, setPhoneNo] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  const validateEmail = (email: string) => {
    if (!email) {
      return "Email is required.";
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return "Enter a valid email address.";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail));
  };

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("firstName", fName);
      formData.append("lastName", lName);
      formData.append("email", email);
      formData.append("phone", phoneNO);

      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("studyItToken")}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      refetchUser();
    },
  });

  useEffect(() => {
    if (user) {
      setfName(user.firstName);
      setlName(user.lastName);
      setEmail(user.email);
      setPhoneNo(user.phone);
    }
  }, [user]);

  const handleSubmit = () => {
    const emailValidationMessage = validateEmail(email);
    setEmailError(emailValidationMessage);

    if (emailValidationMessage) {
      toast.error(emailValidationMessage);
      return;
    }

    updateProfileMutation.mutate();
  };

  return (
    <div className="bg-[#ffff] rounded-[16px] p-6 mb-7">
      <div className="flex">
        <p className="font-semibold text-[25px]">Personal Information</p>{" "}
        <Image
          src={Edit}
          alt="EditInfo"
          className="w-[1.5rem] cursor-pointer ml-2"
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>
      <div className="md:flex mb-4 mt-3 md:w-[80%] w-[100%]">
        <div className="md:w-[30%] w-[100%] mr-4">
          <Inputbox
            value={fName}
            type="text"
            placeholder="Enter first name"
            title="First Name"
            style={{
              border: isEditing ? "1px solid #333" : "none",
              marginTop: "5px",
              background: isEditing ? "#ffff" : "transparent",
              paddingLeft: isEditing ? "15px" : "0px",
            }}
            disabled={!isEditing}
            onChange={(e) => setfName(e.target.value)}
          />
        </div>
        <div className="md:w-[30%] w-[100%] mt-3 md:mt-0">
          <Inputbox
            value={lName}
            type="text"
            placeholder="Enter last name"
            title="Last Name"
            style={{
              border: isEditing ? "1px solid #333" : "none",
              marginTop: "5px",
              background: isEditing ? "#ffff" : "transparent",
              paddingLeft: isEditing ? "15px" : "0px",
            }}
            disabled={!isEditing}
            onChange={(e) => setlName(e.target.value)}
          />
        </div>
      </div>

      <div className="md:flex justify-between items-center">
        <div className="md:flex md:w-[80%] w-[100%]">
          <div className="md:w-[30%] w-[100%] mr-4">
            <Inputbox
              value={email}
              type="email"
              placeholder="Enter Email Address"
              title="Email Address"
              style={{
                border: isEditing ? "1px solid #333" : "none",
                marginTop: "5px",
                background: isEditing ? "#ffff" : "transparent",
                paddingLeft: isEditing ? "15px" : "0px",
              }}
              disabled={!isEditing}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div className="md:w-[30%] w-[100%] mt-3 md:mt-0">
            <Inputbox
              value={phoneNO}
              type="text"
              placeholder="Enter Phone Number"
              title="Phone Number"
              style={{
                border: isEditing ? "1px solid #333" : "none",
                marginTop: "5px",
                background: isEditing ? "#ffff" : "transparent",
                paddingLeft: isEditing ? "15px" : "0px",
              }}
              disabled={false}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="flex justify-end mt-3 md:mt-0">
          <div className="md:w-[10rem] w-[100%]">
            <Button
              label="Save"
              onClick={handleSubmit}
              type="submit"
              isLoading={updateProfileMutation.status === "pending"}
              style={{ padding: "4px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
