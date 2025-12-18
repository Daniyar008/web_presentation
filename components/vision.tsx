"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const goals = [
  {
    category: "АНАЛИТИЧЕСКИЕ",
    color: "from-cyan-400 to-blue-500",
    items: ["Исследование лидеров рынка (Ozon, Wildberries, Amazon)", "Определение целевой архитектуры и сущностей"],
  },
  {
    category: "ПРОЕКТНЫЕ",
    color: "from-violet-400 to-purple-600",
    items: ["Проектирование масштабируемой БД (3NF)", "Разработка микросервисной архитектуры"],
  },
  {
    category: "ПРАКТИЧЕСКИЕ",
    color: "from-emerald-400 to-teal-600",
    items: ["Реализация 7 модулей на Django", "Создание адаптивного frontend-интерфейса"],
  },
  {
    category: "DEVOPS",
    color: "from-orange-400 to-red-500",
    items: ["Полная контейнеризация (Docker)", "Оркестрация в Kubernetes", "Production-развертывание с Nginx"],
  },
]

export function Vision() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="vision" className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
              ЦЕЛЬ ПРАКТИКИ
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            Систематизировать знания в full-stack разработке и освоить промышленные DevOps-практики на примере создания
            высоконагруженного маркетплейса
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {goals.map((goal, i) => (
              <motion.div
                key={goal.category}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-2xl border border-cyan-400/30 hover:border-cyan-400/70 transition-all hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${goal.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-2xl font-bold text-cyan-300">{goal.category}</h3>
                </div>
                <ul className="space-y-2">
                  {goal.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1 + j * 0.1 }}
                      className="flex items-start gap-2 text-slate-300"
                    >
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
