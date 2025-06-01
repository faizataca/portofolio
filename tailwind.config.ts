import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
  		colors: {
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
        },
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  keyframes: {
            'ripple': {
                '0%': {
                    transform: 'scale(0.8)',
                    opacity: '1'
                },
                '100%': {
                    transform: 'scale(2.5)',
                    opacity: '0'
                }
            },
            'glow-pulse': {
                '0%, 100%': {
                    opacity: '0.6',
                    transform: 'scale(1)'
                },
                '50%': {
                    opacity: '1',
                    transform: 'scale(1.1)'
                }
            },
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
			'fade-in-up': {
				'0%': {
					opacity: '0',
					transform: 'translateY(25px)'
				},
				'70%': {
					opacity: '0.9',
					transform: 'translateY(-5px)'
				},
				'100%': {
					opacity: '1',
					transform: 'translateY(0)'
				}
			},
			'curve-exit': {
				'0%': {
					clipPath: 'ellipse(150% 150% at 50% 50%)'
				},
				'50%': {
					clipPath: 'ellipse(100% 70% at 50% 0%)',
					transform: 'translateY(0)'
				},
				'100%': {
					clipPath: 'ellipse(100% 0% at 50% 0%)',
					transform: 'translateY(-100%)'
				}
			},
			'scale-in': {
				'0%': {
					opacity: '0',
					transform: 'scale(0.9)'
				},
				'100%': {
					opacity: '1',
					transform: 'scale(1)'
				}
			},
			'twinkle': {
				'0%': {
					opacity: '0.3',
					transform: 'scale(0.8) rotate(0deg)'
				},
				'50%': {
					opacity: '0.9',
					transform: 'scale(1.2) rotate(180deg)'
				},
				'100%': {
					opacity: '0.3',
					transform: 'scale(0.8) rotate(360deg)'
				}
			},
			'pulse-soft': {
				'0%, 100%': {
					opacity: '1',
					transform: 'scale(1)'
				},
				'50%': {
					opacity: '0.8',
					transform: 'scale(1.05)'
				}
			},
			'bounce-sm': {
				'0%, 100%': {
					transform: 'translateY(0)'
				},
				'50%': {
					transform: 'translateY(-4px)'
				}
			},
			'float': {
				'0%, 100%': {
					transform: 'translateY(0)'
				},
				'50%': {
					transform: 'translateY(-10px)'
				}
			},
			'tilt': {
				'0%, 100%': {
					transform: 'rotate(0deg)'
				},
				'25%': {
					transform: 'rotate(1deg)'
				},
				'75%': {
					transform: 'rotate(-1deg)'
				}
			},
			'arrow-down': {
				'0%, 100%': {
					transform: 'translateY(0)'
				},
				'50%': {
					transform: 'translateY(5px)'
				}
			},
      'infinite-slider': {
		'0%': { transform: 'translateX(0)' },
		'100%': { transform: 'translateX(-100%)' },
	  },
	  'float-scale': {
		'0%, 100%': { transform: 'translateY(0) scale(1)' },
		'50%': { transform: 'translateY(-20px) scale(1.05)' },
	  },
	  'float-reverse': {
		'0%, 100%': { transform: 'translateY(0) scale(1)' },
		'50%': { transform: 'translateY(20px) scale(1.05)' },
      }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
            'twinkle': 'twinkle 5s ease-in-out infinite',
            'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
            'bounce-sm': 'bounce-sm 2s ease-in-out infinite',
  			'accordion-up': 'accordion-up 0.2s ease-out',
			'fade-in-up': 'fade-in-up 0.7s ease-out',
			'scale-in': 'scale-in 0.7s ease-out',
			'float': 'float 5s ease-in-out infinite',
			'tilt': 'tilt 10s ease-in-out infinite',
			'curve-exit': 'curve-exit 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            'spin-slow': 'spin 8s linear infinite',
            'ripple': 'ripple 1.5s cubic-bezier(0,0,0.2,1) infinite',
            'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
            'word-appear': 'fade-in-up 0.8s cubic-bezier(0.2, 0.9, 0.3, 1.3) forwards',
            'arrow-bounce': 'arrow-down 2s ease-in-out infinite',
            'infinite-slider': 'infinite-slider 20s linear infinite',
            'float-slow': 'float 15s ease-in-out infinite',
            'float-slow-reverse': 'float-reverse 18s ease-in-out infinite',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
