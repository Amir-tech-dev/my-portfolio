import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import FaviconUpdater from '@/components/favicon-updater'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const _jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: 'BOUGHOMD Amir | AI & Data Science Portfolio',
  description: 'Portfolio of BOUGHOMD Amir, 3rd year AI student at the National Polytechnic School of Algiers. Specializing in Python, Data Science, and Machine Learning.',
}

export const viewport = {
  themeColor: '#0d1117',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-dark.svg" type="image/svg+xml" />
      </head>
      <body className={`${_inter.variable} ${_jetbrains.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FaviconUpdater />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
