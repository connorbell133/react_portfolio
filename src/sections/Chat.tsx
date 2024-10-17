"use client";
import React, { useRef, useState, useEffect } from "react";
import ArrowRight from "@/assets/arrow-right.svg";
import { twMerge } from "tailwind-merge";

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
        className="w-full p-4 bg-gray-100 rounded-lg mb-4 max-h-[400px] overflow-y-auto "
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
              {message.sender === "user" ? "You" : "Connors Assistant"}
            </span>
            <br />
            {message.text}
          </div>
        ))}
      </div>
    )
  );
};
interface InputComponentProps {
  inputText: string;
  setInputText: (text: string) => void;
  sendMessage: () => void;
}
// InputComponent: A text input with dynamic character count and send button
function InputComponent({
  inputText,
  setInputText,
  sendMessage,
}: InputComponentProps) {
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
  const [messages, setMessages] = useState<Message[]>([]); // Explicitly typing messages
  const [inputText, setInputText] = useState("");

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

  // Function to send a message
  const sendRecMessage = async (recPrompt: string) => {
    console.log("Sending message:", recPrompt);
    const newMessage = {
      id: Date.now().toString(),
      text: recPrompt,
      sender: "user",
      message: recPrompt,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText(""); // Clear input field after sending

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: recPrompt }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botMessage = {
        text: "",
        sender: "bot",
        message: "",
        id: Date.now().toString(),
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
  };

  // Handle click on recommended prompt buttons
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
                  className="w-full lg:w-[293px] flex items-start gap-4 justify-between lg:flex-col py-4 px-4 border border-[#E6E6E6] rounded-lg"
                  onClick={() => handlePromptClick(prompt.text)}
                >
                  <span className="text-[16px] text-start tracking-tighter font-semibold text-[#4F4D55]">
                    {prompt.text}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

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
