"use client"

import dynamic from "next/dynamic"

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background" />,
})

export default function HeroSceneWrapper() {
  return <HeroScene />
}
