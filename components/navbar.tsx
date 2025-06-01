"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

// Define the types for navbar items
type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

// Props for the Navbar component
interface NavbarProps {
  additionalItems?: NavItem[];
  isDarkMode?: boolean; // Accept isDarkMode as a prop
}

const Navbar: React.FC<NavbarProps> = ({ additionalItems = [], isDarkMode = false }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [nav, setNav] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Hide navbar when scrolling down, show when scrolling up
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        
        setLastScrollY(window.scrollY);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      
      // Cleanup
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);
  
  // useEffect only runs on client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Default navbar items
  const defaultItems: NavItem[] = [
    {
      href: '/',
      label: 'Home',
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
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
      ),
      isActive: pathname === '/',
    },
    {
      href: '/about',
      label: 'About',
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
          <circle cx="12" cy="8" r="5"></circle>
          <path d="M20 21a8 8 0 0 0-16 0"></path>
        </svg>
      ),
      isActive: pathname === '/about',
    },
    {
      href: '/projects',
      label: 'Projects',
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
          <path d="m16 18 6-6-6-6"></path>
          <path d="m8 6-6 6 6 6"></path>
        </svg>
      ),
      isActive: pathname === '/projects',
    },
    {
      href: 'https://github.com/faizataca',
      label: 'GitHub',
      icon: (
        <svg 
          viewBox="0 0 24 24" 
          className="size-4" 
          aria-hidden="true"
        >
          <path 
            fill="currentColor" 
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      ),
      external: true,
    },
  ];

  // Combine default items with any additional items
  const allItems = [...defaultItems, ...additionalItems];
  
  // Render a divider component - updated to use explicit conditional styling
  const Divider = () => (
    <div className={`h-6 w-px mx-1 opacity-70 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
  );

  const handleNav = () => {
    setNav(!nav);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${visible ? 'translate-y-0 scale-100' : 'translate-y-24 scale-95'}`}>
      {/* Background navbar: hitam transparan untuk dark mode, putih transparan untuk light mode */}
      <div className={`w-max p-2 rounded-full border ${isDarkMode ? 'border-gray-700 bg-black/80' : 'border-gray-200 bg-white/70'} z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 backdrop-blur-md shadow-xl transform-gpu transition-all duration-300 hover:shadow-2xl`}>
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            {index === 3 && <Divider />}
            
            {index === allItems.length - 1 && additionalItems.length > 1 && <Divider />}
            
            <div
              className="flex aspect-square cursor-pointer items-center justify-center rounded-full relative m-1 hover:mx-3 transition-all duration-300 w-10 h-10"
            >
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="group peer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 rounded-full w-10 h-10 z-10 relative hover:scale-110"
                  aria-label={item.label}
                  style={{ 
                    color: isDarkMode ? '#ffffff' : '#4b5563',
                    fill: isDarkMode ? '#ffffff' : 'currentColor'
                  }}
                >
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} opacity-0 group-active:opacity-100 transition-all duration-200`}></span>
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-600/30' : 'bg-gray-300/50'} opacity-0 group-hover:opacity-100 group-active:opacity-50 transition-all duration-300`}></span>
                  <span 
                    className="relative z-10 transition-transform duration-300"
                    style={{ 
                      color: isDarkMode ? '#ffffff' : 'inherit',
                      fill: isDarkMode ? '#ffffff' : 'currentColor'
                    }}
                  >
                    {item.icon}
                  </span>
                </button>
              ) : item.external ? (
                <a 
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group peer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 rounded-full w-10 h-10 z-10 relative hover:scale-110"
                  aria-label={item.label}
                  style={{ 
                    color: isDarkMode ? '#ffffff' : '#4b5563',
                    fill: isDarkMode ? '#ffffff' : 'currentColor'
                  }}
                >
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} opacity-0 group-active:opacity-100 transition-all duration-200`}></span>
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-600/30' : 'bg-gray-300/50'} opacity-0 group-hover:opacity-100 group-active:opacity-50 transition-all duration-300`}></span>
                  <span 
                    className="relative z-10 transition-transform duration-300"
                    style={{ 
                      color: isDarkMode ? '#ffffff' : 'inherit',
                      fill: isDarkMode ? '#ffffff' : 'currentColor'
                    }}
                  >
                    {item.icon}
                  </span>
                </a>
              ) : (
                <Link 
                  href={item.href}
                  className="group peer inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:pointer-events-none disabled:opacity-50 rounded-full w-10 h-10 z-10 relative hover:scale-110"
                  aria-label={item.label}
                  aria-current={item.isActive ? 'page' : undefined}
                  style={{ 
                    color: isDarkMode ? '#ffffff' : '#4b5563',
                    fill: isDarkMode ? '#ffffff' : 'currentColor'
                  }}
                >
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'} opacity-0 group-active:opacity-100 transition-all duration-200`}></span>
                  <span className={`absolute inset-0 rounded-full ${isDarkMode ? 'bg-gray-600/30' : 'bg-gray-300/50'} opacity-0 group-hover:opacity-100 group-active:opacity-50 transition-all duration-300`}></span>
                  <span 
                    className="relative z-10 transition-transform duration-300"
                    style={{ 
                      color: isDarkMode ? '#ffffff' : 'inherit',
                      fill: isDarkMode ? '#ffffff' : 'currentColor'
                    }}
                  >
                    {item.icon}
                  </span>
                </Link>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed left-0 top-16 w-full h-[calc(100vh-4rem)] bg-white dark:bg-black transition-transform duration-300 ease-in-out transform ${nav ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center h-full">
          <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setNav(false)}>
            Home
          </Link>
          <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setNav(false)}>
            About
          </Link>
          <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setNav(false)}>
            Projects
          </Link>
          {/* <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors" onClick={() => setNav(false)}>
            Contact
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;