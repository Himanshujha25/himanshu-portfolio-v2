import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSun, FaMoon } from "react-icons/fa";

/* ---------------------------
   MESSAGE RENDERER
--------------------------- */
const renderMessage = (text) => {
  // CODE BLOCK
  if (text.includes("```")) {
    const code = text.split("```")[1] || "";
    return (
        <pre className="bg-black text-green-400 p-3 rounded-lg text-sm overflow-x-auto">
        {code}
      </pre>
    );
  }

  // LINK DETECTION (SAFE)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
      <>
        {parts.map((part, i) =>
            part.match(urlRegex) ? (
                <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-all"
                >
                  {part}
                </a>
            ) : (
                <span key={i}>{part}</span>
            )
        )}
      </>
  );
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("dark");
  const [typing, setTyping] = useState(false);
  const [blink, setBlink] = useState(true);
  const [tooltip, setTooltip] = useState(true);
  const [notify, setNotify] = useState(true);

  const chatEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      from: "bot",
      text:
          "Hi 👋 I’m Himanshu’s AI assistant. You can ask me about his skills, projects, experience, or contact details.",
    },
  ]);

  /* ---------------------------
     AUTO SCROLL
  --------------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ---------------------------
     WELCOME VOICE
  --------------------------- */
  useEffect(() => {
    const msg = new SpeechSynthesisUtterance(
        "Welcome to my portfolio. Click the AI icon to explore my work."
    );
    setTimeout(() => speechSynthesis.speak(msg), 600);

    setTimeout(() => setBlink(false), 9000);
    setTimeout(() => setTooltip(false), 6000);
    setTimeout(() => setNotify(false), 8000);
  }, []);

  /* ---------------------------
     BACKEND CALL
  --------------------------- */
  const sendToBackend = async (message) => {
    try {
      const res = await fetch(
          "https://himanshu-portfolio-6bd7.onrender.com/api/chat",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          }
      );
      const data = await res.json();
      return data.reply;
    } catch {
      return "⚠️ Server not responding. Please try again later.";
    }
  };

  /* ---------------------------
     SEND MESSAGE
  --------------------------- */
  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setTyping(true);

    const reply = await sendToBackend(message);

    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  };

  const handleSend = () => {
    sendMessage(input);
    setInput("");
  };

  /* ---------------------------
     QUICK QUESTIONS
  --------------------------- */
  const quickQuestions = [
    "Show Himanshu's projects",
    "What skills does Himanshu have?",
    "How can I contact Himanshu?",
  ];

  /* ---------------------------
     THEMES
  --------------------------- */
  const themes = {
    dark: "bg-[#1D1836] text-white",
    light: "bg-white text-black",
    gold: "bg-[#2b2410] text-yellow-300",
  };

  return (
      <div className="fixed bottom-5 right-5 z-[999]">
        {tooltip && !isOpen && (
            <div className="absolute bottom-20 right-2 bg-black text-white text-xs px-3 py-1 rounded-md animate-pulse">
              Need help?
            </div>
        )}

        {notify && !isOpen && (
            <div className="absolute bottom-28 right-0 bg-yellow-400 text-black text-xs px-3 py-1 rounded-md animate-bounce">
              Ask me anything!
            </div>
        )}

        {isOpen ? (
            <div
                className={`w-80 h-[520px] rounded-2xl shadow-2xl flex flex-col border ${themes[theme]}`}
            >
              {/* HEADER */}
              <div className="p-4 flex justify-between items-center rounded-t-2xl bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black">
                <span className="font-semibold text-lg">AI Assistant</span>
                <div className="flex gap-3">
                  <button
                      onClick={() =>
                          setTheme(theme === "dark" ? "light" : theme === "light" ? "gold" : "dark")
                      }
                  >
                    {theme === "dark" ? <FaSun /> : <FaMoon />}
                  </button>
                  <FaTimes
                      className="cursor-pointer"
                      onClick={() => {
                        setIsOpen(false);
                        speechSynthesis.cancel();
                      }}
                  />
                </div>
              </div>

              {/* CHAT */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 rounded-xl max-w-[85%] text-sm shadow ${
                            msg.from === "user"
                                ? "ml-auto bg-[#FFD700] text-black"
                                : "bg-gray-700 text-white"
                        }`}
                    >
                      {renderMessage(msg.text)}
                    </div>
                ))}

                {typing && (
                    <div className="bg-gray-700 text-white px-4 py-2 rounded-xl inline-block">
                      typing...
                    </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* QUICK BUTTONS */}
              <div className="p-2 flex gap-2 overflow-x-auto">
                {quickQuestions.map((q, i) => (
                    <button
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs bg-gray-800 text-white"
                        onClick={() => sendMessage(q)}
                    >
                      {q}
                    </button>
                ))}
              </div>

              {/* INPUT */}
              <div className="p-3 flex items-center border-t bg-[#16122a] rounded-b-2xl">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
                />
                <FaPaperPlane
                    className="ml-3 text-yellow-400 cursor-pointer"
                    onClick={handleSend}
                />
              </div>
            </div>
        ) : (
            <button
                className={`bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-4 rounded-full shadow-xl ${
                    blink ? "animate-bounce" : ""
                }`}
                onClick={() => {
                  setIsOpen(true);
                  setBlink(false);
                  speechSynthesis.cancel();
                }}
            >
              <FaRobot size={26} />
            </button>
        )}
      </div>
  );
};

export default ChatBot;
