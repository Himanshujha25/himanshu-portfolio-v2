import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import background from "../assets/background.webp";
import { ChevronRight, ChevronDown, Terminal, Database, Code2 } from "lucide-react";

// 1. High-Density Data Structure Updated with Actual Subjects
const educationList = [
  {
    address: "0x1A4",
    degree: "Bachelor of Computer Applications",
    institution: "IMS Noida",
    year: "2024 - Present",
    status: "Active",
    percentage: "Pursuing",
    icon: <Terminal size={18} className="text-purple-400" />,
    highlights: [
      "Data Structures & Algorithms",
      "Full-Stack Web Development",
      "Triply: Hackathon Winning Project"
    ],
  },
  {
    address: "0x1B8",
    degree: "Higher Secondary (12th)",
    institution: "Nutan Vidya Mandir",
    year: "2023 - 2024",
    status: "Completed",
    percentage: "65%",
    icon: <Code2 size={18} className="text-cyan-400" />,
    highlights: [
      "Commerce Stream",
      "Accountancy & Business Studies",
      "Economics & Financial Concepts"
    ],
  },
  {
    address: "0x1C2",
    degree: "Secondary Education (10th)",
    institution: "Nutan Vidya Mandir",
    year: "2020 - 2021",
    status: "Completed",
    percentage: "65%",
    icon: <Database size={18} className="text-emerald-400" />,
    highlights: [
      "Mathematics & Science Core",
      "English & Hindi Literature",
      "Foundational Academics"
    ],
  }
];

// 2. The Node Component
const ListNode = ({ data, index, isLast }) => {
  const nextAddress = isLast ? "NULL" : educationList[index + 1].address;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col lg:flex-row items-center relative z-10"
    >
      <div className="w-full sm:w-[340px] bg-[#0d0914]/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(145,94,255,0.2)] hover:border-purple-500/40 transition-all duration-500 group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="bg-[#151030] px-4 py-3 border-b border-white/10 flex items-center justify-between font-mono text-[11px] sm:text-xs tracking-wider">
          <div className="flex gap-2 items-center">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-2 text-gray-400">Node_{index}.ts</span>
          </div>
          <span className="text-purple-400 font-bold">{data.address}</span>
        </div>

        <div className="p-5 sm:p-6 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/5 rounded-lg border border-white/5 shadow-inner">
              {data.icon}
            </div>
            <span className={`px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full border ${
              data.status === "Active" 
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30 animate-pulse" 
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            }`}>
              {data.status}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all">
            {data.degree}
          </h3>
          <p className="text-gray-400 font-medium text-sm mb-4">{data.institution}</p>

          <div className="space-y-2 mb-6">
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">Key Focus</p>
            {data.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm leading-relaxed">
                <span className="text-purple-500 mt-1">▹</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="font-mono text-xs text-gray-500">
              <span className="text-pink-400">let</span> year = <span className="text-yellow-300">"{data.year}"</span>;
            </div>
            <div className="font-bold text-cyan-300 text-sm">
              {data.percentage}
            </div>
          </div>
        </div>

        <div className="bg-[#151030] border-t border-white/10 px-4 py-3 font-mono text-[11px] sm:text-xs text-gray-400 flex justify-between group-hover:bg-[#1c153d] transition-colors">
          <span>this.next =</span>
          <span className={`font-bold tracking-wider ${isLast ? "text-red-400" : "text-cyan-400"}`}>
            {nextAddress};
          </span>
        </div>
      </div>

      {!isLast && (
        <div className="relative flex items-center justify-center p-4 lg:p-8 text-purple-500/50">
          <motion.div 
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] z-20"
            animate={{
              x: [0, 50, 0],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <ArrowRight size={40} strokeWidth={1.5} className="hidden lg:block group-hover:text-purple-400 transition-colors" />
          <ArrowDown size={40} strokeWidth={1.5} className="block lg:hidden group-hover:text-purple-400 transition-colors" />
        </div>
      )}
    </motion.div>
  );
};

const ArrowRight = ({ size, className, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ArrowDown = ({ size, className, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

function Education() {
  return (
    <section className="relative w-full min-h-screen py-24 flex flex-col justify-center overflow-hidden" id="education">
      <div 
        className="absolute inset-0 z-[-1] pointer-events-none"
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Updated Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[18px] text-teal-300 uppercase tracking-widest font-medium mb-2">
            My Academic Journey
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Education <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Timeline.</span>
          </h2>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-4 ml-0 lg:ml-10"
        >
          <div className="bg-purple-500/20 border border-purple-500/50 px-4 py-2 rounded-lg font-mono text-purple-300 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            head
          </div>
          <ArrowRight size={24} strokeWidth={2} className="text-purple-500 hidden lg:block animate-pulse" />
          <ArrowDown size={24} strokeWidth={2} className="text-purple-500 block lg:hidden animate-pulse" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center">
          {educationList.map((edu, index) => (
            <ListNode 
              key={index} 
              data={edu} 
              index={index} 
              isLast={index === educationList.length - 1} 
            />
          ))}

          {/* Restored NULL Node */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: educationList.length * 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center h-auto lg:h-[400px] mt-8 lg:mt-0"
          >
             
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(Education, "education");