"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const metrics = [
  { label: "RPS", before: "50", after: "500", unit: "req/s", color: "sky" },
  { label: "Latency (p95)", before: "800", after: "150", unit: "ms", color: "purple" },
  { label: "Error Rate", before: "5", after: "0.1", unit: "%", color: "emerald" },
  { label: "Concurrent Users", before: "100", after: "1000", unit: "users", color: "amber" },
]

const k8sMetrics = [
  { label: "CPU usage", value: "30-70%", desc: "автоскейлинг", color: "from-cyan-400 to-blue-500" },
  { label: "Memory", value: "< 400MB", desc: "на pod", color: "from-violet-400 to-purple-600" },
  { label: "Pod restarts", value: "0", desc: "стабильность", color: "from-emerald-400 to-teal-500" },
  { label: "Uptime", value: "100%", desc: "за период", color: "from-amber-400 to-orange-500" },
]

const security = [
  "OWASP Top 10 проверка",
  "SQL injection protection (ORM)",
  "XSS protection (Django templates)",
  "CSRF tokens на всех формах",
  "HTTPS only (SSL A+ rating)",
]

export function Metrics() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="metrics" className="relative min-h-screen flex items-center py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">Измеримые улучшения производительности</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-xl border-2 border-cyan-400/30 hover:border-cyan-400/70 transition-all"
              >
                <h3 className="text-sm text-slate-400 mb-2">{metric.label}</h3>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-2xl text-red-400 line-through">{metric.before}</span>
                  <span className="text-4xl font-bold text-emerald-400">{metric.after}</span>
                  <span className="text-slate-400 text-sm mb-1">{metric.unit}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                    className={`h-2 rounded-full bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16 p-8 bg-gradient-to-br from-violet-900/30 to-pink-900/30 rounded-2xl border border-violet-400/40"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-violet-300">KUBERNETES МЕТРИКИ</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {k8sMetrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-violet-400/30"
                >
                  <div className={`w-10 h-10 mb-2 rounded-lg bg-gradient-to-r ${metric.color}`} />
                  <div className="text-sm text-slate-400">{metric.label}</div>
                  <div className="text-2xl font-bold text-violet-300">{metric.value}</div>
                  <div className="text-xs text-slate-500">{metric.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="p-8 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-2xl border border-emerald-400/40"
          >
            <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 text-emerald-300">
              БЕЗОПАСНОСТЬ
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {security.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1 + i * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                >
                  <span className="text-emerald-400 text-xl">✓</span>
                  <span className="text-slate-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
