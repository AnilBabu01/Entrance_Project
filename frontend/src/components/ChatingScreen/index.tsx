import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import goSearch from "../../../public/assets/goSearch.svg";
import axios from "axios";

const Index = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false); // <-- Loading state

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const newMessage = { text: chatInput, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setChatInput("");
    setLoading(true); // <-- Set loading to true before API call

    try {
      const response = await axios.post("/api/chat", {
        message: chatInput,
        session_id: "ijjia",
        chatbot_type: "advanced",
      });

      if (response.data && response?.data?.response) {
        const botMessage = { text: response?.data?.response, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false); // <-- Set loading to false after response
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <Head>
        <title>Chat | Study IT Nepal</title>
      </Head>

      <div className="flex flex-col w-full justify-center items-center">
        {/* Chat messages */}
        <div className="w-full md:max-w-[85%] mb-20 p-4 overflow-y-auto max-h-[80vh] flex flex-col gap-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-[#F7F7F7] text-black"
                    : "bg-[#F7F7F7] text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loader */}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-[#F7F7F7] text-black">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Chat input box */}
        <div className="fixed bottom-0 w-full flex justify-center p-4 bg-white shadow-md">
          <div className="w-full md:max-w-[85%]">
            <div className="p-2 w-full flex justify-between items-center border border-[#E6E6E6] rounded-[100px] bg-[#F7F7F7]">
              <input
                className="w-full ml-5 bg-[#F7F7F7] border-none outline-none appearance-none text-gray-900 placeholder-gray-500"
                placeholder="How can we assist you today?"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown} // <-- Handle Enter key
              />
              <div
                className="bg-[#007BB3] p-4 rounded-[100px] cursor-pointer"
                onClick={sendMessage}
              >
                <Image src={goSearch} height={15} width={15} alt="goSearch" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
