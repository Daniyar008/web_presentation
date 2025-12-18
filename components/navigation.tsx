"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const sections = [
  { id: "hero", label: "Главная" },
  { id: "vision", label: "Цели" },
  { id: "architecture", label: "Архитектура" },
  { id: "tech-stack", label: "Технологии" },
  { id: "features", label: "Функции" },
  { id: "problems", label: "Решения" },
  { id: "metrics", label: "Метрики" },
  { id: "results", label: "Итоги" },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-cyan-400/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500" />
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              E-Commerce Platform
            </span>
          </div>
          <div className="hidden md:flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 rounded-lg transition-all ${activeSection === section.id ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white" : "text-slate-300 hover:bg-slate-800"
                  }`}
              >
                <span className="text-sm">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
