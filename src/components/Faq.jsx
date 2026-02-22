import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import background from "../assets/background.webp";
import { Plus, Minus, MessageCircleQuestion } from "lucide-react";

const FAQCard = ({ faq, index, activeIndex, setActiveIndex }) => {
  const isActive = index === activeIndex;

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className={`mb-4 relative overflow-hidden rounded-2xl backdrop-blur-xl transition-all duration-300 ${
        isActive 
          ? "bg-[#1d1836]/90 border border-purple-500/50 shadow-[0_0_30px_rgba(145,94,255,0.15)]" 
          : "bg-[#151030]/60 border border-white/10 hover:border-white/20 hover:bg-[#151030]/80"
      }`}
    >
      <button 
        onClick={() => setActiveIndex(isActive ? null : index)}
        className="w-full flex justify-between items-center text-left p-6 sm:px-8 sm:py-6 group"
      >
        <div className="flex items-center gap-4 pr-4">
          <MessageCircleQuestion 
            size={20} 
            className={`flex-shrink-0 transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-purple-500 group-hover:text-purple-400"}`} 
          />
          <h3 className={`text-base sm:text-lg font-bold tracking-wide transition-colors duration-300 ${
            isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400" : "text-white group-hover:text-gray-200"
          }`}>
            {faq.question}
          </h3>
        </div>
        
        {/* Animated Plus/Minus Icon */}
        <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center transition-all duration-300 border ${
          isActive ? "bg-purple-500/20 border-purple-500/50 text-purple-400" : "bg-white/5 border-white/10 text-gray-400 group-hover:bg-white/10"
        }`}>
          <motion.div
            initial={false}
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isActive ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
          </motion.div>
        </div>
      </button>

      {/* Smooth Accordion Body Animation */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-gray-400 text-sm sm:text-base leading-relaxed border-t border-white/5 mt-2 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden" id="faq">
      
      {/* Absolute Background Layer */}
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Animated Floating Particles */}
      <div className="absolute inset-0 opacity-30 z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Section Header */}
        <motion.div 
          variants={textVariant()}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-sm md:text-base tracking-widest text-teal-300 font-mono uppercase mb-2">
            Have Questions?
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Frequently <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Asked.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mx-auto rounded-full" 
          />
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="w-full">
          {faqs.map((faq, index) => (
            <FAQCard 
              key={`faq-${index}`} 
              faq={faq} 
              index={index} 
              activeIndex={activeIndex} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(FAQ, "faq");