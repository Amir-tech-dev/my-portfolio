"use client"

import { useEffect, useState } from "react"

const roles = ["Data Scientist", "ML Engineer", "Python Developer", "AI Student"]

function TypingEffect() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    const speed = isDeleting ? 40 : 80

    if (!isDeleting && charIndex === currentRole.length) {
      const pause = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(pause)
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [charIndex, isDeleting, roleIndex])

  return (
    <span className="font-mono text-primary">
      {roles[roleIndex].substring(0, charIndex)}
      <span className="inline-block w-[2px] h-5 ml-0.5 bg-primary align-middle" style={{ animation: "typing-cursor 0.8s step-end infinite" }} />
    </span>
  )
}

export default function HeroContent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div
        className={`transition-all duration-1000 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
      >
        {/* Status indicator */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary/30 px-4 py-1.5 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">Available for internships</span>
        </div>

        <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
          <TypingEffect />
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
          <span className="text-foreground">BOUGHOMD</span>
          <br />
          <span className="text-foreground">Amir</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          3rd Year Student at the{" "}
          <span className="text-foreground font-medium">National Polytechnic School of Algiers</span>.
          Passionate about transforming data into intelligence.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.35)]"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
