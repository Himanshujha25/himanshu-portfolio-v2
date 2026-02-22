import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import background from "../assets/background.webp";
// Importing a clean award icon
import { Award } from "lucide-react";

const certifications = [
  {
    id: 1,
    title: "HTML Introduction",
    description: "Learned the basics of HTML, including structure, elements, and semantic tags.",
    image: "/html.png",
  },
  {
    id: 2,
    title: "HTML & CSS Crash Course",
    description: "Gained hands-on experience in building modern, responsive web pages using HTML & CSS.",
    image: "/html&Css.png",
  },
  {
    id: 3,
    title: "Generative AI",
    description: "Explored AI models, prompt engineering, and real-world applications of Generative AI.",
    image: "/Generative.png",
  },
  {
    id: 4,
    title: "Frontend with Generative AI",
    description: "Integrated AI tools into frontend development to enhance user experience and automation.",
    image: "/frontend(GenAi).png",
  },
  {
    id: 5,
    title: "JavaScript Essentials",
    description: "Mastered core JavaScript concepts including ES6+, functions, and async programming.",
    image: "/javascript.png",
  },
  {
    id: 6,
    title: "Internal Hackathon Winner - IMS Noida",
    description: "Secured 2nd place at the IMS Noida Internal Hackathon with the AI-based travel planner project 'Triply'.",
    image: "/hackthon.jpg",
  },
  {
    id: 7,
    title: "Meta Front-End Developer Professional Certificate",
    description: "Successfully completed the Meta Professional Certificate, with a strong focus on building user interfaces using React.",
    image: "/react.jpg",
  },
  {
    id: 8,
    title: "Technology Job Simulation – Deloitte",
    description: "Gained hands-on experience in the software development lifecycle, built a Python-based dashboard to visualize telemetry data, and prepared a formal client proposal.",
    image: "/deloitte.jpg",
  },
  {
    id: 9,
    title: "Software Engineering Simulation – JPMorgan Chase & Co.",
    description: "Built and tested a Spring Boot microservice with Apache Kafka, implemented REST APIs, integrated an H2 database using Spring Data JPA. Gained exposure to enterprise-level backend workflows.",
    image: "/jpmorgon.jpg",
  }
];

const CertCard = ({ cert, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.75)}
    className="bg-[#151030]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(145,94,255,0.3)] hover:border-purple-500/50 group flex flex-col h-full"
  >
    {/* Image Container with Blending Gradient */}
    <div className="w-full h-[220px] relative overflow-hidden bg-black/40 p-6 flex justify-center items-center">
      {/* Gradient to blend image into the card body seamlessly */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#151030] via-[#151030]/20 to-transparent z-10" />
      
      <img
        src={cert.image}
        alt={cert.title}
        className="w-full h-full object-contain relative z-0 group-hover:scale-110 transition-transform duration-500 ease-out"
      />
      
      {/* Floating Award Badge */}
      <div className="absolute top-4 right-4 z-20 bg-purple-500/20 backdrop-blur-md border border-purple-500/50 w-10 h-10 rounded-full flex justify-center items-center shadow-[0_0_15px_rgba(145,94,255,0.3)]">
        <Award size={18} className="text-purple-300" />
      </div>
    </div>

    {/* Text Section (flex-grow ensures cards match heights) */}
    <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">
        {cert.title}
      </h3>
      <p className="mt-4 text-[14px] md:text-[15px] text-gray-400 leading-relaxed font-light flex-grow">
        {cert.description}
      </p>
    </div>
  </motion.div>
);

function Certification() {
  return (
    <section className="relative w-full min-h-screen py-20 overflow-hidden" id="certification">
      
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
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div variants={textVariant()} className="text-center mb-16 md:mb-24">
          <p className="text-sm md:text-base tracking-widest text-teal-300 font-mono uppercase mb-2">
            Continuous Learning
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white">
            Milestones & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Certifications.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mx-auto rounded-full" 
          />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionWrapper(Certification, "certification");