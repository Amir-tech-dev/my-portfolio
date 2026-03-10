"use client"

import { useEffect, useRef, useState } from "react"

const projects = [
    {
        title: "Boston Housing Price Prediction",
        description: "Implemented a Linear Regression model to predict house prices based on various features. Included data preprocessing with StandardScaler.",
        tags: ["Python", "Scikit-learn", "Regression", "Pandas"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
            </svg>
        ),
        featured: false,
        gradient: "from-primary/20 to-cyan-500/20",
    },
    {
        title: "Iris Flower Classification",
        description: "Developed a classification model to identify Iris species using Decision Trees and Random Forest. Evaluated model accuracy and feature importance.",
        tags: ["Python", "Classification", "Random Forest", "Machine Learning"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="m12 16 4-4-4-4-4 4z" />
            </svg>
        ),
        featured: false,
        gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
        title: "SMS Spam Detection",
        description: "Built a text classification system to detect spam messages. Utilized One-Hot Encoding and data preprocessing techniques before model training.",
        tags: ["Python", "NLP", "Classification", "Data Preprocessing"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        ),
        featured: false,
        gradient: "from-emerald-500/20 to-teal-500/20",
    },
]

export default function ProjectsSection() {
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

    const featured = projects.find((p) => p.featured)
    const others = projects.filter((p) => !p.featured)

    return (
        <section ref={ref} id="projects" className="relative mx-auto max-w-5xl px-6 py-32">
            <div
                className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
            >
                <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
                    <span className="font-mono text-sm tracking-widest text-primary uppercase">
                        Projects
                    </span>
                </div>

                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                        Recent<br />
                        <span className="text-muted-foreground">projects.</span>
                    </h2>
                    <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
                        A selection of AI & data science exercises showcasing my skills in machine learning algorithms and data preprocessing.
                    </p>
                </div>

                {/* Featured project card */}
                {featured && (
                    <div
                        className="group mb-8 glow-card shimmer rounded-xl border border-border bg-card/50 p-8 backdrop-blur-sm"
                        style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.6s ease 0.1s",
                        }}
                    >
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${featured.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="relative">
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                                        {featured.icon}
                                    </div>
                                    <div>
                                        <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs text-primary mb-1">
                                            Featured
                                        </span>
                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-gradient transition-all duration-300">
                                            {featured.title}
                                        </h3>
                                    </div>
                                </div>
                                <a href="https://github.com/amir-tech-dev" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-primary">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </a>
                            </div>
                            <p className="mb-6 max-w-2xl text-muted-foreground leading-relaxed">{featured.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {featured.tags.map((tag) => (
                                    <span key={tag} className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Other project cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((project, i) => (
                        <div
                            key={project.title}
                            className="group glow-card shimmer rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm relative overflow-hidden"
                            style={{
                                opacity: visible ? 1 : 0,
                                transform: visible ? "translateY(0)" : "translateY(20px)",
                                transition: `all 0.6s ease ${0.2 + i * 0.1}s`,
                            }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="relative">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                                        {project.icon}
                                    </div>
                                    <a href="https://github.com/amir-tech-dev" target="_blank" rel="noopener noreferrer" className="rounded-lg p-1.5 text-muted-foreground transition-all duration-300 hover:text-primary">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M7 17l9.2-9.2M17 17V7H7" />
                                        </svg>
                                    </a>
                                </div>
                                <h3 className="mb-2 text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
