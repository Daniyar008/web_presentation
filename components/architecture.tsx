"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState } from "react"

const layers = [
  {
    name: "BALANCING",
    color: "from-cyan-400 to-blue-500",
    items: ["Nginx Ingress Controller", "Распределение нагрузки (least_conn)", "SSL termination + Security headers"],
  },
  {
    name: "APPLICATION LAYER",
    color: "from-emerald-400 to-teal-500",
    items: ["3+ реплики Django (Gunicorn)", "Horizontal Pod Autoscaler (3→10 реплик)", "Liveness/Readiness пробы"],
  },
  {
    name: "DATA LAYER",
    color: "from-violet-400 to-purple-600",
    items: ["PostgreSQL + репликация", "Redis: кэш + Celery брокер", "StatefulSet для сохранения данных"],
  },
]

export function Architecture() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeLayer, setActiveLayer] = useState(0)

  return (
    <section id="architecture" className="relative min-h-screen flex items-center py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              ВЫСОКОНАГРУЖЕННАЯ АРХИТЕКТУРА
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">
            Многоуровневая система с разделением ответственности
          </p>

          <div className="flex flex-col gap-8">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.name}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                onMouseEnter={() => setActiveLayer(i)}
                className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${activeLayer === i
                    ? `bg-gradient-to-r ${layer.color} bg-opacity-20 border-white scale-105`
                    : "bg-slate-800/30 border-slate-700 hover:border-slate-600"
                  }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{ rotate: activeLayer === i ? 360 : 0 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-r ${layer.color}`}
                  />
                  <div>
                    <div className="text-sm text-slate-400">УРОВЕНЬ {i + 1}</div>
                    <h3 className="text-2xl font-bold">{layer.name}</h3>
                  </div>
                </div>

                <ul className="space-y-3">
                  {layer.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.2 + j * 0.1 }}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <span className={`text-lg ${activeLayer === i ? "text-white" : "text-sky-400"}`}>•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {activeLayer === i && i < layers.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-3xl"
                  >
                    ↓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 p-6 bg-gradient-to-r from-cyan-900/30 to-violet-900/30 rounded-xl border border-cyan-400/30"
          >
            <h4 className="text-xl font-bold mb-4 text-cyan-300">КЛЮЧЕВЫЕ ПРИНЦИПЫ:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {["12-Factor App methodology", "Infrastructure as Code", "Zero-downtime deployments"].map(
                (principle, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span>
                    <span>{principle}</span>
                  </div>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
