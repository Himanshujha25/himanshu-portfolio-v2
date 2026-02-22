import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants";
import logo from "../assets/logo.webp";
import { Menu, X, ExternalLink } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar Background Toggle
      setScrolled(window.scrollY > 50);

      // 2. ScrollSpy: Automatically detect active section
      const sections = navLinks
        .filter((link) => !link.external)
        .map((link) => document.getElementById(link.id));
        
      let currentSection = "";
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          // Trigger when the section reaches the top third of the screen
          if (window.scrollY >= sectionTop - 300) {
            currentSection = section.getAttribute("id");
          }
        }
      });

      if (currentSection) {
        setActive(currentSection);
      } else if (window.scrollY < 100) {
        setActive(""); // Reset to home when at the very top
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggle && !event.target.closest(".mobile-menu-container") && !event.target.closest(".menu-trigger")) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [toggle]);

  const handleNavClick = (e, link) => {
    if (!link.external) {
      e.preventDefault();
      setActive(link.id);
      setToggle(false);

      if (link.id === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const element = document.getElementById(link.id);
        if (element) {
          const navHeight = document.querySelector("nav").offsetHeight;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: "smooth",
          });
        }
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className={`${styles.paddingX} w-full fixed top-0 z-[100] transition-all duration-500 ease-in-out ${
        scrolled 
          ? "bg-[#050505]/70 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Logo and Name */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={(e) => handleNavClick(e, { id: "", external: false })}
        >
          <div className="relative">
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={logo} 
              alt="logo" 
              className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-full border border-white/10 group-hover:border-yellow-500/50 transition-colors duration-300 relative z-10" 
            />
          </div>
          <p className="text-xl md:text-2xl font-bold tracking-wide cursor-pointer text-white">
            Himanshu <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Jha</span>
          </p>
        </Link>
       
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 items-center">
          {navLinks.map((link) => (
            <li key={link.id} className="relative px-2 py-1">
              {link.external ? (
                <a
                  href={link.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase tracking-widest text-gray-300 hover:text-white transition-colors duration-300 z-10 relative group"
                >
                  {link.title}
                  <ExternalLink size={14} className="text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative flex items-center px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors duration-300 z-10 ${
                    active === link.id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.title}
                  
                  {/* Sliding Highlight Pill */}
                  {active === link.id && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-full -z-10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden menu-trigger p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {toggle && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-20 right-4 left-4 mobile-menu-container bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-6 z-50 overflow-hidden"
            >
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 pointer-events-none" />
              
              <ul className="list-none flex flex-col gap-2 relative z-10">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    {link.external ? (
                      <a
                        href={link.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 rounded-xl text-lg font-bold uppercase tracking-widest text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
                        onClick={() => setToggle(false)}
                      >
                        {link.title}
                        <ExternalLink size={18} className="text-yellow-500" />
                      </a>
                    ) : (
                      <a
                        href={`#${link.id}`}
                        className={`block p-4 rounded-xl text-lg font-bold uppercase tracking-widest transition-all duration-300 ${
                          active === link.id 
                            ? "bg-white/10 text-white border border-white/10 shadow-inner" 
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                        onClick={(e) => handleNavClick(e, link)}
                      >
                        {link.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}