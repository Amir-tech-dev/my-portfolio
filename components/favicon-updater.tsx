"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

export default function FaviconUpdater() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement
    if (favicon && resolvedTheme) {
      favicon.href = resolvedTheme === "dark" ? "/icon-dark.svg" : "/icon-light.svg"
    }
  }, [resolvedTheme])

  return null
}
