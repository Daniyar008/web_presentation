"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const problems = [
  {
    title: "N+1 ЗАПРОСЫ",
    problem: "100+ запросов на страницу каталога",
    cause: "Ленивая загрузка vendor/category",
    solution: "select_related('vendor', 'category')",
    result: "3 запроса вместо 100",
    color: "from-amber-400 to-orange-500",
  },
  {
    title: "ГИГАНТСКИЙ DOCKER-ОБРАЗ",
    problem: "Образ 1.2GB, долгий деплой",
    cause: "Полный python + dev-зависимости",
    solution: "Multi-stage builds + alpine base",
    result: "Образ 180MB, деплой в 6 раз быстрее",
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "СТАТИКА НЕ РАБОТАЕТ",
    problem: "404 на CSS/JS после деплоя",
    cause: "Django не обслуживает статику в production",
    solution: "WhiteNoise + Nginx static serving",
    result: "Статика с кэшированием 30 дней",
    color: "from-violet-400 to-purple-600",
  },
  {
    title: "HIREDIS IMPORT ERROR",
    problem: "Crash на Render.com",
    cause: "Несовместимость версий",
    solution: "Переход на стандартный PythonParser",
    result: "Стабильная работа с Redis",
    color: "from-emerald-400 to-teal-500",
  },
]

export function Problems() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="problems" className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              БИТВА С ПРОБЛЕМАМИ
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">Реальные проблемы и элегантные решения</p>

          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-2xl border-2 border-slate-700 hover:border-amber-400/70 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} group-hover:scale-110 transition-transform flex-shrink-0`} />
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-red-900/30 border border-red-400/40 rounded-lg">
                      <div className="text-xs text-red-400 font-bold mb-1">ПРОБЛЕМА</div>
                      <div className="text-sm text-slate-300">{item.problem}</div>
                    </div>

                    <div className="p-3 bg-orange-900/30 border border-orange-400/40 rounded-lg">
                      <div className="text-xs text-orange-400 font-bold mb-1">ПРИЧИНА</div>
                      <div className="text-sm text-slate-300">{item.cause}</div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.3 }}
                      className="p-3 bg-cyan-900/30 border border-cyan-400/40 rounded-lg"
                    >
                      <div className="text-xs text-cyan-400 font-bold mb-1">РЕШЕНИЕ</div>
                      <code className="text-sm text-slate-300 font-mono">{item.solution}</code>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.4 }}
                      className="p-3 bg-emerald-900/30 border border-emerald-400/40 rounded-lg"
                    >
                      <div className="text-xs text-emerald-400 font-bold mb-1">РЕЗУЛЬТАТ</div>
                      <div className="text-sm text-slate-300 font-bold">{item.result}</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-r from-amber-900/40 to-emerald-900/40 rounded-xl border border-amber-400/40 text-center"
          >
            <p className="text-xl font-bold text-transparent bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text">
              ВЫВОД: Каждая проблема — это урок
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
