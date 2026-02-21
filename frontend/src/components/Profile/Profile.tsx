import React, { useState, useContext } from "react";
import DefaultProfile from "../../../public/assets/profile.svg";
import Edit from "../../../public/assets/editIcon.svg";
import Image from "next/image";
import { UserContext } from "@/context/authContext";
import { ORIGINAL_BASE_URL, BASE_URL } from "@/utils/config";
import Button from "@/components/Common/Button/Index";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";


const Profile = () => {
  const { user, refetchUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      if (!file) return;
      const formData = new FormData();
      formData.append("profileUrl", file);

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setIsEditing(true);
      setSelectedImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  return (
    <>
      <div className="bg-[#ffff] rounded-[16px] p-6 mb-7">
        <div className="md:flex items-center">
          <div className="relative md:block flex justify-center">
            <Image
              src={
                selectedImage ||
                (user?.profileUrl
                  ? `${ORIGINAL_BASE_URL}${user?.profileUrl}`
                  : DefaultProfile)
              }
              width={100}
              height={100}
              alt="Profile"
              className="md:w-[10rem] md:h-[10rem] w-[5rem] h-[5rem] rounded-full"
            />

            <input
              type="file"
              accept="image/*"
              id="profile-image-input"
              className="hidden"
              onChange={handleImageChange}
            />
            <Image
              src={Edit}
              alt="Edit"
              className="absolute md:top-[70%] md:left-[80%] top-[70%] left-[56%] md:w-[2rem] w-[1rem] cursor-pointer"
              onClick={() =>
                document.getElementById("profile-image-input")?.click()
              }
            />
          </div>
          <div className="ml-5 md:mt-0 mt-2 md:block text-center  md:text-left">
            <p className="font-bold md:text-[22px] text-[16px]">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[#333333] font-semibold mb-2 mt-1">
              {user?.email}
            </p>
            <p className="text-[#333333]">{user?.bio}</p>
          </div>
        </div>
        {isEditing && (
          <div className="flex justify-end">
            <div className="w-[10rem]">
              <Button
                label="Save"
                onClick={() => updateProfileMutation.mutate()}
                type="submit"
                isLoading={updateProfileMutation.status === "pending"}
                style={{ padding: "4px" }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
