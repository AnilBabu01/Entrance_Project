import React, { useState, useEffect, useContext } from "react";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { UserContext } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/config";

const AdditionalInfo = () => {
  const { user, refetchUser } = useContext(UserContext);

  const [bio, setbio] = useState("");
  const [collegeName, setcollegeName] = useState("");
  const [studyIn, setstudyIn] = useState("");

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("collegeName", collegeName);
      formData.append("studyIn", studyIn);

      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("studyItToken")}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Additional Information updated successfully!");
      refetchUser();
    },
  });

  useEffect(() => {
    if (user) {
      setbio(user.bio);
      setcollegeName(user.collegeName);
      setstudyIn(user.studyIn);
    }
  }, [user]);

  return (
    <>
      <div className="bg-[#ffff] rounded-[16px] p-6 mb-7">
        <p className="font-semibold text-[25px]">Additional Information</p>
        <div className="md:flex mb-4 mt-3 md:w-[80%] w-[100%]">
          <div className="md:w-[30%] w-[100%] md:mr-4">
            <Inputbox
              value={collegeName}
              type="text"
              placeholder="Enter college"
              title="College"
              style={{
                border: "1px solid #333333",
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setcollegeName(e.target.value)
              }
            />
          </div>
          <div className="md:w-[30%] w-[100%] md:mt-0 mt-2">
            <label className="block text-gray-700 mb-[0.5rem]">Studying</label>
            <select
              value={studyIn}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setstudyIn(e.target.value)
              }
              style={{
                border: "1px solid #333333",
                marginTop: "5px",
                background: "#ffff",
                padding: "8px 12px",
                width: "100%",
                height:45,
                borderRadius:'5px'
              }}
            >
              <option value="">Select your current status</option>
              <option value="Currently studying +2">✅ Currently studying +2</option>
              <option value="+2 graduate">✅ +2 graduate</option>
              <option value="Bachelor student">✅ Bachelor student</option>
              <option value="Bachelor graduate">✅ Bachelor graduate</option>
              <option value="Not interested in IT">✅ Not interested in IT</option>
            </select>
          </div>
        </div>

        <div className="mb-4 mt-3">
          <div className="flex md:w-[80%] w-[100%]">
            <div className="md:w-[62%] w-[100%] md:mr-4">
              <Inputbox
                value={bio}
                type="textarea"
                placeholder="Enter description/bio"
                title="Description/ Bio"
                style={{
                  border: "1px solid #333333",
                  height: "8rem",
                  marginTop: "5px",
                  background: "#ffff",
                  paddingTop: "0.4rem",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setbio(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="mb-4 mt-3 flex justify-end">
          <div className="md:w-[10rem] w-[100%] md:mt-0 mt-2">
            <Button
              label="Save"
              onClick={() => updateProfileMutation.mutate()}
              type="submit"
              isLoading={updateProfileMutation.status === "pending"}
              style={{ padding: "4px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditionalInfo;
