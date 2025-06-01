"use client"

import { useState, useEffect } from "react"
import { Github, Linkedin, ExternalLink, BookOpen, Home, Sun, Moon, User, Briefcase, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"

// Define project types and categories
type Project = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  category: string[]
  image_url: string
  live_site_url: string
  read_more_url: string
}

// Define SparkleData type
type SparkleData = {
  key: string;
  color: string;
  size: number;
  style: React.CSSProperties;
};

// Sparkle component for the title animation
const Sparkle = ({ color, size, style }: { color: string; size: number; style: React.CSSProperties }) => {
  return (
    <svg
      className="animate-twinkle absolute"
      style={style}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill={color}
      />
    </svg>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [scrollY, setScrollY] = useState(0)
  const [sparklesData, setSparklesData] = useState<SparkleData[]>([]);

  // Sample project data
  const projects: Project[] = [
    {
      id: "justipin",
      title: "Justipin",
      description: "service app for students to share and order items through a trusted community of shoppers.",
      tech_stack: ["PHP", "Laravel", "MySQL", "Flutter"],
      category: ["WEB", "MOBILE"],
      image_url: "/images/p1.png",
      live_site_url: "https://justiping.my.id",
      read_more_url: "https://justiping.my.id",
    },
    {
      id: "online-exam-app",
      title: "Online Exam App",
      description: "An interactive digital exam system that makes it easy to conduct tests online.",
      tech_stack: ["react", "Node.js", "MySQL"],
      category: ["WEB"],
      image_url: "/images/p2.png",
      live_site_url: "",
      read_more_url: "",
    },
    {
      id: "asave",
      title: "ASave",
      description: "A simple and secure app for managing and tracking your finances.",
      tech_stack: ["react", "Node.js"],
      category: ["WEB, MOBILE"],
      image_url: "/images/p3.png",
      live_site_url: "https://asave.my.id",
      read_more_url: "https://asave.my.id",
    },
    {
      id: "sheyart",
      title: "Sheyart",
      description: "A platform for sharing creative works and ideas with others in real-time",
      tech_stack: ["Flutter", "Firebase", "Redux"],
      category: ["WEB"],
      image_url: "/images/p4.png",
      live_site_url: "https://sheyarte.vercel.app/",
      read_more_url: "https://sheyarte.vercel.app/",
    },
  ]

  // Logo projects data
  const logoProjects = [
    { id: "acvip", image_url: "/logo/acvip.jpg", title: "Acvip Logo" },
    { id: "asave-logo", image_url: "/logo/asave.jpg", title: "Asave Logo" },
    { id: "justipin-logo", image_url: "/logo/justipin.png", title: "Justipin Logo" },
    { id: "verost-logo", image_url: "/logo/verost.jpg", title: "Verost Logo" },
  ];

  // Filter categories for the buttons
  const categories = ["ALL", "WEB", "MOBILE", "LOGO"]

  // Update filtered projects when the active filter changes
  useEffect(() => {
    if (activeFilter === "ALL") {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category.includes(activeFilter)))
    }
  }, [activeFilter])

  // Time update effect
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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Effect to generate sparkles on the client side
  useEffect(() => {
    const generateSparklesOnClient = (count: number, isDark: boolean): SparkleData[] => {
      const newSparkles: SparkleData[] = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 10 + 5;
        let color;
        if (isDark) {
          color = Math.random() > 0.5 ? "#444444" : "#666666";
        } else {
          color = Math.random() > 0.5 ? "#FFFFFF" : "#E0E0E0";
        }
        newSparkles.push({
          key: `sparkle-${i}`,
          color: color,
          size,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            transform: `rotate(${Math.random() * 360}deg)`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 2 + 1}s`,
          },
        });
      }
      return newSparkles;
    };

    setSparklesData(generateSparklesOnClient(15, isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${isDarkMode ? "text-white" : "text-gray-900"}`}>
      {/* Gradient background layer */}
      <div 
        className="fixed inset-0 -z-10" 
        style={{
          backgroundImage: isDarkMode 
            ? 'linear-gradient(135deg, #1e1533 0%, #251941 50%, #1a1325 100%)'
            : 'linear-gradient(to bottom left, #EDE9F6, #FFF1F9, #FFFFFF)',
          backgroundAttachment: 'fixed',
        }}
      />
      
      {/* Transparent overlay for adjusting opacity */}
      <div className={`fixed inset-0 -z-10 ${isDarkMode ? "bg-black/30" : "bg-white/30"}`}></div>
      
      {/* Dark Mode Grid Pattern Overlay */}
      {isDarkMode && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a78bfa' stroke-width='0.2' opacity='0.3'%3E%3Cpath d='M0 0 L60 0 L60 60 L0 60 Z' /%3E%3Cpath d='M15 0 L15 60' /%3E%3Cpath d='M30 0 L30 60' /%3E%3Cpath d='M45 0 L45 60' /%3E%3Cpath d='M0 15 L60 15' /%3E%3Cpath d='M0 30 L60 30' /%3E%3Cpath d='M0 45 L60 45' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
      )}
      
      {/* Glowing Accent Elements */}
      {isDarkMode && (
        <>
          {/* Top-right glow */}
          <div 
            className="fixed top-10 right-[15%] w-72 h-72 rounded-full opacity-10 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(219,39,119,0.5) 0%, rgba(147,51,234,0.2) 70%, rgba(0,0,0,0) 100%)',
            }}
          />
          
          {/* Bottom-left glow */}
          <div 
            className="fixed bottom-20 left-[10%] w-96 h-96 rounded-full opacity-8 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(91,33,182,0.1) 70%, rgba(0,0,0,0) 100%)',
            }}
          />
          
          {/* Center subtle accent */}
          <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-5 blur-[150px]"
            style={{
              background: 'radial-gradient(ellipse, rgba(167,139,250,0.3) 0%, rgba(76,29,149,0.1) 60%, rgba(0,0,0,0) 100%)',
            }}
          />
          
          {/* Small floating accent dots */}
          <div className="fixed top-[30%] right-[20%] w-4 h-4 rounded-full bg-pink-500/30 blur-md animate-float-slow" />
          <div className="fixed top-[60%] left-[25%] w-3 h-3 rounded-full bg-purple-400/20 blur-md animate-float-slow-reverse" style={{ animationDelay: '-7s' }} />
          <div className="fixed top-[15%] left-[40%] w-2 h-2 rounded-full bg-indigo-400/30 blur-sm animate-float-slow" style={{ animationDelay: '-3s' }} />
          <div className="fixed bottom-[25%] right-[35%] w-2 h-2 rounded-full bg-fuchsia-400/25 blur-sm animate-float-slow-reverse" style={{ animationDelay: '-5s' }} />
        </>
      )}

      {/* Update header for consistent styling with the new background */}
      <header className={`fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center ${
        isDarkMode 
          ? "bg-[#1e1533]/70 backdrop-blur-md border-purple-900/20" 
          : "bg-white/30 backdrop-blur-sm border-white/30"
        } border-b transition-all duration-300`}>
        <Link href="/" className="text-2xl font-bold">PORTFOLIO</Link>
        <div className="font-mono text-sm">{currentTime}</div>
      </header>

      {/* Projects Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className={`absolute top-40 right-10 w-64 h-64 rounded-full ${
          isDarkMode ? 'bg-indigo-900/10' : 'bg-lavender-200/20'
        } blur-3xl`} style={{ transform: `translateY(${scrollY * 0.05}px)` }}></div>
        
        <div className={`absolute bottom-40 left-10 w-72 h-72 rounded-full ${
          isDarkMode ? 'bg-violet-900/10' : 'bg-pink-200/15'
        } blur-3xl`} style={{ transform: `translateY(${-scrollY * 0.03}px)` }}></div>
        
        <div className={`absolute top-[30%] left-[20%] w-20 h-20 rounded-full ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-lavender-300/10'
        } blur-2xl`} style={{ transform: `translate(${scrollY * 0.02}px, ${-scrollY * 0.01}px)` }}></div>
        
        <div className={`absolute bottom-[25%] right-[15%] w-32 h-32 rounded-full ${
          isDarkMode ? 'bg-purple-900/10' : 'bg-pink-100/20'
        } blur-2xl`} style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)` }}></div>

        <div className="max-w-6xl mx-auto py-16 px-4">
          {/* Section Title with Sparkles */}
          <div className="relative flex justify-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-center relative z-10">
              My Projects
            </h1>
            {/* Render sparkles using the state */}
            {sparklesData.map((sparkleProps) => (
              <Sparkle
                key={sparkleProps.key}
                color={sparkleProps.color}
                size={sparkleProps.size}
                style={sparkleProps.style}
              />
            ))}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`
                  rounded-full px-4 py-2 text-sm md:text-base border 
                  ${isDarkMode 
                    ? 'border-gray-700/30' 
                    : 'border-white/30'
                  }
                  ${activeFilter === category 
                    ? isDarkMode 
                      ? `bg-gray-800 text-white shadow-lg` 
                      : `bg-white/50 shadow-lg` 
                    : isDarkMode 
                      ? `bg-gray-900/50 hover:bg-gray-800/50` 
                      : `bg-white/20 hover:bg-white/40`
                  }
                  md:backdrop-blur-sm transition-all duration-300
                `}
              >
                {category}
              </button>
            ))}
          </div>          {/* Projects Grid with Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`group border rounded-xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 animate-fade-in-up relative
                  ${isDarkMode 
                    ? 'bg-black/15 border-white/20' 
                    : 'bg-white/70 border-white/20'
                  }
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Before/After decorative elements */}
                <div className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-1000 group-hover:duration-200
                  ${isDarkMode 
                    ? 'bg-white/30' 
                    : 'bg-white/40'
                  }
                `}></div>{/* Project Image with Enhanced Hover Effect */}                <div className="relative overflow-hidden group">
                  <div className="w-full h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-white/30 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-between z-20">
                      <div className={`p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {project.category.map((cat, idx) => (
                          <span key={idx} className="font-medium text-xs bg-black/40 dark:bg-white/30 px-3 py-1 rounded-full inline-block animate-pulse-soft" style={{ animationDelay: `${idx * 200}ms` }}>
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                          <ExternalLink size={16} className={`animate-bounce-sm ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-5 flex flex-col h-full relative backdrop-blur-sm">                  <h3 className="font-semibold text-lg mb-2 transition-colors duration-300">
                    <span className="inline-block transition-all duration-300 group-hover:opacity-80">
                      {project.title}
                    </span>
                  </h3>
                  <p className={`text-sm mb-4 flex-grow ${isDarkMode ? "text-gray-300 group-hover:text-white" : "text-gray-600 group-hover:text-gray-800"} transition-colors duration-300`}>
                    {project.description.length > 100 
                      ? `${project.description.substring(0, 100)}...` 
                      : project.description}
                  </p>                  
                  
                  {/* Tech Stack Tags with Staggered Animation */}
                  <div className="flex flex-wrap gap-2 mb-4 h-8 overflow-hidden">
                    {project.tech_stack.map((tech, idx) => (                      <span
                        key={idx}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-black/5 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 inline-flex items-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                        style={{ 
                          transitionDelay: `${idx * 100}ms`,
                        }}
                      >
                        <span className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-300 mr-1.5 animate-pulse-soft"></span>
                        {tech}
                      </span>
                    ))}
                  </div>                  
                  
                  {/* Action Buttons with Reveal Effect */}
                  <div className="flex gap-3 mt-auto transform transition-all duration-500">                    <a
                      href={project.live_site_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 text-sm px-4 py-2 rounded-full font-medium bg-black/70 hover:bg-black/80 text-white transition-all duration-300 hover:scale-105 flex-1 relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10 truncate">Visit Site</span> 
                      <ExternalLink size={14} className="relative z-10 ml-1 group-hover:animate-bounce-sm" />
                      <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    </a>                    <a
                      href={project.live_site_url}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-1 text-sm px-4 py-2 rounded-full font-medium bg-black/5 dark:bg-white/10 border border-white/30 transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:hover:bg-white/20 flex-1 relative overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="relative z-10 truncate">Details</span>
                      <BookOpen size={14} className="relative z-10 ml-1 group-hover:animate-bounce-sm" />
                      <div className="absolute inset-0 bg-white/10 dark:bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    </a>
                  </div>                    {/* Hover Indicators */}
                  <div className="absolute -bottom-1 left-0 w-0 h-1 bg-white/60 dark:bg-white/40 group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute -right-1 top-0 h-0 w-1 bg-white/60 dark:bg-white/40 group-hover:h-full transition-all duration-700 delay-200"></div>
                </div>
                
                {/* Clickable overlay for the whole card */}                <a
                  href={project.live_site_url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 rounded-xl"
                  aria-label={`Visit ${project.title} website`}
                >
                  <span className="sr-only">Visit project website</span>
                </a>
              </div>
            ))}
          </div>

          {/* Logo Projects Section */}
          <div className="mt-16">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative z-10">
              Client Logos
            </h2> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {logoProjects.map((logo, index) => (
                <div
                  key={logo.id}
                  className={`group border rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-fade-in-up relative p-4 flex items-center justify-center
                    ${isDarkMode 
                      ? 'bg-black/15 border-white/20' 
                      : 'bg-white/70 border-white/20'
                    }
                  `}
                  style={{ animationDelay: `${index * 150}ms`, aspectRatio: '1 / 1' }}
                >
                  <Image
                    src={logo.image_url}
                    alt={logo.title}
                    width={150}
                    height={150}
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modern Navbar from components */}
      <Navbar 
        isDarkMode={isDarkMode}
        additionalItems={[
          {
            href: "mailto:ismifaizata@gmail.com",
            label: "Contact",
            icon: <Mail className="size-4" />,
            isActive: false,
            external: true
          },
          {
            href: "#",
            label: "Toggle Theme",
            icon: isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />,
            onClick: toggleTheme
          }
        ]}
      />
    </div>
  )
}
