"use client"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    title: "Programming",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 70 },
      { name: "C", level: 60 },
    ],
  },
  {
    title: "Data Science",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <ellipse cx="12" cy="5" rx="9" ry="3" />
      </svg>
    ),
    skills: [
      { name: "Pandas", level: 85 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 80 },
      { name: "Seaborn", level: 75 },
    ],
  },
  {
    title: "Machine Learning",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M12 22a4 4 0 0 1-4-4c0-1.95 1.4-3.58 3.25-3.93" />
        <path d="M2 12a4 4 0 0 1 4-4c1.95 0 3.58 1.4 3.93 3.25" />
        <path d="M22 12a4 4 0 0 1-4 4c-1.95 0-3.58-1.4-3.93-3.25" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    skills: [
      { name: "Scikit-learn", level: 65 },
      { name: "Data Preprocessing", level: 75 },
      { name: "Feature Engineering", level: 65 },
      { name: "Model Evaluation", level: 60 },
    ],
  },
  {
    title: "Tools & Other",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      { name: "Jupyter Notebooks", level: 85 },
      { name: "Git & GitHub", level: 70 },
      { name: "VS Code", level: 80 },
      { name: "Google Colab", level: 80 },
    ],
  },
]

function RadialSkill({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  const radius = 30
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (level / 100) * circumference

  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="relative">
        <svg width="76" height="76" viewBox="0 0 76 76" className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-secondary"
          />
          {/* Progress ring */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            fill="none"
            stroke="url(#skillGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animate ? offset : circumference}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: animate ? "drop-shadow(0 0 6px rgba(45, 212, 191, 0.4))" : "none",
            }}
          />
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold font-mono text-foreground">{level}%</span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground text-center transition-colors duration-300 group-hover:text-primary max-w-[80px]">
        {name}
      </span>
    </div>
  )
}

export default function SkillsSection() {
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
    <section ref={ref} id="skills" className="relative mx-auto max-w-5xl px-6 py-32">
      <div
        className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Skills
          </span>
        </div>

        <h2 className="mb-12 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Technical<br />
          <span className="text-muted-foreground">toolkit.</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, ci) => (
            <div
              key={category.title}
              className="glow-card shimmer rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm"
              style={{
                transitionDelay: `${ci * 100}ms`,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:animate-pulse">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap justify-around gap-4">
                {category.skills.map((skill, si) => (
                  <RadialSkill
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    animate={visible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
