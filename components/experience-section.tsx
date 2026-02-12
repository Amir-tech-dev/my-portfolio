"use client"

import { useEffect, useRef, useState } from "react"

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="experience" className="relative mx-auto max-w-5xl px-6 py-32">
      <div
        className={`transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-primary" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Experience
          </span>
        </div>

        <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Professional<br />
          <span className="text-muted-foreground">experience.</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-8" />

          {/* Internship Entry */}
          <div className="relative pl-8 md:pl-20">
            {/* Timeline dot */}
            <div className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center md:left-8">
              <div className="h-4 w-4 -translate-x-[7px] rounded-full border-2 border-primary bg-background" />
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(45,212,191,0.05)] md:p-8">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    AI & Machine Learning Intern
                  </h3>
                  <p className="text-primary font-medium">
                    Algerie Telecom
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                  Internship
                </span>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                Introduced to the practical applications of Artificial Intelligence and Machine Learning
                in the telecommunications industry. Gained hands-on experience working with real-world datasets
                and understanding how AI-driven solutions are deployed in enterprise environments.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold tracking-widest text-foreground/70 uppercase">
                  Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {[
                    "Exposure to AI/ML applications in telecommunications",
                    "Working with real-world production datasets",
                    "Understanding ML model deployment pipelines",
                    "Collaboration with data engineering teams",
                    "Introduction to enterprise AI infrastructure",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 flex-shrink-0 text-primary"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Python", "Machine Learning", "Data Analysis", "AI Infrastructure", "Telecommunications"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
