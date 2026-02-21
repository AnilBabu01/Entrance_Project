import React, { useState, useEffect, useContext } from "react";
import Inputbox from "@/components/Common/InputBox";
import Button from "@/components/Common/Button/Index";
import { UserContext } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/utils/config";

const Address = () => {
  const { user, refetchUser } = useContext(UserContext);
  const [state, setstate] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("state", state);
      formData.append("district", district);
      formData.append("city", city);

      const response = await axios.put(`${BASE_URL}/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("studyItToken")}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Address updated successfully!");

      refetchUser();
    },
   
  });

  useEffect(() => {
    if (user) {
      setcity(user.city);
      setstate(user.state);
      setdistrict(user.district);
    }
  }, [user]);

  return (
    <>
      <div className="bg-[#ffff] rounded-[16px] p-6 mb-7">
        <p className="font-semibold text-[25px]">Address</p>
        <div className="md:flex mb-4 mt-3 md:w-[80%] w-[100%]">
          <div className="md:w-[30%] w-[100%] mr-4">
            <Inputbox
              value={state}
              type="text"
              placeholder="Enter state"
              title="State"
              style={{
                border: "1px solid #333333",
               
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setstate(e.target.value)
              }
            />
          </div>
          <div className="md:w-[30%] w-[100%] md:mt-0 mt-3 ">
            <Inputbox
              value={district}
              type="text"
              placeholder="Enter district"
              title="District"
              style={{
                border: "1px solid #333333",
               
                marginTop: "5px",
                background: "#ffff",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setdistrict(e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex md:w-[80%] w-[100%]">
            <div className="md:w-[30%] w-[100%] md:mr-4">
              <Inputbox
                value={city}
                type="text"
                placeholder="Enter city"
                title="City/Street"
                style={{
                  border: "1px solid #333333",
                 
                  marginTop: "5px",
                  background: "#ffff",
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setcity(e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="md:w-[10rem] w-[100%] md:mt-0 mt-3">
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

export default Address;
