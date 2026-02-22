import React from "react";
import { motion } from "framer-motion";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import background from "../assets/background.webp";

const TechCard = ({ index, name, icon }) => {
  return (
    <motion.div
      // Animates each card in sequentially based on its index
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      // Floating hover effect
      whileHover={{ y: -10 }}
      className="w-28 h-32 sm:w-32 sm:h-36 md:w-40 md:h-44 flex flex-col justify-center items-center 
                 bg-[#151030]/80 backdrop-blur-xl rounded-2xl border border-white/10 
                 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:border-purple-500/50 
                 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 group relative overflow-hidden"
    >
      {/* Subtle bottom glow that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Logo */}
      <img 
        src={icon} 
        alt={name} 
        className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain z-10 filter transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
      />
      
      {/* Tech Name */}
      <p className="mt-4 text-xs sm:text-sm md:text-base font-bold text-gray-400 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all z-10 text-center tracking-wider">
        {name}
      </p>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <section className="relative w-full min-h-screen py-10 flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Layer */}
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

      {/* Animated Particles */}
      <div className="absolute inset-0 opacity-40 z-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header Section */}
        <motion.div variants={textVariant()} className="text-center mb-16 md:mb-20">
          <p className="text-sm md:text-base tracking-widest text-teal-300 font-mono uppercase mb-2">
            My Arsenal
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Technologies <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">I Know.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mx-auto rounded-full" 
          />
        </motion.div>

        {/* Technology Grid */}
        <div className="flex flex-row flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
          {technologies.map((technology, index) => (
            <TechCard 
              key={technology.name} 
              index={index} 
              name={technology.name} 
              icon={technology.icon} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");