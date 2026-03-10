"use client"

import { useEffect, useRef, useState, useCallback } from "react"

const certificates = [
  {
    title: "Python Data Fundamentals",
    provider: "DataCamp",
    category: "Data Science",
    description: "Fundamentals of Python programming including Data Manipulation with pandas Statistics in Python , exploratory Data Analysis in Python and Data Visualization with Seaborn",
    url: "https://www.datacamp.com/completed/statement-of-accomplishment/track/a263868e3a80bfcbae26a99011ad133c7c3b9a36",
  },
  {
    title: "introduction to Python",
    provider: "kaggle",
    category: "Programming",
    description: " intoduction to Python programming including data types, control flow, and functions",
    url: "https://www.kaggle.com/amirboughomd",
  },
]

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)"
  }, [])

  return (
    <div style={style}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{ transitionProperty: "transform, box-shadow, border-color", transitionDuration: "0.3s", transitionTimingFunction: "ease" }}
      >
        {children}
      </div>
    </div>
  )
}

export default function CertificatesSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="certificates" className="relative mx-auto max-w-5xl px-6 py-32">
      <div
        className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Certificates
          </span>
        </div>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Continuous<br />
              <span className="text-muted-foreground">learning.</span>
            </h2>
            <p className="max-w-xl text-muted-foreground leading-relaxed">
              Here are some of the certifications I have earned
              through DataCamp and kaggle to solidify my data science and Python expertise.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 self-start sm:self-auto">
            <span className="text-2xl font-bold font-mono text-primary">{certificates.length}</span>
            <span className="text-xs text-primary/80 uppercase tracking-wider">Certifications</span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <TiltCard
              key={cert.title}
              className="group shimmer rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm cursor-pointer hover:border-primary/30 hover:shadow-[0_0_40px_rgba(45,212,191,0.08)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              }}
            >
              {/* DataCamp icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03ef62]/10 transition-all duration-300 group-hover:bg-[#03ef62]/20 group-hover:scale-110">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#03ef62]">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                  {cert.category}
                </span>
              </div>

              <h3 className="mb-1 text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="mb-3 font-mono text-xs text-primary">{cert.provider}</p>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {cert.description}
              </p>

              {/* Verify link */}
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all duration-300 hover:text-primary"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Verify on {cert.provider}
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
