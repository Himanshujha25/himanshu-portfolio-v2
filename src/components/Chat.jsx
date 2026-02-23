import React, { useState, useRef, useEffect } from "react";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaSun,
  FaMoon,
  FaTerminal,
} from "react-icons/fa";

/* ---------------------------
   SAFE SPEECH SYNTHESIS
--------------------------- */
const speak = (text) => {
  if (!("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  synth.cancel(); // clear queue

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.9;
  utterance.pitch = 1;

  const loadVoicesAndSpeak = () => {
    const voices = synth.getVoices();
    if (voices.length) {
      utterance.voice =
        voices.find((v) => v.lang === "en-US") || voices[0];
      synth.speak(utterance);
    }
  };

  if (synth.getVoices().length) {
    loadVoicesAndSpeak();
  } else {
    synth.onvoiceschanged = loadVoicesAndSpeak;
  }
};

/* ---------------------------
   MESSAGE RENDERER
--------------------------- */
const renderMessage = (text) => {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith("```")) {
      return (
        <pre
          key={index}
          className="bg-[#050505] text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono border border-white/10 my-2"
        >
          <code>{part.replace(/```/g, "").trim()}</code>
        </pre>
      );
    }

    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return part.split(urlRegex).map((sub, i) =>
      sub.match(urlRegex) ? (
        <a
          key={i}
          href={sub}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 underline break-all"
        >
          {sub}
        </a>
      ) : (
        sub
      )
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

  /* ---------------------------
     AUTO SCROLL
  --------------------------- */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ---------------------------
     TOOLTIP LIFECYCLE
  --------------------------- */
  useEffect(() => {
    setTimeout(() => setBlink(false), 8000);
    setTimeout(() => setTooltip(false), 5000);
    setTimeout(() => setNotify(false), 7000);
  }, []);

  /* ---------------------------
     BACKEND CALL
  --------------------------- */
  const sendToBackend = async (message) => {
    try {
      const res = await fetch(
        "https://himanshu-portfolio-v2-iv3t.onrender.com/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      return data.reply;
    } catch {
      return "⚠️ Server is busy. Please try again.";
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

  /* ---------------------------
     OPEN / CLOSE HANDLERS
  --------------------------- */
  const handleOpen = () => {
    setIsOpen(true);
    setBlink(false);

    speak(
      "Welcome to my portfolio! Feel free to ask me anything about my work, skills, or how to get in touch."
    );
  };

  const handleClose = () => {
    window.speechSynthesis.cancel();
    setIsOpen(false);
  };

  const themes = {
    dark: "bg-[#100d25] border-white/10 text-white",
    light: "bg-gray-50 border-gray-200 text-gray-900",
    gold: "bg-[#1c1910] border-yellow-500/30 text-yellow-100",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      {!isOpen && (
        <>
          {tooltip && (
            <div className="absolute bottom-20 right-2 bg-black/80 text-white text-[10px] px-3 py-1.5 rounded-lg">
              Need help?
            </div>
          )}
          {notify && (
            <div className="absolute bottom-28 right-0 bg-yellow-400 text-black text-[10px] font-bold px-3 py-1.5 rounded-full animate-bounce">
              ASK ME ANYTHING!
            </div>
          )}
        </>
      )}

      {isOpen ? (
        <div
          className={`w-80 sm:w-96 h-[550px] rounded-3xl shadow-2xl flex flex-col border overflow-hidden ${themes[theme]}`}
        >
          {/* HEADER */}
          <div className="p-5 flex justify-between bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <span className="font-bold">Himanshu AI</span>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setTheme(
                    theme === "dark" ? "light" : theme === "light" ? "gold" : "dark"
                  )
                }
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </button>
              <button onClick={handleClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          {/* CHAT */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    msg.from === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  {renderMessage(msg.text)}
                </div>
              </div>
            ))}

            {typing && (
              <div className="text-xs text-gray-400 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl px-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about my work..."
                className="flex-1 py-2 bg-transparent outline-none text-sm"
              />
              <button onClick={() => sendMessage(input)}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOpen}
          className={`bg-gradient-to-br from-purple-600 to-blue-600 p-5 rounded-full shadow-xl ${
            blink ? "animate-bounce" : ""
          }`}
        >
          <FaRobot size={28} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;