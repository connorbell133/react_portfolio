"use client";
import { useState } from "react";

import ArrowRight from "@/assets/arrow-right.svg";

function InputComponent() {
  // State to track the input text
  const [inputText, setInputText] = useState("");

  // Maximum character limit
  const maxCharacters = 1000;

  return (
    <div className="w-full p-4 bg-white rounded-lg">
      {/* Input Field */}
      <div className="flex justify-between items-center mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)} // Update input text
          placeholder="Ask whatever you want...."
          className="w-full p-3 text-lg resize-none border-none outline-none"
          maxLength={maxCharacters} // Set maximum character limit
          rows={4}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end items-end">
        {/* <div className="flex gap-4">
          <button className="flex items-center text-gray-500 text-sm">
            <span className="mr-2">➕</span> Add Attachment
          </button>
          <button className="flex items-center text-gray-500 text-sm">
            <span className="mr-2">🖼️</span> Use Image
          </button>
        </div> */}

        {/* Character Count and Send Button */}
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">
            {inputText.length}/{maxCharacters} {/* Dynamic character count */}
          </span>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-full">
            <ArrowRight className="h-6 w-6 inline-flex justify-center items-center" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const Chat = () => {
  const commonPrompts = [
    {
      text: "Write a to-do list for a personal project or task",
      icon: "👤",
    },
    {
      text: "Generate an email reply to a job offer",
      icon: "✉️",
    },
    {
      text: "Summarize this article or text for me in one paragraph",
      icon: "💬",
    },
    {
      text: "How does AI work in a technical capacity",
      icon: "⚙️",
    },
  ];

  return (
    <section className="flex justify-center items-center bg-gray-100">
      <div className="container w-[70%] mt-20 mb-20">
        {/* Greeting Section aligned to right*/}
        <div className="mb-6 mt-10 bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
          <h1 className="section-title text-start">Hi there,</h1>
          <h2 className="section-title text-start">
            What would you like to know?
          </h2>
          <p className="section-description text-m text-start">
            Use one of the most common prompts below or use your own to begin
          </p>
        </div>

        {/* Prompt Buttons */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full justify-between">
          {commonPrompts.map((prompt, index) => (
            <button
              key={index}
              className="w-full lg:w-[293px]  flex items-start gap-4 justify-between  lg:flex-col py-4 px-4 border border-[#E6E6E6] rounded-lg"
            >
              <span className="text-[14px] text-start tracking-tighter font-medium text-[#4F4D55]">
                {prompt.text}
              </span>
              <span className="hidden md:block content-s items-start">
                {prompt.icon}
              </span>
            </button>
          ))}
        </div>

        {/* Chat Section */}
        <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
          {/* Input Field */}
          <InputComponent />
        </div>
      </div>
    </section>
  );
};
