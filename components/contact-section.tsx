"use client"

import { useEffect, useRef, useState } from "react"

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })

      setTimeout(() => setStatus("idle"), 5000)
    } catch {
      setStatus("error")
      setErrorMessage("Failed to send message. Please try again or email me directly.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section ref={ref} id="contact" className="relative mx-auto max-w-5xl px-6 py-32">
      <div
        className={`transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-primary to-cyan-500" />
          <span className="font-mono text-sm tracking-widest text-primary uppercase">
            Contact
          </span>
        </div>

        <h2 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {"Let's"}<br />
          <span className="text-muted-foreground">connect.</span>
        </h2>

        <p className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {"I'm"} always open to discussing AI projects, internship opportunities,
          or just having a conversation about data science and machine learning.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
              { id: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
            ].map((field) => (
              <div key={field.id} className="group relative">
                <label
                  htmlFor={field.id}
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${formData[field.id as keyof typeof formData]
                    ? "top-1 text-xs text-primary"
                    : "top-3.5 text-sm text-muted-foreground group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-primary"
                    }`}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={formData[field.id as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-border bg-card px-4 pt-5 pb-2 text-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(45,212,191,0.1)]"
                />
              </div>
            ))}

            <div className="group relative">
              <label
                htmlFor="message"
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${formData.message
                  ? "top-1 text-xs text-primary"
                  : "top-3.5 text-sm text-muted-foreground group-focus-within:top-1 group-focus-within:text-xs group-focus-within:text-primary"
                  }`}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-border bg-card px-4 pt-5 pb-2 text-foreground transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(45,212,191,0.1)] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="group w-full rounded-lg bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {status === "loading" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending...
                </span>
              ) : status === "success" ? (
                <span className="inline-flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Sent!
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </span>
              )}
            </button>

            {status === "success" && (
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-500 animate-slide-up">
                Message sent successfully! {"I'll"} get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500 animate-slide-up">
                {errorMessage}
              </div>
            )}
          </form>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Or reach out via:</h3>

            {/* Email */}
            <a
              href="mailto:amir_sidi_mohamed.boughomd@g.enp.edu.dz"
              className="group shimmer flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                  amir_sidi_mohamed.boughomd@g.enp.edu.dz
                </p>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/amir-boughomd/"
              target="_blank"
              rel="noopener noreferrer"
              className="group shimmer flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">LinkedIn</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  Amir Boughomd
                </p>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/amir-tech-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="group shimmer flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">GitHub</p>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  amir-tech-dev
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Gradient separator */}
        <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="font-mono text-sm text-muted-foreground">
              {"<"}
              <span className="text-gradient">AB</span>
              {" /> "}
              <span className="text-foreground/50">{"// BOUGHOMD Amir"}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} · Built with passion for AI and data science.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Social icons in footer */}
            <a href="https://github.com/amir-tech-dev" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-primary" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/amir-boughomd/" target="_blank" rel="noopener noreferrer" className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-primary" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="mailto:amir_sidi_mohamed.boughomd@g.enp.edu.dz" className="rounded-lg p-2 text-muted-foreground transition-all duration-300 hover:bg-secondary hover:text-primary" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="ml-2 flex items-center gap-2 rounded-full border border-border bg-secondary/30 px-4 py-2 text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/10 hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
