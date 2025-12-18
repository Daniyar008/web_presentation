"use client"

import { Hero } from "@/components/hero"
import { Vision } from "@/components/vision"
import { Architecture } from "@/components/architecture"
import { TechStack } from "@/components/tech-stack"
import { Features } from "@/components/features"
import { Problems } from "@/components/problems"
import { Metrics } from "@/components/metrics"
import { Results } from "@/components/results"
import { Navigation } from "@/components/navigation"
import { ParticleBackground } from "@/components/particle-background"

export default function Home() {
  return (
    <main className="relative bg-slate-950 text-white overflow-x-hidden">
      <ParticleBackground />
      <Navigation />
      <Hero />
      <Vision />
      <Architecture />
      <TechStack />
      <Features />
      <Problems />
      <Metrics />
      <Results />
    </main>
  )
}
