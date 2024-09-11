"use client";
import { useRef, useState, useEffect } from "react";
import ArrowRight from "@/assets/arrow-right.svg";

// ChatBox: Displays chat messages
// ChatBox: Displays chat messages
const ChatBox = ({ messages }) => {
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    messages.length > 0 && ( // Conditionally render ChatBox
      <div
        ref={chatBoxRef}
        className="w-full p-4 bg-gray-100 rounded-lg mb-4 max-h-64 overflow-y-auto "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className="p-2 mb-2 bg-white text-gray-800 rounded-lg shadow-sm"
          >
            {message}
          </div>
        ))}
      </div>
    )
  );
};

// InputComponent: A text input with dynamic character count and send button
function InputComponent({ inputText, setInputText, sendMessage }) {
  const maxCharacters = 1000;

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
      {/* Multiline Text Area */}
      <div className="flex justify-between items-center mb-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask whatever you want...."
          className="w-full p-3 text-lg resize-none border-none outline-none"
          maxLength={maxCharacters}
          rows={4}
        />
      </div>

      {/* Character Count and Send Button */}
      <div className="flex justify-end items-end">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">
            {inputText.length}/{maxCharacters}
          </span>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full"
            onClick={sendMessage} // Call sendMessage when clicked
          >
            <ArrowRight className="h-6 w-6 inline-flex justify-center items-center" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Chat Component
export const Chat = () => {
  const [commonPrompts] = useState([
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
  ]);

  // State to hold the chat messages
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  // Function to send a message
  const sendMessage = () => {
    if (inputText.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputText]);
      setInputText(""); // Clear input field after sending
    }
  };

  return (
    <section className="flex justify-center items-center bg-gray-100">
      <div className="container w-[70%] mt-20 mb-20">
        {/* Greeting Section */}
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
              className="w-full lg:w-[293px] flex items-start gap-4 justify-between lg:flex-col py-4 px-4 border border-[#E6E6E6] rounded-lg"
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

        {/* ChatBox: Display chat history */}
        <ChatBox messages={messages} />

        {/* Input Component */}
        <InputComponent
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMessage}
        />
      </div>
    </section>
  );
};
