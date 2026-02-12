"use client"

import { useEffect, useRef, useState } from "react"

const certificates = [
  {
    title: "Introduction to Python",
    provider: "DataCamp",
    category: "Programming",
    description: "Fundamentals of Python programming including data types, control flow, and functions.",
  },
  {
    title: "Intermediate Python",
    provider: "DataCamp",
    category: "Programming",
    description: "Advanced Python concepts including Matplotlib, dictionaries, pandas DataFrames, and logic.",
  },
  {
    title: "Introduction to Data Science in Python",
    provider: "DataCamp",
    category: "Data Science",
    description: "Core data science concepts using Python with real-world datasets.",
  },
  {
    title: "Data Manipulation with pandas",
    provider: "DataCamp",
    category: "Data Science",
    description: "Transforming, aggregating, and manipulating data using the pandas library.",
  },
  {
    title: "Introduction to Statistics in Python",
    provider: "DataCamp",
    category: "Statistics",
    description: "Statistical thinking and analysis with Python, covering probability and distributions.",
  },
  {
    title: "Joining Data with pandas",
    provider: "DataCamp",
    category: "Data Science",
    description: "Combining and merging datasets using advanced pandas techniques.",
  },
]

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
        className={`transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-primary" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Certificates
          </span>
        </div>

        <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Continuous<br />
          <span className="text-muted-foreground">learning.</span>
        </h2>

        <p className="mb-12 max-w-xl text-muted-foreground leading-relaxed">
          I believe in lifelong learning. Here are some of the certifications I have earned
          through DataCamp to solidify my data science and Python expertise.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <div
              key={cert.title}
              className="group rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
              style={{
                transitionDelay: visible ? `${i * 80}ms` : "0ms",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* DataCamp icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03ef62]/10">
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
              <p className="text-sm leading-relaxed text-muted-foreground">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
