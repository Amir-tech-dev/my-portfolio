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
        className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
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
          {/* Animated gradient vertical line */}
          <div
            className="absolute left-0 top-0 h-full w-px md:left-8"
            style={{
              background: "linear-gradient(180deg, hsl(172 66% 50%) 0%, hsl(199 89% 48%) 50%, hsl(172 66% 50%) 100%)",
              backgroundSize: "100% 200%",
              animation: "timeline-flow 3s linear infinite",
            }}
          />

          {/* Internship Entry */}
          <div className="relative pl-8 md:pl-20">
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 md:left-8 -translate-x-[7px]">
              <span className="inline-flex h-3.5 w-3.5 rounded-full border-2 border-primary bg-background" />
            </div>

            <div className="glow-card shimmer rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    AI & Machine Learning Intern
                  </h3>
                  <p className="text-gradient font-medium inline-block">
                    Algerie Telecom
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                    Internship
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 font-mono text-xs text-muted-foreground">
                    2025
                  </span>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">
                Discovered the Big Data and AI ecosystem applied to telecommunications data processing (CDR).
                Gained hands-on experience with API tools, infrastructure virtualization, and implementing
                machine learning models for predictive tasks.
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold tracking-widest text-foreground/70 uppercase">
                  Key Takeaways
                </h4>
                <ul className="space-y-2">
                  {[
                    "Explored Big Data ecosystems (Hadoop, HDFS, Spark, Hive)",
                    "Worked with API & monitoring tools (Postman, Swagger, PM2, Prometheus)",
                    "Discovered enterprise IT infrastructure principles (Virtualization, VPN, WAF)",
                    "Created data visualizations using Power BI",
                    "Implemented ML models (Linear Regression, Decision Trees, Random Forest)",
                  ].map((item, i) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateX(0)" : "translateX(-10px)",
                        transition: `all 0.4s ease ${0.3 + i * 0.1}s`,
                      }}
                    >
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
                {["Machine Learning", "Hadoop", "Spark", "Power BI", "APIs", "Scikit-learn"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary"
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
