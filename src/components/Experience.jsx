import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import background from "../assets/background.webp";
// ==========================================
// 1. HIGH-DENSITY DATA STRUCTURE
// ==========================================
const experiences = [
  {
    id: "exp-1",
    title: "MERN Stack Intern",
    company_name: "E Sutra Technologies",
    company_link: "https://e-sutra.com/",
    date: "Jan 2026 - Present",
    iconBg: "bg-[#2b1845]",
    glowColor: "rgba(168, 85, 247, 0.6)", // Purple
    accent: "#a855f7",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Redux"],
    metrics: [
      { label: "Performance Boost", value: "+40%" },
      { label: "Uptime", value: "99.9%" }
    ],
    points: [
      "Developing and maintaining full-stack web applications utilizing MongoDB, Express.js, React, and Node.js in a fast-paced environment.",
      "Collaborating on dynamic user interfaces, ensuring highly responsive designs across all device viewpoints.",
      "Integrating robust backend architectures, focusing on secure RESTful API development and JWT authentication.",
      "Optimizing application performance, reducing initial load times, and ensuring seamless cross-browser compatibility."
    ],
    // Complex Custom SVG Icon
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-400">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "exp-2",
    title: "Full Stack Developer",
    company_name: "MN Consultancy Services (1MN.io)",
    company_link: "https://1mn.io",
    date: "Dec 2025 - Jan 2026",
    iconBg: "bg-[#183a30]",
    glowColor: "rgba(16, 185, 129, 0.6)", // Emerald
    accent: "#10b981",
    techStack: ["Vue 3", "TypeScript", "Pinia", "Vite", "Enterprise Architecture"],
    metrics: [
      { label: "Components Built", value: "50+" },
      { label: "Code Coverage", value: "85%" }
    ],
    points: [
      "Architected and developed complex, in-house enterprise software solutions tailored to streamline internal business operations.",
      "Leveraged the power of Vue 3 and TypeScript to build highly scalable, type-safe, and responsive interfaces for heavy business logic.",
      "Implemented advanced state management paradigms to handle complex data flows without performance degradation.",
      "Focused on building a highly modular, reusable component architecture, reducing future development time by an estimated 30%."
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-400">
        <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "exp-3",
    title: "Full Stack Developer",
    company_name: "Teonovo Web Agency",
    company_link: "https://teonvo.com",
    date: "Sep 2025 - Nov 2025",
    iconBg: "bg-[#1e293b]",
    glowColor: "rgba(56, 189, 248, 0.6)", // Sky Blue
    accent: "#38bdf8",
    techStack: ["MERN Stack", "Figma to Code", "AWS", "Stripe API"],
    metrics: [
      { label: "Projects Delivered", value: "3" },
      { label: "Client Satisfaction", value: "100%" }
    ],
    points: [
      "Engineered end-to-end full-stack solutions for high-ticket agency clients using the modern MERN stack.",
      "Spearheaded the complete development, database design, and cloud deployment of the Zipacres.com web platform.",
      "Translated complex Figma designs and client requirements into pixel-perfect, highly functional digital experiences.",
      "Integrated third-party APIs and payment gateways, ensuring secure and seamless transaction flows."
    ],
    iconSvg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400">
        <path d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
];

// ==========================================
// 2. SUB-COMPONENTS
// ==========================================

// Ambient Background Grid
const AmbientBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
    <div className="absolute w-full h-full" 
         style={{
           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
           backgroundSize: '40px 40px'
         }} 
    />
   
  </div>
);

// Tech Stack Pill
const TechPill = ({ tech, accentColor }) => (
  <motion.span 
    whileHover={{ y: -2, scale: 1.05 }}
    className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/10 text-gray-300 backdrop-blur-sm shadow-sm"
    style={{ textShadow: `0 0 8px ${accentColor}40` }}
  >
    {tech}
  </motion.span>
);

// Detail Modal Component
const DetailModal = ({ experience, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop blur */}
          <motion.div 
            className="absolute inset-0 bg-[#050816]/80 backdrop-blur-xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#110e1f] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[90vh] flex flex-col"
            style={{ boxShadow: `0 0 80px ${experience.glowColor}` }}
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-transparent to-white/5" />
              <div 
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px]"
                style={{ backgroundColor: experience.accent }}
              />
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{experience.title}</h3>
                  <a href={experience.company_link} target="_blank" rel="noreferrer" 
                     className="text-xl font-medium flex items-center gap-2 transition-colors"
                     style={{ color: experience.accent }}>
                    {experience.company_name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  <p className="text-gray-400 mt-2 font-mono text-sm tracking-widest">{experience.date}</p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/10 group"
                >
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Main Points */}
                <div className="md:col-span-2 space-y-6">
                  <h4 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2">Impact & Responsibilities</h4>
                  <ul className="space-y-4">
                    {experience.points.map((point, idx) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }}
                        key={idx} className="flex gap-4 text-gray-300 leading-relaxed"
                      >
                        <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_currentColor]" style={{ backgroundColor: experience.accent }} />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Core Tech</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.techStack.map((tech, idx) => (
                        <TechPill key={idx} tech={tech} accentColor={experience.accent} />
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <h4 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {experience.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
                          <p className="text-2xl font-black mb-1" style={{ color: experience.accent }}>{metric.value}</p>
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{metric.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==========================================
// 3. MAIN EXPERIENCE CARD (WITH SPOTLIGHT)
// ==========================================
const ExperienceCard = ({ experience, index, onClick }) => {
  const isEven = index % 2 === 0;
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  // Mouse Spotlight Effect Logic
  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className={`mb-16 md:mb-24 flex justify-between items-center w-full group cursor-pointer ${
        isEven ? "md:flex-row-reverse left-timeline" : "md:flex-row right-timeline"
      } flex-col relative z-10`}
      onClick={onClick}
    >
      {/* Desktop Spacer */}
      <div className="hidden md:block w-[45%]" />

      {/* Timeline Node (Glowing Icon) */}
      <div className="absolute left-[28px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full border-4 border-[#050816] bg-[#0f0c29] shadow-[0_0_20px_rgba(0,0,0,0.8)] z-20 group-hover:scale-110 transition-transform duration-500">
        <div 
          className="absolute inset-0 rounded-full blur-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ backgroundColor: experience.accent }}
        />
        <div className={`w-full h-full rounded-full flex items-center justify-center relative z-10 ${experience.iconBg} border border-white/10`}>
          {experience.iconSvg}
        </div>
      </div>

      {/* Actual Card with Spotlight border */}
      <div className="w-full md:w-[45%] pl-[80px] md:pl-0">
        <div 
          ref={divRef}
          onMouseMove={handleMouseMove}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden rounded-3xl bg-[#1d1836]/40 backdrop-blur-md border border-white/5 p-1 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
          style={{
            boxShadow: `0 10px 40px -10px ${experience.glowColor}`
          }}
        >
          {/* Spotlight Gradient Layer */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${experience.glowColor}, transparent 40%)`,
            }}
          />
          
          {/* Inner Card Content */}
          <div className="relative h-full bg-[#151030]/90 backdrop-blur-xl rounded-[23px] p-6 sm:p-8 z-10 border border-white/5">
            <div className="flex flex-col gap-2 relative z-20">
              <span className="text-sm font-mono tracking-widest uppercase mb-1" style={{ color: experience.accent }}>
                {experience.date}
              </span>
              <h3 className="text-white text-2xl sm:text-3xl font-black tracking-tight">
                {experience.title}
              </h3>
              <p className="text-gray-400 text-base font-medium">
                {experience.company_name}
              </p>
            </div>

            {/* Snippet / Preview Text */}
            <p className="mt-5 text-gray-300 text-sm leading-relaxed line-clamp-2">
              {experience.points[0]}
            </p>

            {/* Tech Stack Preview */}
            <div className="mt-6 flex flex-wrap gap-2">
              {experience.techStack.slice(0, 3).map((tech, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                  {tech}
                </span>
              ))}
              {experience.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                  +{experience.techStack.length - 3} more
                </span>
              )}
            </div>

            {/* Click to expand hint */}
            <div className="mt-6 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: experience.accent }}>
              <span>View Details</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. MAIN EXPORT COMPONENT
// ==========================================
// ==========================================
// 4. MAIN EXPORT COMPONENT
// ==========================================
function Experience() {
  const containerRef = useRef(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  
  // Advanced Scroll Logic for drawing the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative w-full min-h-screen py-24 overflow-hidden"
      >
        {/* 1. The Imported Background Image */}
        <div 
          className="absolute inset-0 z-[-1] pointer-events-none"
          style={{
            backgroundImage: `url(${background})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* 2. The Dotted Grid Overlay */}
        <AmbientBackground />

        {/* Section Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className={`${styles.sectionSubText} text-teal-300 tracking-[0.2em] uppercase font-mono mb-2`}>
              Career Trajectory
            </p>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
              Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">Experience.</span>
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-7xl mx-auto relative px-4 sm:px-6 z-10">
          
          {/* Static Background Line */}
          <div className="absolute left-[60px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated Scroll Line (Draws as you scroll) */}
          <motion.div 
            className="absolute left-[60px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-purple-500 via-emerald-500 to-sky-500 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)] origin-top z-0"
            style={{ height: lineHeight }}
          />

          {/* Render Cards */}
          <div className="flex flex-col relative z-10 pt-10">
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={experience.id} 
                experience={experience} 
                index={index} 
                onClick={() => setSelectedExperience(experience)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Controller */}
      <DetailModal 
        isOpen={!!selectedExperience} 
        experience={selectedExperience} 
        onClose={() => setSelectedExperience(null)} 
      />
    </>
  );
}

export default SectionWrapper(Experience, "work");
