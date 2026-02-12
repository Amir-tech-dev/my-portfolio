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
    } catch (error) {
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
        className={`transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px w-12 bg-primary" />
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full rounded-lg border border-border bg-card/50 px-4 py-3 text-foreground backdrop-blur-sm transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-500">
                Message sent successfully! {"I'll"} get back to you soon.
              </div>
            )}

            {status === "error" && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-500">
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
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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
              className="group flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
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
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="font-mono text-sm text-muted-foreground">
          {"<"}
          <span className="text-primary">AB</span>
          {" /> "}
          <span className="text-foreground/50">{"// BOUGHOMD Amir"}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Built with passion for AI and data science.
        </p>
      </div>
    </footer>
  )
}
