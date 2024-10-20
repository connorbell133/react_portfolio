"use client";
import React, { useState, useEffect, useRef } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import { TextBox } from "@/components/chat_components/textbox";
import { Spotlight } from "@/components/chat_components/Spotlight";
import { LinkPreview } from "@/components/chat_components/LinkPreview";
import remarkGfm from "remark-gfm";

// ChatBox component
interface ChatBoxProps {
  messages: Array<{
    id: string;
    message: string;
    sender: string;
    text: string;
  }>;
}

// Function to parse message and replace links with LinkPreview components
// Function to parse message and replace links with LinkPreview components
const parseMessageWithLinks = (message: string) => {
  const urlRegex = /(\[([^\]]+)\]\((https?:\/\/[^\s]+)\))|(https?:\/\/[^\s]+)/g;
  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  message.replace(
    urlRegex,
    (match, markdownLink, text, url, plainUrl, offset) => {
      // Add text before the match
      if (offset > lastIndex) {
        elements.push(message.substring(lastIndex, offset));
      }

      if (markdownLink) {
        // Handle markdown link
        elements.push(
          <LinkPreview
            key={offset}
            url={url}
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
          >
            {text}
          </LinkPreview>
        );
      } else if (plainUrl) {
        // Handle plain URL
        elements.push(
          <LinkPreview
            key={offset}
            url={plainUrl}
            className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
          >
            {plainUrl}
          </LinkPreview>
        );
      }

      lastIndex = offset + match.length;
      return match;
    }
  );

  // Add remaining text after the last match
  if (lastIndex < message.length) {
    elements.push(message.substring(lastIndex));
  }

  return elements;
};
interface Message {
  id: string;
  text: string;
  message: string; // Assuming this is an additional description or copy of text
  sender: string;
}

const cleanMarkdown = (text: string) => {
  // add ```markdown to the
  return text.replace(/```([\s\S]*?)```/g, "$1");
};

const ChatBox = ({ messages }: { messages: Message[] }) => {
  return (
    messages.length > 0 && (
      <div className="p-4 text-sm md:text-l min-h-[60%] overflow-y-auto text-white">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex my-2 ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.sender === "user"
                  ? "bg-[#666a6d]/60 text-right rounded-xl md:rounded-full w-fit px-5 py-2 leading-6 md:leading-7"
                  : "text-left rounded-xl p-4 leading-6 md:leading-7"
              }`}
            >
              <span className="text-gray-500 text-sm">
                {message.sender === "user" ? "You" : "Connors Assistant"}
              </span>
              <br />
              {/* {parseMessageWithLinks(cleanMarkdown(message.text))} */}
              <ReactMarkdown
                className="prose prose-invert max-w-none text-white" // `prose` enables styling for Markdown
                remarkPlugins={[remarkGfm]} // Use remarkGfm for extended Markdown like tables and strikethrough
                components={{
                  a: ({ href, children }) => (
                    <LinkPreview
                      url={href!}
                      className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
                    >
                      {children}
                    </LinkPreview>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
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
          className="absolute right-2 bottom-2 bg-[#535557] text-white px-2 py-2  rounded-full hover:bg-[#0077c7] transition-all"
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
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ]);

  // State to hold the chat messages and input
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [apiKey, setApiKey] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    console.log("API Key submitted:", apiKey);
    setSubmitted(true); // Shrinks the form once submitted
  };
  // Function to send a message
  const sendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(), // Generate a unique id based on timestamp or use a proper UUID
        text: inputText,
        message: inputText, // Assuming 'message' is the same as 'text' here
        sender: "user",
      };
      console.log("Sending message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText(""); // Clear input field after sending

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputText }),
        });

        if (!response.body) throw new Error("No response body");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let botMessage: Message = {
          id: Date.now().toString(),
          text: "",
          sender: "bot",
          message: "",
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          botMessage.text += chunk;
          botMessage.message += chunk;

          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === botMessage.id ? botMessage : msg
            )
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <section className="h-screen w-screen flex-col overflow-hidden bg-black/[0.96]">
      <div className="h-full min-w-[400px] w-[60%] mx-auto flex flex-col align-middle justify-between max-w-[1000px] ">
        {/* Greeting Section */}
        <div className="items-center text-center mt-6 mb-4">
          {/* Form for API key
          <div className="flex justify-center gap-4 mt-6">
            <input
              type="text"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`py-3 px-5 text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 ${
                submitted
                  ? "w-[150px] max-w-[150px] bg-[#2b2b2b]"
                  : "w-full max-w-[320px] bg-[#1e1e1e]"
              }`}
            />
            <button
              className="px-6 py-3 bg-[#0057b7] text-white rounded-lg shadow-lg hover:bg-[#0077c7] hover:shadow-xl transition-all duration-300 ease-in-out"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div> */}
        </div>

        {/* ChatBox */}
        <ChatBox messages={messages} />

        {/* InputComponent */}
        <div className="py-5">
          <TextBox
            placeholders={commonPrompts}
            onChange={(e) => setInputText(e.target.value)}
            onSubmit={sendMessage}
          />
        </div>
      </div>
    </section>
  );
};

export default Chat;
