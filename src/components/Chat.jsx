import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaSun, FaMoon, FaTerminal } from "react-icons/fa";

/* ---------------------------
    IMPROVED MESSAGE RENDERER
--------------------------- */
const renderMessage = (text) => {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    // Check if part is a code block
    if (part.startsWith("```") && part.endsWith("```")) {
      const code = part.replace(/```/g, "").trim();
      return (
        <div key={index} className="my-2 relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
            <FaTerminal className="text-xs text-green-400" />
          </div>
          <pre className="bg-[#050505] text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono border border-white/10">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Link Detection
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const subParts = part.split(urlRegex);

    return (
      <span key={index}>
        {subParts.map((subPart, i) =>
          subPart.match(urlRegex) ? (
            <a
              key={i}
              href={subPart}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline break-all hover:text-cyan-300 transition-colors"
            >
              {subPart}
            </a>
          ) : (
            subPart
          )
        )}
      </span>
    );
  });
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
      text: "Hi 👋 I’m Himanshu’s AI assistant. Ask me about his skills, projects, or how to contact him!",
    },
  ]);

  // Auto Scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Welcome Voice & Lifecycle
  useEffect(() => {
    const welcome = () => {
      const msg = new SpeechSynthesisUtterance(
        "Welcome to my portfolio. I am your AI assistant."
      );
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    };

    const timer = setTimeout(welcome, 1500);
    setTimeout(() => setBlink(false), 8000);
    setTimeout(() => setTooltip(false), 5000);
    setTimeout(() => setNotify(false), 7000);

    return () => {
      clearTimeout(timer);
      window.speechSynthesis.cancel();
    };
  }, []);

  const sendToBackend = async (message) => {
    try {
      const res = await fetch("[https://himanshu-portfolio-6bd7.onrender.com/api/chat](https://himanshu-portfolio-6bd7.onrender.com/api/chat)", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      return data.reply;
    } catch {
      return "⚠️ The server is taking a nap. Please try again in a moment!";
    }
  };

  const sendMessage = async (message) => {
    if (!message.trim() || typing) return;

    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setInput("");
    setTyping(true);

    const reply = await sendToBackend(message);

    setTyping(false);
    setMessages((prev) => [...prev, { from: "bot", text: reply }]);
  };

  const themes = {
    dark: "bg-[#100d25] border-white/10 text-white",
    light: "bg-gray-50 border-gray-200 text-gray-900",
    gold: "bg-[#1c1910] border-yellow-500/30 text-yellow-100",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {/* Tooltips */}
      {!isOpen && (
        <>
          {tooltip && (
            <div className="absolute bottom-20 right-2 bg-black/80 backdrop-blur-md text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
              Need help?
            </div>
          )}
          {notify && (
            <div className="absolute bottom-28 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg animate-bounce whitespace-nowrap">
              ASK ME ANYTHING!
            </div>
          )}
        </>
      )}

      {isOpen ? (
        <div className={`w-80 sm:w-96 h-[550px] rounded-3xl shadow-2xl flex flex-col border backdrop-blur-xl overflow-hidden transition-all duration-300 ${themes[theme]}`}>
          {/* HEADER */}
          <div className="p-5 flex justify-between items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]" />
              <span className="font-bold tracking-tight">Himanshu AI</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : theme === "light" ? "gold" : "dark")}
                className="hover:scale-110 transition-transform"
              >
                {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <FaTimes />
              </button>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-600">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "bg-purple-600 text-white rounded-tr-none shadow-md"
                      : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none"
                  } ${theme === 'light' && msg.from !== 'user' ? 'bg-gray-200 text-gray-800 border-none' : ''}`}
                >
                  {renderMessage(msg.text)}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-gray-400 px-4 py-2 rounded-2xl text-xs italic animate-pulse">
                  AI is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* QUICK BUTTONS */}
          <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar">
            {["Projects", "Skills", "Contact"].map((label, i) => (
              <button
                key={i}
                className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-purple-600 hover:text-white transition-all whitespace-nowrap"
                onClick={() => sendMessage(`Show me Himanshu's ${label}`)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* INPUT AREA */}
          <div className={`p-4 border-t ${theme === 'light' ? 'bg-white' : 'bg-black/20'}`}>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about my work..."
                className="flex-1 py-2 bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
              <button 
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="text-purple-500 hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-all"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* CLOSED STATE BOT BUTTON */
        <button
          className={`relative group bg-gradient-to-br from-purple-600 to-blue-600 p-5 rounded-full shadow-[0_0_20px_rgba(145,94,255,0.4)] hover:shadow-[0_0_30px_rgba(145,94,255,0.6)] transition-all duration-300 ${
            blink ? "animate-bounce" : ""
          }`}
          onClick={() => {
            setIsOpen(true);
            setBlink(false);
            window.speechSynthesis.cancel();
          }}
        >
          <FaRobot size={28} className="text-white group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#151030] rounded-full" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;