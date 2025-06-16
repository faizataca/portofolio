"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, Home, User, Briefcase, Mail, Sun, Moon, ExternalLink } from "lucide-react"
import WordRevealOnScroll from "@/components/WordRevealOnScroll"
import Link from "next/link"
import Navbar from "@/components/navbar"
import ScrollProgress from "@/components/scroll-progress"
import { useRef } from 'react'; // useEffect, useState are already imported
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

export default function LoadingScreen() {
  const [percentage, setPercentage] = useState(40)
  const [isComplete, setIsComplete] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [exitAnimation, setExitAnimation] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          setExitAnimation(true)
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
          }, 1000)
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 2
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)
    return () => clearInterval(timeInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const homeSection = document.getElementById("home")
      const aboutSection = document.getElementById("about")
      const projectsSection = document.getElementById("projects")
      const contactSection = document.getElementById("contact")
      const scrollPosition = window.scrollY + window.innerHeight / 2 // Adjusted for better accuracy
      
      if (contactSection && scrollPosition >= contactSection.offsetTop) {
        setActiveSection("contact")
      } else if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setActiveSection("projects")
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection("about")
      } else if (homeSection && scrollPosition >= homeSection.offsetTop) {
        setActiveSection("home")
      } else {
        setActiveSection("home") // Default to home if no other section is active
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const techStack = [
    { name: "HTML", color: "text-orange-500" },
    { name: "CSS", color: "text-blue-500" },
    { name: "TypeScript", color: "text-blue-600" },
    { name: "React", color: "text-cyan-500" },
    { name: "Next.js", color: "text-gray-900" }, // Dark mode: text-white or light gray
    { name: "Tailwind", color: "text-cyan-400" },
    { name: "Node.js", color: "text-green-500" },
    { name: "Python", color: "text-yellow-600" },
    { name: "Figma", color: "text-purple-500" },
  ]

  const projects = [
    {
      title: "Justipin",
      description: "Service app for students to share and order items through a trusted community of shoppers.",
      tech: "PHP, Laravel, MySQL, Flutter",
      link: "https://justipin.my.id",
    },
    {
      title: "Online Exam App",
      description: "An interactive digital exam system that makes it easy to conduct tests online.",
      tech: "React, Node.js, MySQL",
      link: "https://taskmanager-example.com", // Placeholder link
    },
    {
      title: "ASave",
      description: "A simple and secure app for managing and tracking your finances.",
      tech: "React, Node.js",
      link: "https://asave.my.id",
    },
    {
      title: "Sheyart",
      description: "A platform for sharing creative works and ideas with others in real-time.",
      tech: "Flutter, Firebase", // Removed Redux as it's often client-side state
      link: "https://sheyarte.vercel.app/",
    },
  ]

  if (!isComplete) {
    return (
      <div 
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out ${
          exitAnimation ? 'animate-curve-exit' : ''
        }`}
        style={{
          clipPath: exitAnimation 
            ? 'ellipse(100% 100% at 50% 100%)' 
            : 'ellipse(150% 150% at 50% 50%)',
          backgroundColor: '#000000' // Ensure background is black
        }}
      >
        <div className="absolute inset-0 bg-black z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gray-800/20 blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gray-800/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-80"></div>
        </div>
        
        <div className={`text-center space-y-8 relative z-10 transition-all duration-1000 ${
          exitAnimation ? 'transform scale-90 opacity-0 translate-y-[-50px]' : ''
        }`}>
          <p className="text-sm text-gray-400 tracking-widest uppercase">Loading...</p>
          <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight">{percentage}%</div>
          <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-300 ease-out" style={{ width: `${percentage}%` }} />
          </div>
        </div>
        <div className="absolute bottom-10 flex space-x-2 z-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.5s",
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 animate-fade-in-up overflow-x-hidden ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      <ScrollProgress position="top" height={3} color={isDarkMode ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"} />
      
      <div className="fixed inset-0 opacity-5 pointer-events-none -z-10"> {/* Ensure pattern is behind content */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a78bfa' fillOpacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: 'auto',
          }}
        />
      </div>

      <header
        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-center backdrop-blur-sm"
        // The border-b class and style for borderColor have been removed
      >
        <Link href="/" className="text-xl sm:text-2xl font-bold">PORTFOLIO</Link>
        <div className="font-mono text-xs sm:text-sm">{currentTime}</div>
      </header>

      <main className={`pt-20 sm:pt-24 ${isDarkMode ? 'bg-black' : 'bg-lavender-100'}`}>
        {/* Hero Section */}
        <section id="home" className={`min-h-screen flex flex-col items-center justify-center relative ${isDarkMode ? "bg-black" : "bg-gradient-to-b from-lavender-100 via-pink-50 to-white"} px-4 sm:px-6 lg:px-8`}>
          {isDarkMode && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[90vw] sm:w-[85vw] h-[85vh] max-w-2xl max-h-2xl 
          bg-gradient-radial from-purple-700/40 via-purple-800/20 to-transparent 
          rounded-full blur-[60px] sm:blur-[80px] pointer-events-none animate-pulse"
        style={{ animationDuration: '18s', animationDelay: '1s' }}
          ></div>
          <div 
        className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-white/[.04] blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse"
        style={{ animationDuration: '10s' }}
          ></div>
          <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-white/[.06] blur-[90px] sm:blur-[110px] md:blur-[130px] animate-pulse"
        style={{ animationDuration: '12s', animationDelay: '1s' }}
          ></div>
          <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] md:w-[40rem] md:h-[40rem] rounded-full bg-white/[.03] blur-[120px] sm:blur-[150px] md:blur-[180px] animate-pulse"
        style={{ animationDuration: '15s', animationDelay: '0.5s' }}
          ></div>
        </div>
          )}
          <div className="text-center space-y-6 sm:space-y-8 max-w-4xl relative z-10 w-full"> 
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4">
          {"Faiz Ata".split("").map((char, index) => (
        <span
          key={index}
          className={`font-light hover:font-black transition-all duration-300 cursor-default
          ${isDarkMode 
        ? "text-gray-400 hover:text-white" 
        : "text-[rgb(82,82,82)] hover:text-red-900"}`} // Consider a lighter base color for dark mode
          style={{
        transition: "font-weight 0.35s, color 0.35s",
        transitionDelay: `${index * 50}ms`,
          }}
        >
          {char}
        </span>
          ))}
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="animate-scroll inline-block">
        <span className={`text-sm sm:text-base md:text-lg lg:text-xl mx-4 sm:mx-8 font-light opacity-65 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
          FULLSTACK - DESIGN DREAMER - UI/UX ENTHUSIAST -
        </span>
        <span className={`text-sm sm:text-base md:text-lg lg:text-xl mx-4 sm:mx-8 font-light opacity-65 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
          FULLSTACK - DESIGN DREAMER - UI/UX ENTHUSIAST -
        </span>
          </div>
        </div>

        <button
          onClick={() => document.querySelector("#word-reveal")?.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
          })}
          className="group relative overflow-hidden px-6 sm:px-8 py-3 border border-current rounded-full hover:px-10 sm:hover:px-12 transition-all duration-500 text-sm sm:text-base"
          aria-label="Scroll to word reveal section"
        >
          <span className="group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 animate-bounce"><path d="m6 9 6 6 6-6"/></svg>
          </span>
          <span className="absolute inset-0 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-1 sm:gap-2 items-center justify-center">
        <span>Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-bounce"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </button>
          </div>
        </section>

        {/* Word Reveal Section */}
        <section
          className={`py-16 sm:py-20 md:py-24 word-reveal-section relative min-h-[70vh] flex items-center transition-colors duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
          } px-4 sm:px-6 lg:px-8`}
          id="word-reveal"
        >
          <div className="absolute inset-0 opacity-15 overflow-hidden -z-10"> {/* Ensure pattern is behind content */}
        <div className={`absolute top-10 left-1/4 w-60 h-60 sm:w-80 sm:h-80 rounded-full blur-2xl sm:blur-3xl ${isDarkMode ? "bg-indigo-800/30" : "bg-lavender-300/40"}`} style={{ transform: `translateY(${scrollY * 0.02}px)` }}></div>
        <div className={`absolute bottom-10 right-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-2xl sm:blur-3xl ${isDarkMode ? "bg-rose-800/30" : "bg-pink-200/40"}`} style={{ transform: `translateY(${-scrollY * 0.03}px)` }}></div>
        <div className={`absolute top-[40%] right-[15%] w-36 h-36 sm:w-48 sm:h-48 rounded-full blur-xl sm:blur-2xl ${isDarkMode ? "bg-sky-800/20" : "bg-blue-100/30"}`} style={{ transform: `translate(${scrollY * 0.01}px, ${-scrollY * 0.015}px)` }}></div>
        <div className={`absolute bottom-[30%] left-[20%] w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-xl sm:blur-2xl ${isDarkMode ? "bg-teal-800/20" : "bg-emerald-100/30"}`} style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.01}px)` }}></div>
          </div>
          <div className={`max-w-4xl mx-auto text-center relative w-full`}>
        <WordRevealOnScroll 
          text="Hi, I'm Faiz Ata Choirul Anaam studying Informatics Engineering in Semarang State Polytechnic. Mainly focused on Web Development and UI/UX Design." 
          isDarkMode={isDarkMode}
        />
          </div>
        </section>

        {/* About Section Snippet */}
        <section id="about" className={`py-16 sm:py-20 md:py-24 relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-white"} px-4 sm:px-6 lg:px-8`}>
          {isDarkMode && (
        <div className="absolute inset-0 z-0 opacity-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 max-w-screen-2xl rounded-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[100px] animate-pulse" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-3/4 h-1/3 max-w-screen-xl rounded-full bg-gradient-to-r from-blue-500/10 via-transparent to-pink-500/10 blur-[80px] animate-pulse" style={{ animationDuration: '20s', animationDelay: '2s' }}></div>
        </div>
          )}
          <div className="max-w-6xl mx-auto animate-fade-in-up relative z-10">
        <div className="space-y-12 sm:space-y-16">
          <div>
        <div className="relative w-full overflow-hidden group">
          <div className={`absolute top-0 bottom-0 left-0 z-10 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r ${isDarkMode ? "from-black via-black/90" : "from-white via-white/90"} to-transparent pointer-events-none`}/>
          <div className={`absolute top-0 bottom-0 right-0 z-10 w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l ${isDarkMode ? "from-black via-black/90" : "from-white via-white/90"} to-transparent pointer-events-none`}/>
          <div className="flex animate-infinite-slider group-hover:pause-animation">
        {[...techStack, ...techStack].map((tech, index) => {
          let prefix = tech.name.toLowerCase().replace(/\.|\s/g, "");
          if (tech.name === "Next.js") prefix = "next"; // specific handling
          else if (tech.name === "Node.js") prefix = "node";
          else if (tech.name === "TypeScript") prefix = "ts";
          else if (tech.name === "HTML") prefix = "html";
          else if (tech.name === "CSS") prefix = "css";
          else if (tech.name === "React") prefix = "react";
          else if (tech.name === "Tailwind") prefix = "tw";
          else if (tech.name === "Python") prefix = "py";
          else if (tech.name === "Figma") prefix = "figma";

          const imageFileName = `${prefix}nime.avif`;
          return (
        <div key={`tech-slide-${index}-${tech.name}`} className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-3 sm:mx-4 md:mx-6 flex items-center justify-center p-2" title={tech.name}>
          <img src={`/tech-logos/${imageFileName}`} alt={tech.name} className="object-contain w-full h-full transition-transform duration-300 ease-in-out filter grayscale hover:grayscale-0 hover:scale-110"/>
        </div>
          );
        })}
          </div>
        </div>
          </div>
          <div className="text-center pt-6 sm:pt-8">
        <Link href="/about">
          <button className="group relative overflow-hidden px-6 sm:px-8 py-3 border border-current rounded-full text-sm sm:text-base">
        <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">MORE ABOUT ME</span>
        <div className={`absolute inset-0 ${isDarkMode ? "bg-white" : "bg-gray-900"} transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out`}/>
        <span className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "text-gray-900" : "text-white"} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>MORE ABOUT ME</span>
          </button>
        </Link>
          </div>
        </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`min-h-screen py-16 sm:py-20 md:py-24 relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-white"} px-4 sm:px-6 lg:px-8`}>
          <div className="absolute inset-0 z-0">
        {isDarkMode && (
          <>
        <div className="absolute top-1/4 left-1/4 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full bg-white/[.02] blur-[80px] sm:blur-[100px] md:blur-[120px] animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-white/[.03] blur-[90px] sm:blur-[110px] md:blur-[130px] animate-pulse" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24rem] h-[24rem] sm:w-[30rem] sm:h-[30rem] md:w-[40rem] md:h-[40rem] rounded-full bg-white/[.015] blur-[120px] sm:blur-[150px] md:blur-[180px] animate-pulse" style={{ animationDuration: '18s', animationDelay: '0.5s' }}></div>
          </>
        )}
        <div className={`absolute top-40 right-10 w-48 h-48 sm:w-64 sm:h-64 rounded-full ${isDarkMode ? 'bg-gray-800/5' : 'bg-lavender-200/20'} blur-2xl sm:blur-3xl`} style={{ transform: `translateY(${scrollY * 0.05}px)` }}></div>
        <div className={`absolute bottom-40 left-10 w-56 h-56 sm:w-72 sm:h-72 rounded-full ${isDarkMode ? 'bg-gray-800/5' : 'bg-pink-200/15'} blur-2xl sm:blur-3xl`} style={{ transform: `translateY(${-scrollY * 0.03}px)` }}></div>
        <div className={`absolute top-[30%] left-[20%] w-16 h-16 sm:w-20 sm:h-20 rounded-full ${isDarkMode ? 'bg-gray-800/3' : 'bg-lavender-300/10'} blur-xl sm:blur-2xl`} style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.01}px)` }}></div>
        <div className={`absolute bottom-[25%] right-[15%] w-24 h-24 sm:w-32 sm:h-32 rounded-full ${isDarkMode ? 'bg-gray-800/3' : 'bg-pink-100/20'} blur-xl sm:blur-2xl`} style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)` }}></div>
          </div>
          <div className="max-w-5xl mx-auto relative z-10">
        <div className="relative">
          <h2 className="font-bold opacity-10 absolute -top-12 sm:-top-16 md:-top-20 lg:-top-24 left-1/2 transform -translate-x-1/2 w-screen text-center tracking-tight whitespace-nowrap pointer-events-none text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem]">MY WORKS</h2>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-16 sm:h-20 rounded-full blur-2xl sm:blur-3xl pointer-events-none ${isDarkMode ? 'bg-gradient-to-r from-purple-500/5 to-blue-500/5' : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'}`}></div>
        </div>
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-24">
          <div className="space-y-4 md:space-y-6 lg:space-y-8 relative">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className={`group flex items-center justify-between border-b ${isDarkMode ? 'border-neutral-700 hover:border-neutral-50' : 'border-neutral-300 hover:border-neutral-950'} py-4 sm:py-6 md:py-8 transition-all duration-500 ease-out relative w-full overflow-visible animate-scale-in`} style={{ animationDelay: `${index * 150}ms` }}>
        <div className="relative z-10 max-w-[75%] sm:max-w-[70%] md:max-w-[65%]">
          <span className={`block text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight font-bold ${isDarkMode ? 'text-neutral-500 group-hover:text-neutral-50' : 'text-neutral-400 group-hover:text-neutral-950'} transition-all duration-500`}>{project.title}</span>
          <span className={`block mt-1 text-xs sm:text-sm ${isDarkMode ? 'text-neutral-600 group-hover:text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-700'} transition-all duration-500`}>{project.description} <span className="font-light opacity-75 hidden md:inline">| {project.tech}</span></span>
        </div>
        <div className="absolute h-16 w-24 sm:h-20 sm:w-28 md:h-28 md:w-40 lg:h-32 lg:w-48 top-1/2 right-2 sm:right-4 md:right-6 -translate-y-1/2 z-30 hidden sm:block">
          <img src={`/images/p${index < 4 ? index + 1 : Math.floor(Math.random() * 4) + 1}.png`} alt={project.title} className="project-image absolute h-full w-full rounded-lg object-cover opacity-0 scale-0 -rotate-[12.5deg] grayscale brightness-[1.05] contrast-[1.05] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:grayscale-0 group-hover:brightness-[1.05] group-hover:contrast-[1.05] transition-all duration-500 ease-out shadow-xl" style={{ border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, zIndex: 50 }}/>
        </div>
        <div className="relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`${isDarkMode ? 'text-neutral-600 group-hover:text-neutral-300' : 'text-neutral-400 group-hover:text-neutral-950'} opacity-0 translate-x-[25%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </div>
          </a>
        ))}
          </div>
          <div className="text-center mt-12 sm:mt-16 md:mt-20 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <Link href="/projects">
          <button className="group relative overflow-hidden px-6 sm:px-8 py-3 border border-current rounded-full text-sm sm:text-base">
        <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">SEE MORE</span>
        <div className={`absolute inset-0 ${isDarkMode ? "bg-white" : "bg-gray-900"} transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out`}/>
        <span className={`absolute inset-0 flex items-center justify-center ${isDarkMode ? "text-gray-900" : "text-white"} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>SEE MORE</span>
          </button>
        </Link>
          </div>
        </div>
          </div>
        </section>

        {/* Quote Section */}
        <section id="quote" className={`h-[60vh] md:h-[80vh] lg:h-screen flex items-center justify-center relative ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-600"} overflow-hidden px-4 sm:px-6 lg:px-8`}>
        <div className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-8xl md:text-[10rem] lg:text-[15rem] xl:text-[18rem] 2xl:text-[22rem] font-black uppercase text-current opacity-[0.1] whitespace-nowrap cursor-default select-none leading-none animate-fade-in-up" style={{ animationDuration: '1s', animationDelay: '0.1s' }}>QUOTE</div>
          <div className="relative z-10 text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto animate-fade-in-up" style={{ animationDuration: '1s', animationDelay: '0.4s' }}>
        <svg className={`mx-auto mb-3 sm:mb-4 md:mb-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${isDarkMode ? "text-white" : "text-black"}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/></svg>
        <blockquote className={`font-bold tracking-tighter text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl px-2 sm:px-4 md:px-6 mb-4 sm:mb-6 md:mb-8 ${isDarkMode ? "text-white" : "text-black"}`}>Yesterday has passed, tomorrow has not come, and today is uncertain, fighting!!</blockquote>
        <cite className={`block font-medium tracking-wider text-xs sm:text-sm md:text-base ${isDarkMode ? "text-gray-400" : "text-gray-500"} cursor-default`}>Mi-Ji</cite>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" aria-labelledby="contact-section-label" className={`h-[70vh] md:h-[90vh] lg:h-screen flex items-center justify-center relative ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-350"} overflow-hidden px-4 sm:px-6 lg:px-8`}>
          <h2 id="contact-section-label" className="sr-only">Contact Section</h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl md:text-[8rem] lg:text-[12rem] xl:text-[15rem] 2xl:text-[18rem] font-black uppercase text-current opacity-[0.1] whitespace-nowrap cursor-default select-none leading-none animate-fade-in-up" style={{ animationDuration: '1s', animationDelay: '0.1s' }} aria-hidden="true">CONTACT</div>
          <div className="relative z-10 text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto animate-fade-in-up" style={{ animationDuration: '1s', animationDelay: '0.4s' }}>
        <h3 className={`font-extrabold tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center mx-auto mb-4 sm:mb-6 md:mb-8 ${isDarkMode ? "text-white" : "text-black"}`}>LET'S MAKE SOMETHING GREAT</h3>
        <div className="mb-6 sm:mb-8 md:mb-12" style={{ perspective: '1000px' }}>
          <a href="mailto:ismifaizata@gmail.com" className={`group relative inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-transparent text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-tighter font-extrabold transition-colors duration-300 ${isDarkMode ? "text-zinc-500 hover:text-zinc-400" : "text-zinc-300 hover:text-zinc-400"}`} style={{ '--button-letter-container-height': 'calc(1em + 0.5rem)' } as React.CSSProperties}>
        <span className="sr-only">CONTACT ME</span>
        <span aria-hidden="true" className="relative flex overflow-hidden items-center" style={{ height: 'var(--button-letter-container-height)' }}>
          {"CONTACT ME".split("").map((letter, index) => (
        <span key={index} data-letter={letter} className={`inline-block origin-bottom transition-transform duration-300 ease-out group-hover:-translate-y-[0.15em] group-hover:scale-105`} style={{ transitionDelay: `${index * 0.03}s` }}>{letter === " " ? "\u00A0" : letter}</span>
          ))}
        </span>
          </a>
        </div>
        <p className={`font-medium tracking-wider text-xs sm:text-sm md:text-base w-full sm:w-10/12 md:w-9/12 lg:w-8/12 mx-auto text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>I'm always open to new opportunities, collaborations, and connections.</p>
          </div>
        </section>
      </main>

      <Navbar
        isDarkMode={isDarkMode}
        additionalItems={[
          { href: "#contact", label: "Contact", icon: (<Mail className="size-4" aria-hidden="true"/>), isActive: activeSection === "contact" },
          { href: "#", label: "Toggle Theme", icon: isDarkMode ? (<Sun width="15" height="15" className="h-[1.2rem] w-[1.2rem]"/>) : (<Moon width="15" height="15" className="h-[1.2rem] w-[1.2rem]"/>), onClick: toggleTheme }
        ]}
      />
    </div>
  )
}