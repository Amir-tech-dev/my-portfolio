"use client"

import { useEffect, useRef, useState } from "react"

function AnimatedCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const counted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true
          const duration = 1500
          const steps = 40
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl font-bold text-gradient font-mono">
        {count}{suffix}
      </div>
      <div className="mt-1 text-xs text-muted-foreground tracking-wide uppercase">{label}</div>
    </div>
  )
}

export default function AboutSection() {
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
    <section
      ref={ref}
      id="about"
      className="relative mx-auto max-w-5xl px-6 py-32"
    >
      <div
        className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            About Me
          </span>
        </div>

        <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Building intelligence<br />
          <span className="text-muted-foreground">from data.</span>
        </h2>

        <div className="mb-12 grid grid-cols-3 gap-6 rounded-xl border border-border bg-card/30 p-6 backdrop-blur-sm">
          <AnimatedCounter target={3} suffix="rd" label="Year Student" />
          <AnimatedCounter target={2} suffix="" label="Certificates" />
          <AnimatedCounter target={1} suffix="" label="Internship" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              I am a 3rd year student in Data Science and AI at the{" "}
              <span className="text-foreground font-medium">
                National Polytechnic School of Algiers (ENP)
              </span>
              , one of the most prestigious engineering schools in Algeria.
            </p>
            <p>
              My journey in AI started with a deep curiosity about how machines can learn from data.
              Today, I specialize in data science and AI , leveraging
              the Python ecosystem to extract insights and build predictive models.
            </p>
            <p>
              I am currently deepening my expertise in machine learning workflows with
              scikit-learn, while continuing to strengthen my foundations in
              statistical analysis and data visualization.
            </p>
          </div>

          <div className="space-y-6">
            <div className="gradient-border">
              <div className="rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h3 className="mb-1 text-sm font-semibold tracking-widest text-primary uppercase">
                  Education
                </h3>
                <p className="text-lg font-semibold text-foreground">
                  National Polytechnic School of Algiers
                </p>
                <p className="text-sm text-muted-foreground">
                  3rd Year - Artificial Intelligence & AI
                </p>
              </div>
            </div>

            <div className="gradient-border">
              <div className="rounded-xl bg-card/80 p-6 backdrop-blur-sm">
                <h3 className="mb-1 text-sm font-semibold tracking-widest text-primary uppercase">
                  Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Data Science", "Machine Learning", "Statistical Analysis", "Data Visualization", "Predictive Modeling"].map(
                    (area) => (
                      <span
                        key={area}
                        className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
