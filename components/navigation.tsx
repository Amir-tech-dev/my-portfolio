"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-mono text-lg font-bold tracking-tight text-foreground">
          {"<"}
          <span className="text-primary">AB</span>
          {" />"}
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "h-0.5 w-6 rounded bg-foreground transition-all duration-300",
              mobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 rounded bg-foreground transition-all duration-300",
              mobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-6 rounded bg-foreground transition-all duration-300",
              mobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 md:hidden",
          mobileOpen ? "max-h-80 border-b border-border/50" : "max-h-0"
        )}
      >
        <div className="flex flex-col gap-4 bg-background/95 px-6 py-6 backdrop-blur-xl">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-2 rounded-lg p-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? (
              <>
                <Sun size={18} />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon size={18} />
                <span>Dark Mode</span>
              </>
            ))}
          </button>
        </div>
      </div>
    </header>
  )
}
