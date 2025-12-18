"use client"

import { motion } from "framer-motion"
import { TypewriterText } from "@/components/typewriter-text"

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"
        />
        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
            МНОГОВЕНДОРНАЯ
          </span>
          <br />
          <TypewriterText text="E-COMMERCE ПЛАТФОРМА" />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed"
        >
          Полный цикл: от проектирования БД до production-кластера
          <br />с автоматическим масштабированием
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <a
            href="https://multivendor-shop-iz5t.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-violet-600 rounded-lg font-bold text-lg overflow-hidden transition-transform hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            <span className="relative z-10">Посмотреть демо</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
          <a
            href="https://github.com/Daniyar008/ecom_prj"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 border-2 border-cyan-400 rounded-lg font-bold text-lg hover:bg-cyan-500/20 transition-all"
          >
            GitHub репозиторий
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm"
        >
          {[
            { label: "Python 3.11", color: "from-yellow-400 to-blue-500" },
            { label: "Django 4.2", color: "from-emerald-400 to-green-600" },
            { label: "Docker 24", color: "from-cyan-400 to-blue-600" },
            { label: "Kubernetes 1.28", color: "from-blue-400 to-indigo-600" },
          ].map((tech, i) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
              className="p-4 bg-slate-800/50 backdrop-blur rounded-lg border border-cyan-400/30 hover:border-cyan-400/70 transition-all hover:scale-105"
            >
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r ${tech.color}`} />
              <div className="text-slate-200 font-medium">{tech.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl cursor-pointer"
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}
