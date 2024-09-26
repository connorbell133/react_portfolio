"use client";
import React, { useState, useEffect, useRef } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import { twMerge } from "tailwind-merge";

// ChatBox component
interface ChatBoxProps {
  messages: Array<{
    id: string;
    message: string;
    sender: string;
    text: string;
  }>;
}
interface Message {
  id: string;
  text: string;
  message: string; // Assuming this is an additional description or copy of text
  sender: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    messages.length > 0 && (
      <div
        ref={chatBoxRef}
        className="w-full p-4 bg-gray-100 rounded-lg mb-4 max-h-[400px] overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={twMerge(
              "p-2 mb-2 max-w-s rounded-lg ",
              message.sender === "user"
                ? "ml-auto text-right"
                : "mr-auto text-left"
            )}
          >
            <span className="text-gray-500 text-sm">
              {message.sender === "user" ? "You" : "Connor's Assistant"}
            </span>
            <br />
            {message.text}
          </div>
        ))}
      </div>
    )
  );
};

// InputComponent
interface InputComponentProps {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
}

function InputComponent({
  inputText,
  setInputText,
  sendMessage,
}: InputComponentProps) {
  const maxCharacters = 1000;

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
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

      <div className="flex justify-end items-end">
        <div className="flex items-center">
          <span className="text-gray-400 text-sm mr-4">
            {inputText.length}/{maxCharacters}
          </span>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full"
            onClick={sendMessage}
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

  // State to hold the chat messages and input
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [apiKey, setApiKey] = useState<string>(""); // New state for API key

  // Function to send a message
  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        message: inputText,
        sender: "user",
      };
      console.log("Sending message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText(""); // Clear input field

      try {
        const response = await fetch("/api/studio/ch_chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${apiKey}`, // Include API key in headers
          },
          body: JSON.stringify({ prompt: inputText, key: apiKey }),
        });

        const data = await response.json();

        if (response.ok) {
          const botMessage: Message = {
            id: Date.now().toString(),
            text: data.response,
            sender: "bot",
            message: data.response,
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          console.error("Error generating response:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Function to handle recommended prompt
  const sendRecMessage = async (recPrompt: string) => {
    console.log("Sending message:", recPrompt);
    const newMessage = {
      id: Date.now().toString(),
      text: recPrompt,
      sender: "user",
      message: recPrompt,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText(""); // Clear input field

    try {
      const response = await fetch("/api/studio/ch_chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${apiKey}`, // Include API key in headers
        },
        body: JSON.stringify({ prompt: inputText, key: apiKey }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = {
          text: data.response,
          sender: "bot",
          message: data.response,
          id: Date.now().toString(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        console.error("Error generating response:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle prompt button click
  const handlePromptClick = (promptText: string) => {
    sendRecMessage(promptText);
  };

  return (
    <section className="flex justify-center items-center bg-[#eeeeee]">
      <div className="container w-[60%] min-w-[350px] md:mt-20 mb-20">
        {/* Greeting Section */}
        <div className="mt-10 bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
          <h1 className="section-title text-start">Hi there,</h1>
          <h2 className="section-title text-start">
            What would you like to know?
          </h2>
          {/* Form for API key */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full justify-between">
            <input
              type="text"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)} // Update API key state
              className="w-full lg:w-[293px] py-4 px-4 border border-[#E6E6E6] rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              className="w-full lg:w-[293px] py-4 px-4 bg-gradient-to-r from-[#001E80] to-[#001a6b] text-white rounded-lg shadow-lg hover:shadow-xl hover:bg-gradient-to-l hover:from-[#002599] hover:to-[#001a6b] transition-all duration-300 ease-in-out"
              onClick={() => console.log("API Key submitted:", apiKey)} // Optional: Handle submit logic here
            >
              Submit
            </button>
          </div>
        </div>

        {/* Prompt Buttons - show only if there are no messages */}
        {messages.length === 0 && (
          <>
            <div className="w-[30%] min-w-[300px] relative mb-4">
              <p className="hidden md:block font-semibold text-[#a7a8ae] text-start">
                Use one of the most common prompts below or use your own to
                begin
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 mb-6 w-full justify-between">
              {commonPrompts.map((prompt, index) => (
                <button
                  key={index}
                  className="w-full lg:w-[293px] py-4 px-4 bg-[#3D3C3C] text-white rounded-lg hover:bg-[#4a4a4a]"
                  onClick={() => handlePromptClick(prompt.text)}
                >
                  {prompt.icon} {prompt.text}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ChatBox */}
        <ChatBox messages={messages} />

        {/* InputComponent */}
        <InputComponent
          inputText={inputText}
          setInputText={setInputText}
          sendMessage={sendMessage}
        />
      </div>
    </section>
  );
};

export default Chat;
