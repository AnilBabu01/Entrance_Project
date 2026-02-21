import React, { useState, useContext, FormEvent } from "react";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { UserContext } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/config";

const ChangePassword = () => {
  const { refetchUser } = useContext(UserContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validateInputs = () => {
    const validationErrors: {
      oldPassword?: string;
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    if (!oldPassword) {
      validationErrors.oldPassword = "Current password is required.";
    }

    if (!newPassword) {
      validationErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      validationErrors.newPassword = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(newPassword)) {
      validationErrors.newPassword =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(newPassword)) {
      validationErrors.newPassword =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(newPassword)) {
      validationErrors.newPassword =
        "Password must contain at least one number.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      validationErrors.newPassword =
        "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword =
        "New password and confirm password do not match.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("password", newPassword);
      formData.append("oldPassword", oldPassword);

      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("studyItToken")}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      refetchUser();
    },
    onError: (error: AxiosError<{ msg?: string }>) => {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.msg || "An error occurred!");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      updateProfileMutation.mutate();
    }
  };

  return (
    <div className="bg-[#ffff] rounded-[16px] p-6 mb-7">
      <p className="font-semibold text-[25px]">Password Change</p>
      <form onSubmit={handleSubmit}>
        <div className="flex mb-4 mt-3 md:w-[80%] w-[100%]">
          <div className="md:w-[62%] w-[100%] md:mr-4">
            <Inputbox
              value={oldPassword}
              type="password"
              placeholder="Enter current password"
              title="Current Password"
              style={{
                border: "1px solid #333333",
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOldPassword(e.target.value)
              }
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm">{errors.oldPassword}</p>
            )}
          </div>
        </div>

        <div className="md:flex md:w-[80%] w-[100%]">
          <div className="md:w-[62%] w-[100%] mr-4">
            <Inputbox
              value={newPassword}
              type="password"
              placeholder="Enter new password"
              title="New Password"
              style={{
                border: "1px solid #333333",
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>
        </div>

        <div className="mb-4 mt-3 md:flex md:w-[80%] w-[100%]">
          <div className="md:w-[62%] w-[100%] mr-4">
            <Inputbox
              value={confirmPassword}
              type="password"
              placeholder="Enter confirm password"
              title="Confirm Password"
              style={{
                border: "1px solid #333333",
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="mb-4 mt-3 flex justify-end">
          <div className="md:w-[10rem] w-[100%] mt-2 md:mt-0">
            <Button
              label="Save"
              type="submit"
              isLoading={updateProfileMutation.status === "pending"}
              style={{ padding: "4px" }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
