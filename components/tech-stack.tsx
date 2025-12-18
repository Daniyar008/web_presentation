"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const technologies = [
  { name: "Django 4.2", desc: "Full-stack фреймворк", stats: ["ORM", "Admin", "Auth"], color: "emerald" },
  { name: "PostgreSQL 15", desc: "Надежная СУБД", stats: ["JSONB", "ACID", "Supabase"], color: "violet" },
  { name: "Redis 7", desc: "Кэш + брокер", stats: ["Cache", "Queue", "Fast"], color: "red" },
  { name: "Docker 24", desc: "Контейнеризация", stats: ["180MB", "Fast", "Secure"], color: "cyan" },
  { name: "Kubernetes", desc: "Оркестрация", stats: ["Auto-scale", "Self-heal", "HA"], color: "blue" },
  { name: "Nginx 1.24", desc: "Балансировщик", stats: ["10K conn", "SSL", "Cache"], color: "green" },
]

const comparisons = {
  frameworks: {
    title: "Backend Фреймворк",
    options: [
      { name: "Django", pros: ["Встроенный ORM", "Admin-панель", "Батарейки в комплекте"], winner: true },
      { name: "Flask", pros: ["Минимализм"], cons: ["Требует доп. ORM", "Нет админки"] },
      { name: "FastAPI", pros: ["Async из коробки"], cons: ["Требует доп. ORM", "Нет админки"] },
    ],
  },
  databases: {
    title: "СУБД для маркетплейса",
    options: [
      { name: "PostgreSQL", pros: ["JSONB поддержка", "ACID compliance", "Бесплатный Supabase"], winner: true },
      { name: "MySQL", pros: ["ACID compliance"], cons: ["JSON поддержка ограничена", "Платные аналоги"] },
      { name: "SQLite", pros: ["Легкий"], cons: ["Не для production", "Нет JSON"] },
    ],
  },
}

export function TechStack() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState<"frameworks" | "databases">("frameworks")

  return (
    <section id="tech-stack" className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-500 bg-clip-text text-transparent">
              ТЕХНОЛОГИЧЕСКИЙ СТЕК
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">
            Продуманный выбор инструментов для максимальной производительности
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={inView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className={`group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-2xl border-2 border-${tech.color}-400/30 hover:border-${tech.color}-400/70 transition-all cursor-pointer`}
              >
                <div className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br from-${tech.color}-400 to-${tech.color}-600 group-hover:scale-110 transition-transform`} />
                <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{tech.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {tech.stats.map((stat) => (
                    <span
                      key={stat}
                      className={`text-xs px-2 py-1 bg-${tech.color}-500/20 text-${tech.color}-400 rounded`}
                    >
                      ✓ {stat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-cyan-300">ОБОСНОВАННЫЙ ВЫБОР ТЕХНОЛОГИЙ</h3>

            <div className="flex gap-2 mb-6 justify-center">
              {Object.keys(comparisons).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as "frameworks" | "databases")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === tab
                      ? "bg-gradient-to-r from-sky-500 to-purple-600 text-white scale-105"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                >
                  {comparisons[tab as keyof typeof comparisons].title}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-4"
            >
              {comparisons[activeTab].options.map((option) => (
                <div
                  key={option.name}
                  className={`p-6 rounded-xl border-2 ${option.winner
                      ? "bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500"
                      : "bg-slate-900/50 border-slate-700"
                    }`}
                >
                  <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                    {option.name}
                    {option.winner && <span className="text-sm px-2 py-1 bg-amber-400/20 text-amber-400 rounded">WINNER</span>}
                  </h4>
                  <div className="space-y-2">
                    {option.pros?.map((pro) => (
                      <div key={pro} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-400">+</span>
                        <span>{pro}</span>
                      </div>
                    ))}
                    {option.cons?.map((con) => (
                      <div key={con} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-red-400">-</span>
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
