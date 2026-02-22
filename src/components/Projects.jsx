import React from 'react';
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { projects } from "../constants/index";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from '../utils/motion';
import background from "../assets/background.webp";
// Importing sleek icons for the links and timeline dots
import { Github, ExternalLink, Rocket } from "lucide-react";

const ProjectCard = ({ project, index }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgba(29, 24, 54, 0.85)',
        color: "#fff",
        backdropFilter: "blur(16px)",
        borderRadius: "24px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        padding: "0" // Remove default padding to let the image hit the edges
      }}
      contentArrowStyle={{ 
        borderRight: "7px solid rgba(29, 24, 54, 0.85)",
      }}
      date={
        <span className="text-gray-400 font-bold tracking-wider text-sm md:text-base md:mx-4">
          {project.date}
        </span>
      }
      iconStyle={{
        background: "#151030",
        color: "#915eff",
        boxShadow: "0 0 20px rgba(145, 94, 255, 0.3)",
        border: "3px solid #915eff"
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <Rocket size={20} />
        </div>
      }
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        variants={fadeIn("up", "spring", index * 0.2, 1)}
        viewport={{ once: true }}
        className="flex flex-col h-full"
      >
        {/* Massive Project Cover Image */}
        <div className="relative w-full h-[230px] rounded-t-2xl overflow-hidden group">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          
          {/* Subtle dark overlay for contrast */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Floating Action Buttons for Github / Live Link */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-[-10px] group-hover:translate-y-0">
            {project.source_code_link && (
              <div 
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex justify-center items-center cursor-pointer hover:bg-white/20 hover:scale-110 transition-all"
                title="View Source Code"
              >
                <Github size={18} className="text-white" />
              </div>
            )}
            {project.live_demo_link && (
              <div 
                onClick={() => window.open(project.live_demo_link, "_blank")}
                className="w-10 h-10 rounded-full bg-purple-600/80 backdrop-blur-md border border-purple-400/50 flex justify-center items-center cursor-pointer hover:bg-purple-500 hover:scale-110 transition-all shadow-[0_0_15px_rgba(145,94,255,0.5)]"
                title="View Live Demo"
              >
                <ExternalLink size={18} className="text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Project Details Panel */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <h3 className="text-2xl font-black text-white tracking-tight hover:text-purple-400 transition-colors">
            {project.name}
          </h3>

          <p className="text-gray-300 mt-4 leading-relaxed font-light text-[15px] flex-grow">
            {project.description}
          </p>

          {/* Tech Stack Tags */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/10">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className={`px-3 py-1 rounded-md text-[13px] font-semibold tracking-wide transition-all ${tag.color} bg-white/5 border border-white/10 hover:border-white/30`}
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </VerticalTimelineElement>
  );
};

function Projects() {
  return (
    <section className="relative w-full min-h-screen pt-10 pb-20 overflow-hidden" id='project'> 
      {/* Background Layer - Set to absolute to stay inside the section */}
      <div 
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Animated Particles - Added pointer-events-none */}
      <div className="absolute inset-0 opacity-40 z-10 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
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

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={textVariant()}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm md:text-base tracking-widest text-teal-300 font-mono uppercase">
            My Work
          </p>
          <h2 className="text-4xl md:text-6xl font-black mt-2 text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects.</span>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 mx-auto rounded-full" 
          />
        </motion.div>

        <VerticalTimeline lineColor="rgba(255, 255, 255, 0.1)">
          {projects.map((project, index) => (
            <ProjectCard 
              key={`project-${index}`} 
              project={project}
              index={index} 
            />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
}

export default SectionWrapper(Projects, "project");