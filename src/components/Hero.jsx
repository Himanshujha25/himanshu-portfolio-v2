import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import Avatar from "./canvas/Avatar";
import background from "../assets/background.webp";

function Hero() {
  return (
    <section className="w-full min-h-[100dvh] lg:h-screen relative overflow-hidden flex items-center pt-20 lg:pt-0">
      
      {/* ===== BACKGROUND ===== */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* ===== FLOATING PARTICLES ===== */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -150],
              x: [0, (Math.random() - 0.5) * 50],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ===== CONTENT ===== */}
      <div className={`${styles.paddingX} max-w-7xl mx-auto relative z-20 w-full`}>
        {/* Container naturally stacks Text first, then Avatar on mobile */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
          
          {/* ================= LEFT : PREMIUM GLASS CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="
              relative w-full max-w-[580px]
              bg-[#050505]/40 backdrop-blur-2xl
              border-t border-l border-white/20 border-b border-r border-white/5
              rounded-[2.5rem]
              p-8 sm:p-10 lg:p-12
              shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]
              overflow-hidden
              text-center lg:text-left
              /* Removed the order CSS here so it stays on top for mobile */
            "
          >
            {/* SUBTLE INNER LIGHTING */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-purple-500/20 blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-cyan-500/20 blur-[80px] pointer-events-none" />

            {/* CONTENT */}
            <div className="relative z-10 flex flex-col items-center lg:items-start">
              
              {/* Role Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-300 uppercase">
                  Available for work
                </span>
              </div>

              <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                Hi, I'm <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-500 drop-shadow-lg">
                  Himanshu Jha
                </span>
              </h1>

              <h2 className="text-lg sm:text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wide uppercase">
                Full Stack Developer & Digital Innovator
              </h2>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md font-medium">
                Architecting scalable web applications and immersive digital experiences. 
                I bridge the gap between complex engineering and pixel-perfect 3D design.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (window.location.href = "#project")}
                  className="px-8 py-4 bg-white text-black rounded-2xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all"
                >
                  Explore Projects
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => (window.location.href = "#contact")}
                  className="px-8 py-4 rounded-2xl font-bold text-white text-sm tracking-wide border border-white/20 hover:border-white/50 transition-all bg-transparent"
                >
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* ================= RIGHT : AVATAR ================= */}
          <motion.div
            className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[650px] flex items-center justify-center relative z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-10, 10, -10],
            }}
            transition={{
              opacity: { duration: 1, delay: 0.2 },
              scale: { duration: 1, delay: 0.2 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            {/* Optional glow behind avatar */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl rounded-full scale-75 -z-10 pointer-events-none" />
            <Avatar />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Hero;