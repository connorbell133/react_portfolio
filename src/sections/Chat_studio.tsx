"use client";
import React, { useState, useEffect, useRef } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
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

const cleanMarkdown = (text: string) => {
  return text.replace(/```markdown([\s\S]*?)```/g, "$1");
};

const ChatBox = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="p-4 text-m md:text-2xl h-[60%] overflow-y-auto text-white">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex my-2 ${
            msg.sender === "bot" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`${
              msg.sender === "bot"
                ? " text-left rounded-xl p-4"
                : "bg-[#666a6d]/60 text-right rounded-xl md:rounded-full w-fit px-5 py-2"
            }`}
          >
            {msg.sender === "bot" ? (
              <ReactMarkdown className="prose prose-invert max-w-none text-white">
                {cleanMarkdown(msg.text)}
              </ReactMarkdown>
            ) : (
              <p className="text-white">{msg.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
    }
  }, [inputText]);

  return (
    <div className="text-base px-3 md:px-4 w-full h-fit md:px-5 lg:px-4 xl:px-5">
      <div className="relative flex items-center mb-4 w-full">
        <textarea
          ref={textareaRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask whatever you want...."
          className="w-full p-4  rounded-full text-lg bg-[#333333] text-white resize-none border-none outline-none overflow-y-hidden pr-12"
          maxLength={maxCharacters}
          rows={1} // Start with 1 row, auto-expands as needed
        />
        {/* Send button inside the textarea container */}
        <button
          className="absolute right-2 bottom-1 bg-[#535557] text-white px-2 py-2  rounded-full hover:bg-[#0077c7] transition-all"
          onClick={sendMessage}
        >
          <ArrowRight className="h-6 w-6 inline-flex justify-center items-center" />
        </button>
      </div>

      <div className="flex justify-end items-end h-fit">
        <span className="text-gray-400 text-sm">
          {inputText.length}/{maxCharacters}
        </span>
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
  const [apiKey, setApiKey] = useState<string>("");

  // Function to send a message
  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        message: inputText,
        sender: "user",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");

      try {
        const response = await fetch("/api/studio/ch_chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

  return (
    <section className="h-screen w-screen flex-col overflow-hidden bg-[#212121]">
      <div className="h-full min-w-[400px] w-[60%] mx-auto flex flex-col align-middle justify-between">
        <div className="topsection flex justify-between items-center p-4 ">
          <h1 className="text-2xl text-white">Childhelp Assistant</h1>
          {/* <div className="flex gap-4">
            <button className="text-white">Home</button>
            <button className="text-white">About</button>
            <button className="text-white">Contact</button>
          </div> */}
        </div>

        {/* Greeting Section */}
        <div className="items-center text-center mt-6 mb-4">
          <h1 className="text-4xl text-white">Hi there,</h1>
          <h2 className="text-2xl text-gray-400">
            What would you like to know?
          </h2>

          {/* Form for API key */}
          <div className="flex justify-center gap-4 mt-4">
            <input
              type="text"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full max-w-[300px] py-2 px-4 bg-[#333333] text-white rounded-md border-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="px-4 py-2 bg-[#0057b7] text-white rounded-md hover:bg-[#0077c7] transition-all"
              onClick={() => console.log("API Key submitted:", apiKey)}
            >
              Submit
            </button>
          </div>
        </div>

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
