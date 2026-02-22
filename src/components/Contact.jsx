import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import background from "../assets/background.webp";
import { Send, Github, Linkedin, Twitter, Mail, Sparkles } from "lucide-react";

const Contact = () => {
  return (
    <section 
      id="contact"
      className="relative w-full min-h-screen py-24 overflow-hidden flex flex-col justify-center"
    >
      {/* Absolute Background Layer */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Animated Floating Particles */}
      <div className="absolute inset-0 opacity-30 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Header Section */}
        <motion.div variants={textVariant()} className="text-center mb-16 md:mb-20">
          <p className="text-sm md:text-base tracking-widest text-teal-300 font-mono uppercase mb-2">
            Let's Collaborate
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">With Me.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mx-auto rounded-full" 
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 w-full max-w-6xl">
          
          {/* Left Side: Contact Content */}
          <motion.div 
            variants={fadeIn("right", "spring", 0.2, 1)}
            className="flex flex-col justify-center w-full lg:w-1/2"
          >
            <div className="flex items-center gap-2 mb-4">
               <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-tighter">Available for Hire</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Have a project <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-black">in mind?</span>
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
              I specialize in building high-performance MERN stack applications and immersive 3D interfaces. Reach out, and let's turn your ideas into digital reality.
            </p>

            {/* Social Connection Hub */}
            <div className="flex flex-wrap gap-5">
              {[
                { icon: <Mail size={22} />, link: "mailto:jhahimanshu930@gmail.com", color: "hover:text-purple-400 hover:shadow-purple-500/40" },
                { icon: <Github size={22} />, link: "https://github.com/himanshujha25", color: "hover:text-white hover:shadow-white/20" },
                { icon: <Linkedin size={22} />, link: "https://www.linkedin.com/in/himanshu-jha-85021a318", color: "hover:text-cyan-400 hover:shadow-cyan-500/40" },
                { icon: <Twitter size={22} />, link: "https://twitter.com/jhahimanshu930", color: "hover:text-blue-400 hover:shadow-blue-500/40" }
              ].map((social, idx) => (
                <a 
                  key={idx}
                  href={social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-14 h-14 rounded-2xl bg-[#151030]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:-translate-y-2 hover:border-white/30 shadow-xl ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Professional Glass Form */}
          <motion.div 
            variants={fadeIn("left", "spring", 0.4, 1)}
            className="w-full lg:w-1/2"
          >
            <form
              action="https://formsubmit.co/jhahimanshu930@gmail.com"
              method="POST"
              className="bg-[#0c0c1d]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col gap-6 group relative"
            >
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-bold uppercase tracking-widest ml-1">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project..."
                  rows="4"
                  required
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-5 rounded-2xl font-black text-lg tracking-wide hover:shadow-[0_0_30px_rgba(145,94,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3"
              >
                Launch Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default SectionWrapper(Contact, "contact");