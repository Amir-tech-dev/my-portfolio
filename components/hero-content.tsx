"use client"

import { useEffect, useState } from "react"

export default function HeroContent() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div
        className={`transition-all duration-1000 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
          AI & Data Science Student
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">BOUGHOMD</span>
          <br />
          <span className="text-balance">Amir</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          3rd Year Student at the{" "}
          <span className="text-foreground font-medium">National Polytechnic School of Algiers</span>.
          Passionate about transforming data into intelligence.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(45,212,191,0.3)]"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
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
