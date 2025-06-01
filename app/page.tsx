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
  const [percentage, setPercentage] = useState(40) // Start from 40% instead of 0
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
          // Start exit animation before marking as complete
          setExitAnimation(true)
          clearInterval(interval)
          
          // Add a delay before showing main content
          setTimeout(() => {
            setIsComplete(true)
          }, 1000) // 1 second for animation to play
          
          return 100
        }
        return prev + Math.floor(Math.random() * 5) + 2 // Increased increment for faster loading
      })
    }, 80) // Reduced interval time for faster updates

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
      
      // Update active section based on scroll position
      const homeSection = document.getElementById("home")
      const aboutSection = document.getElementById("about")
      const projectsSection = document.getElementById("projects")
      const contactSection = document.getElementById("contact")
      
      const scrollPosition = window.scrollY + 300 // Offset to trigger slightly before reaching the section
      
      if (contactSection && scrollPosition >= contactSection.offsetTop) {
        setActiveSection("contact")
      } else if (projectsSection && scrollPosition >= projectsSection.offsetTop) {
        setActiveSection("projects")
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection("about")
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const resetLoading = () => {
    setPercentage(70) // Also update reset to start from 70%
    setIsComplete(false)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const techStack = [
    { name: "HTML", color: "text-orange-500" },
    { name: "CSS", color: "text-blue-500" },
    { name: "TypeScript", color: "text-blue-600" },
    { name: "React", color: "text-cyan-500" },
    { name: "Next.js", color: "text-gray-900" },
    { name: "Tailwind", color: "text-cyan-400" },
    { name: "Node.js", color: "text-green-500" },
    { name: "Python", color: "text-yellow-600" },
    { name: "Figma", color: "text-purple-500" },
  ]

  const projects = [
    {
      title: "Justipin",
      description: "service app for students to share and order items through a trusted community of shoppers.",
      tech: "PHP, Laravel, MySQL, Flutter",
      link: "https://justipin.my.id",
    },
    {
      title: "Online Exam App",
      description: "An interactive digital exam system that makes it easy to conduct tests online.",
      tech: "react, Node.js, MySQL",
      link: "https://taskmanager-example.com",
    },
    {
      title: "ASave",
      description: "A simple and secure app for managing and tracking your finances.",
      tech: "react, Node.js",
      link: "https://asave.my.id",
    },
    {
      title: "Sheyart",
      description: "A platform for sharing creative works and ideas with others in real-time",
      tech: "Flutter, Firebase, Redux",
      link: "https://sheyarte.vercel.app/",
    },
  ]

  if (!isComplete) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center text-white transition-all duration-1000 ease-in-out ${
          exitAnimation ? 'animate-curve-exit' : ''
        }`}
        style={{
          clipPath: exitAnimation 
            ? 'ellipse(100% 100% at 50% 100%)' 
            : 'ellipse(150% 150% at 50% 50%)'
        }}
      >
        {/* Rich black DOF background with gradient overlay */}
        <div className="absolute inset-0 bg-black z-0">
          {/* Subtle blurred light spots */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-gray-800/20 blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-gray-800/10 blur-[120px]"></div>
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-black opacity-80"></div>
        </div>
        
        <div className={`text-center space-y-8 relative z-10 transition-all duration-1000 ${
          exitAnimation ? 'transform scale-90 opacity-0 translate-y-[-50px]' : ''
        }`}>
          <p className="text-sm text-gray-400 tracking-widest uppercase">Loading...</p>
          <div className="text-8xl md:text-9xl font-bold tracking-tight">{percentage}%</div>
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
      className={`min-h-screen transition-colors duration-300 animate-fade-in-up ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Scroll Progress Indicator */}
      <ScrollProgress position="top" height={3} color={isDarkMode ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"} />
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23a78bfa' fillOpacity='0.08'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-sm"
      >
        <Link href="/" className="text-2xl font-bold">PORTFOLIO</Link>
        <div className="font-mono text-sm">{currentTime}</div>
      </header>

      {/* Hero Section */}
      <section id="home" className={`min-h-screen flex flex-col items-center justify-center relative px-6 ${isDarkMode ? "bg-black" : "bg-gradient-to-b from-lavender-100 via-pink-50 to-white"}`}>
        {/* Dark mode background effects */}
        {isDarkMode && (
          <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Purple Central Gradient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
         w-[85vw] h-[85vh] max-w-2xl max-h-2xl 
         bg-gradient-radial from-purple-700/40 via-purple-800/20 to-transparent 
         rounded-full blur-[80px] pointer-events-none animate-pulse"
          style={{ animationDuration: '18s', animationDelay: '1s' }}
        ></div>

        {/* Existing Light effect 1 */}
        <div 
          className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/[.04] blur-[100px] sm:blur-[120px] animate-pulse"
          style={{ animationDuration: '10s' }}
        ></div>
        {/* Existing Light effect 2 */}
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-white/[.06] blur-[110px] sm:blur-[130px] animate-pulse"
          style={{ animationDuration: '12s', animationDelay: '1s' }}
        ></div>
        {/* Existing Central diffuse light */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] rounded-full bg-white/[.03] blur-[150px] sm:blur-[180px] animate-pulse"
          style={{ animationDuration: '15s', animationDelay: '0.5s' }}
        ></div>
          </div>
        )}
        <div className="text-center space-y-8 max-w-4xl relative z-10"> {/* Ensure content is above the background effect */}
          <div className="text-6xl md:text-8xl font-bold mb-4">
        {"Faiz Ata".split("").map((char, index) => (
          <span
        key={index}
        className={`font-light hover:font-black transition-all duration-300 cursor-default
           ${isDarkMode 
         ? "text-gray-400 hover:text-white" 
         : "text-[rgb(82,82,82)] hover:text-red-900"}`}
        style={{
          transition: "font-weight 0.35s, color 0.35s",
          transitionDelay: `${index * 50}ms`,
        }}
          >
        {char}
          </span>
        ))}
          </div>

          {/* Scrolling Text */}
            <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-scroll inline-block">
            <span className={`text-lg md:text-xl mx-8 font-light opacity-65 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            FULLSTACK - DESIGN DREAMER - UI/UX ENTHUSIAST -
            </span>
            <span className={`text-lg md:text-xl mx-8 font-light opacity-65 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
            FULLSTACK - DESIGN DREAMER - UI/UX ENTHUSIAST -
            </span>
            </div>
            </div>

          <button
        onClick={() => document.querySelector("#word-reveal")?.scrollIntoView({ 
          behavior: "smooth", 
          block: "start" 
        })}
        className="group relative overflow-hidden px-8 py-3 border border-current rounded-full hover:px-16 transition-all duration-500"
        aria-label="Scroll to word reveal section"
          >
        <span className="group-hover:opacity-0 transition-opacity duration-300 flex items-center justify-center">
          <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="mr-1 animate-bounce"
          >
        <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
        <span className="absolute inset-0 flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 items-center justify-center">
          <span>Scroll</span>
          <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="animate-bounce"
          >
        <path d="m6 9 6 6 6-6"/>
          </svg>
        </span>
          </button>
        </div>
      </section>

      {/* Word Reveal Section with enhanced background */}
      <section
        className={`py-24 px-6 word-reveal-section relative min-h-[70vh] flex items-center transition-colors duration-300 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"
        }`}
        id="word-reveal"
      >
        {/* Enhanced subtle background patterns with scroll target icon */}
        <div className="absolute inset-0 opacity-15 overflow-hidden">
          <div 
        className={`absolute top-10 left-1/4 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? "bg-indigo-800/30" : "bg-lavender-300/40"
        }`}
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
          ></div>
          <div 
        className={`absolute bottom-10 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? "bg-rose-800/30" : "bg-pink-200/40"
        }`}
        style={{ transform: `translateY(${-scrollY * 0.03}px)` }}
          ></div>
          <div 
        className={`absolute top-[40%] right-[15%] w-48 h-48 rounded-full blur-2xl ${
          isDarkMode ? "bg-sky-800/20" : "bg-blue-100/30"
        }`}
        style={{ transform: `translate(${scrollY * 0.01}px, ${-scrollY * 0.015}px)` }}
          ></div>
          <div 
        className={`absolute bottom-[30%] left-[20%] w-64 h-64 rounded-full blur-2xl ${
          isDarkMode ? "bg-teal-800/20" : "bg-emerald-100/30"
        }`}
        style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.01}px)` }}
          ></div>
        </div>
        
        <div className={`max-w-4xl mx-auto text-center relative w-full`}>
          <WordRevealOnScroll 
            text="Hi, I'm Faiz Ata Choirul Anaam studying Informatics Engineering in Semarang State Polytechnic. Mainly focused on Web Development and UI/UX Design." 
            isDarkMode={isDarkMode} // Mengirim props isDarkMode ke WordRevealOnScroll
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`pt-10 pb-40 px-6 relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-white"}`}> {/* Increased pb-28 to pb-40 for more spacing, added relative and overflow-hidden */}
        {/* Dark mode background light effect */}
        {isDarkMode && (
          <div className="absolute inset-0 z-0 opacity-50">
        {/* Wide horizontal light */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 max-w-screen-2xl rounded-full bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-[100px] animate-pulse"
          style={{ animationDuration: '15s' }}
        ></div>
         <div
          className="absolute top-1/3 left-1/4 w-3/4 h-1/3 max-w-screen-xl rounded-full bg-gradient-to-r from-blue-500/10 via-transparent to-pink-500/10 blur-[80px] animate-pulse"
          style={{ animationDuration: '20s', animationDelay: '2s' }}
        ></div>
          </div>
        )}
        <div className="max-w-6xl mx-auto animate-fade-in-up relative z-10"> {/* Added relative and z-10 to ensure content is above the light effect */}
          <div className="space-y-16"> {/* Adjusted spacing */}
        {/* Tech Stack Infinite Slider */}
        <div>
          {/* <h3 className={`text-center text-2xl font-semibold mb-8 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
        Technologies I Work With
          </h3> */}
          <div className="relative w-full overflow-hidden group">
        {/* Left Gradient Fade */}
        <div
          className={`absolute top-0 bottom-0 left-0 z-10 w-16 sm:w-24 md:w-32 bg-gradient-to-r ${
        isDarkMode ? "from-black via-black/90" : "from-white via-white/90"
          } to-transparent pointer-events-none`}
        />
        {/* Right Gradient Fade */}
        <div
          className={`absolute top-0 bottom-0 right-0 z-10 w-16 sm:w-24 md:w-32 bg-gradient-to-l ${
        isDarkMode ? "from-black via-black/90" : "from-white via-white/90"
          } to-transparent pointer-events-none`}
        />

        <div className="flex animate-infinite-slider group-hover:pause-animation">
          {[...techStack, ...techStack].map((tech, index) => {
        let prefix = "";
        switch (tech.name) {
          case "HTML": prefix = "html"; break;
          case "CSS": prefix = "css"; break;
          case "TypeScript": prefix = "ts"; break;
          case "React": prefix = "react"; break;
          case "Next.js": prefix = "next"; break;
          case "Tailwind": prefix = "tw"; break;
          case "Node.js": prefix = "node"; break;
          case "Python": prefix = "py"; break;
          case "Figma": prefix = "figma"; break;
          default:
        // Fallback for names not explicitly mapped (e.g., JavaScript)
        // This will result in "javascriptnime.avif" for "JavaScript"
        prefix = tech.name.toLowerCase().replace(/\.|\s/g, "");
        }
        const imageFileName = `${prefix}nime.avif`;
        
        return (
          <div
        key={`tech-slide-${index}-${tech.name}`}
        className="flex-shrink-0 w-28 h-28 mx-6 sm:w-32 sm:h-32 md:w-36 md:h-36 flex items-center justify-center p-2"
        title={tech.name}
          >
        <img
          src={`/tech-logos/${imageFileName}`}
          alt={tech.name}
          className="object-contain w-full h-full transition-transform duration-300 ease-in-out filter grayscale hover:grayscale-0 hover:scale-110"
        />
          </div>
        );
          })}
        </div>
          </div>
        </div>

        {/* "More About Me" Button */}
        <div className="text-center pt-8">
          <Link href="/about">
        <button className="group relative overflow-hidden px-8 py-3 border border-current rounded-full text-lg">
          <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">MORE ABOUT ME</span>
          <div
        className={`absolute inset-0 ${
          isDarkMode ? "bg-white" : "bg-gray-900"
        } transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out`}
          />
          <span
        className={`absolute inset-0 flex items-center justify-center ${
          isDarkMode ? "text-gray-900" : "text-white"
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
          >
        MORE ABOUT ME
          </span>
        </button>
          </Link>
        </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        className={`min-h-screen py-20 px-6 relative overflow-hidden ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        {/* Background Effects Container */}
        <div className="absolute inset-0 z-0">
          {/* White Light Blurs for Dark Mode */}
          {isDarkMode && (
        <>
          <div 
            className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/[.02] blur-[100px] sm:blur-[120px] animate-pulse"
            style={{ animationDuration: '12s' }}
          ></div>
          <div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-white/[.03] blur-[110px] sm:blur-[130px] animate-pulse"
            style={{ animationDuration: '15s', animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] sm:w-[40rem] sm:h-[40rem] rounded-full bg-white/[.015] blur-[150px] sm:blur-[180px] animate-pulse"
            style={{ animationDuration: '18s', animationDelay: '0.5s' }}
          ></div>
        </>
          )}

          {/* Existing Enhanced Background Elements (subtle gray in dark mode, colored in light mode) */}
          <div className={`absolute top-40 right-10 w-64 h-64 rounded-full ${isDarkMode ? 'bg-gray-800/5' : 'bg-lavender-200/20'} blur-3xl`} style={{ transform: `translateY(${scrollY * 0.05}px)` }}></div>
          <div className={`absolute bottom-40 left-10 w-72 h-72 rounded-full ${isDarkMode ? 'bg-gray-800/5' : 'bg-pink-200/15'} blur-3xl`} style={{ transform: `translateY(${-scrollY * 0.03}px)` }}></div>
          <div className={`absolute top-[30%] left-[20%] w-20 h-20 rounded-full ${isDarkMode ? 'bg-gray-800/3' : 'bg-lavender-300/10'} blur-2xl`} style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.01}px)` }}></div>
          <div className={`absolute bottom-[25%] right-[15%] w-32 h-32 rounded-full ${isDarkMode ? 'bg-gray-800/3' : 'bg-pink-100/20'} blur-2xl`} style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)` }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto relative z-10"> {/* Content is z-10, above background effects */}
          {/* Moved MY WORKS heading even higher */}
          <div className="relative">
        <h2 className="font-bold opacity-10 absolute -top-24 left-1/2 transform -translate-x-1/2 w-screen text-center tracking-tight whitespace-nowrap pointer-events-none text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]">
          MY WORKS
        </h2>
        {/* Subtle gradient bar behind "MY WORKS" - adjust if needed for dark mode */}
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-20 rounded-full blur-3xl pointer-events-none ${isDarkMode ? 'bg-gradient-to-r from-purple-500/5 to-blue-500/5' : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'}`}></div>
          </div>
          <div className="relative z-10 pt-24 md:pt-28 p-4 md:p-8"> {/* This z-10 is local to its parent, which is already globally z-10 */}
        {/* Dynamic Project Links with Hover Effects */}
        <div className="space-y-6 md:space-y-8 relative">
          {projects.map((project, index) => (
          <a 
            key={index}
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`group flex items-center justify-between border-b ${isDarkMode ? 'border-neutral-700 hover:border-neutral-50' : 'border-neutral-300 hover:border-neutral-950'} py-6 md:py-8 transition-all duration-500 ease-out relative w-full overflow-visible animate-scale-in`}
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative z-10 max-w-[60%] md:max-w-[70%]">
          <span className={`block text-3xl md:text-4xl tracking-tight font-bold ${isDarkMode ? 'text-neutral-500 group-hover:text-neutral-50' : 'text-neutral-400 group-hover:text-neutral-950'} transition-all duration-500`}>
            {project.title}
          </span>
          <span className={`block mt-2 text-sm md:text-base ${isDarkMode ? 'text-neutral-600 group-hover:text-neutral-300' : 'text-neutral-500 group-hover:text-neutral-700'} transition-all duration-500`}>
            {project.description} <span className="font-light opacity-75">| {project.tech}</span>
          </span>
            </div>
            
            {/* Project image with enhanced foreground presence */}
            <div className="absolute h-24 w-32 md:h-40 md:w-56 top-1/2 right-10 md:right-16 -translate-y-1/2 z-30">
          <img 
            src={`/images/p${index < 4 ? index + 1 : Math.floor(Math.random() * 4) + 1}.png`} 
            alt={project.title}
            className="project-image absolute h-full w-full rounded-lg object-cover opacity-0 scale-0 -rotate-[12.5deg] grayscale brightness-[1.05] contrast-[1.05] group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:grayscale-0 group-hover:brightness-[1.05] group-hover:contrast-[1.05] transition-all duration-500 ease-out shadow-xl"
            style={{
              border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`, // Adjusted border for dark mode
              zIndex: 50 // zIndex relative to parent z-30
            }}
          />
            </div>
            
            {/* Simplified Animated Arrow */}
            <div className="relative z-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`${isDarkMode ? 'text-neutral-600 group-hover:text-neutral-300' : 'text-neutral-400 group-hover:text-neutral-950'} opacity-0 translate-x-[25%] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300`}
          >
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
            </div>
          </a>
          ))}
        </div>
        
        {/* Enhanced See More Button linking to projects page */}
        <div className="text-center mt-20 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <Link href="/projects">
            <button className="group relative overflow-hidden px-8 py-3 border border-current rounded-full text-lg">
          <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-300 ease-in-out">SEE MORE</span>
          <div
            className={`absolute inset-0 ${
              isDarkMode ? "bg-white" : "bg-gray-900"
            } transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out`}
          />
          <span
            className={`absolute inset-0 flex items-center justify-center ${
              isDarkMode ? "text-gray-900" : "text-white"
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}
          >
            SEE MORE
          </span>
            </button>
          </Link>
        </div>
          </div>
        </div>
      </section>


      {/* Quote Section */}
      <section
        id="quote"
        className={`
          h-[50vh] md:h-screen
          flex items-center justify-center
          relative
          px-4 sm:px-6 
          ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"}
          overflow-hidden 
        `}
      >
        {/* Background Text */}
        <div
          className="absolute bottom-16 md:bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2
         text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[24rem] xl:text-[28rem] 
         font-black uppercase
         text-current opacity-[0.13]
         whitespace-nowrap
         cursor-default
         select-none
         leading-none
         animate-fade-in-up"
          style={{ animationDuration: '1s', animationDelay: '0.1s' }} 
        >
          QUOTE
        </div>

        {/* Main Quote Content */}
        <div 
          className="relative z-10 text-center max-w-4xl lg:max-w-5xl mx-auto animate-fade-in-up" 
          style={{ animationDuration: '1s', animationDelay: '0.4s' }}
        >
        {/* Quote Icon SVG */}
        <svg
        className={`
          mx-auto mb-4 md:mb-6
          w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
          ${isDarkMode ? "text-white" : "text-black"}
        `}
        viewBox="0 0 24 24" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        >
        <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z"/>
        </svg>

          {/* Quote Text */}
          <blockquote
        className={`
          font-bold tracking-tighter
          text-2xl sm:text-3xl md:text-5xl lg:text-6xl
          px-4 md:px-8
          mb-6 md:mb-8
          ${isDarkMode ? "text-white" : "text-black"}
        `}
          >
        Hari kemarin telah berlalu, hari besok belum datang, dan hari ini belum pasti, fighting!!
          </blockquote>

          {/* Author Name */}
          <cite
        className={`
          block
          font-medium tracking-wider
          text-sm sm:text-base md:text-lg
          ${isDarkMode ? "text-gray-400" : "text-gray-500"}
          cursor-default
        `}
          >
        Mi-Ji
          </cite>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        aria-labelledby="contact-section-label"
        className={`
          h-[50vh] md:h-screen
          flex items-center justify-center
          relative
          px-4 sm:px-6
          ${isDarkMode ? "bg-black text-white" : "bg-white text-gray-900"}
          overflow-hidden
        `}
      >
        {/* Screen reader only label */}
        <h2 id="contact-section-label" className="sr-only">Contact Section</h2>

        {/* Background Text */}
        <div
          className="absolute bottom-16 md:bottom-24 lg:bottom-32 left-1/2 -translate-x-1/2
        text-[10rem] sm:text-[14rem] md:text-[18rem] lg:text-[24rem] xl:text-[28rem]
        font-black uppercase
        text-current opacity-[0.13]
        whitespace-nowrap
        cursor-default
        select-none
        leading-none
        animate-fade-in-up"
          style={{ animationDuration: '1s', animationDelay: '0.1s' }}
          aria-hidden="true"
        >
          CONTACT
        </div>

        {/* Main Content */}
        <div
          className="relative z-10 text-center max-w-4xl lg:max-w-5xl mx-auto animate-fade-in-up"
          style={{ animationDuration: '1s', animationDelay: '0.4s' }}
        >
          {/* Main Heading */}
          <h3
        className={`
          font-extrabold tracking-tighter
          text-3xl sm:text-4xl md:text-5xl lg:text-7xl
          text-center
          mx-auto 
          mb-4 md:mb-8
          ${isDarkMode ? "text-white" : "text-black"}
        `}
          >
        LET'S MAKE SOMETHING GREAT
          </h3>

          {/* Email Link/Button with Animated Text */}
        <div className="mb-8 md:mb-12" style={{ perspective: '1000px' }}>
          <a
        href="mailto:ismifaizata@gmail.com"
        className={`
          group relative inline-flex items-center justify-center
          px-4 py-2
          rounded-md
          bg-transparent
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
          tracking-tighter font-extrabold
          transition-colors duration-300
          ${isDarkMode ? "text-zinc-500 hover:text-zinc-400" : "text-zinc-300 hover:text-zinc-400"}
        `}
        style={{ '--button-letter-container-height': 'calc(1em + 0.5rem)' } as React.CSSProperties}
          >
        <span className="sr-only">CONTACT ME</span>
        <span 
        aria-hidden="true" 
        className="relative flex overflow-hidden items-center" 
        style={{ height: 'var(--button-letter-container-height)' }}
        >
        {"CONTACT ME".split("").map((letter, index) => (
          <span
          key={index}
          data-letter={letter}
          className={`
            inline-block origin-bottom
            transition-transform duration-300 ease-out
            group-hover:-translate-y-[0.15em] group-hover:scale-105
          `}
          style={{
            transitionDelay: `${index * 0.03}s`,
          }}
          >
          {letter === " " ? "\u00A0" : letter} {/* Use non-breaking space for spaces */}
          </span>
        ))}
        </span>
          </a>
        </div>

          {/* Description Paragraph */}
          <p
        className={`
          font-medium tracking-wider
          text-sm sm:text-base md:text-lg
          w-11/12 md:w-7/12
          mx-auto text-center
          ${isDarkMode ? "text-gray-400" : "text-gray-600"}
        `}
          >
        I'm always open to new opportunities, collaborations, and connections. Got a project to discuss or just want to say hi? Feel free to reach out!
          </p>
        </div>
      </section>


      {/* Flippable 3D SVG Section */}
      <div
        className={`py-10 flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[450px] transition-colors duration-300 ${isDarkMode ? 'bg-gray-200' : 'bg-white'}`} // Conditional background based on isDarkMode
        style={{ perspective: '1000px' }} // Apply perspective to the container for the 3D effect
      >
        <div
          className={`
        group w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72  // Define the size of the flippable element
        relative
        cursor-pointer
        transition-transform duration-700 ease-out
        hover:[transform:rotateY(180deg)] // Apply flip animation on hover
          `}
          style={{ transformStyle: "preserve-3d" }} // Enable 3D space for children
          title="Interactive 3D Element" // Accessibility: title for the element
        >
          {/* Front Face of the Card */}
          <div
        className="absolute w-full h-full flex justify-center items-center"
        style={{ backfaceVisibility: "hidden" }} // Hide the back of this face when flipped
          >
        <img
          src="/3d/3d.svg" // Path to your SVG in the public folder
          alt="3D Illustration - Front"
          className="w-full h-full object-contain filter drop-shadow-lg" // SVG styling
        />
          </div>

          {/* Back Face of the Card */}
          <div
        className="absolute w-full h-full flex justify-center items-center"
        style={{
          backfaceVisibility: "hidden", // Hide the back of this face when not visible
          transform: "rotateY(180deg)" // Pre-rotate the back face
        }}
          >
        <img
          src="/3d/3d.svg" // You can use the same SVG or a different one for the back
          alt="3D Illustration - Back"
          className="w-full h-full object-contain filter drop-shadow-lg transform scale-x-[-1]" // Example: mirrored SVG
        />
          </div>
        </div>
      </div>

      {/* Modern Navbar from components - Updated with proper connection */}
      <Navbar
        isDarkMode={isDarkMode} // Pass the dark mode state to navbar
        additionalItems={[
          {
        href: "#contact",
        label: "Contact",
        icon: (
          <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
        aria-hidden="true"
          >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        ),
        isActive: activeSection === "contact"
          },
          {
        href: "#",
        label: "Toggle Theme",
        icon: isDarkMode ? (
          <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.2rem] w-[1.2rem]"
          >
        <path
          d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
          </svg>
        ) : (
          <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.2rem] w-[1.2rem]"
          >
        <path
          d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z" 
          fill="currentColor" 
          fillRule="evenodd" 
          clipRule="evenodd"
            />
          </svg>
        ),
        onClick: toggleTheme
          }
        ]}
      />
      
        </div>
      )
    }

