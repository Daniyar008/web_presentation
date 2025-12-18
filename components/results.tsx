"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const achievements = [
  {
    title: "ПРИОБРЕТЕННЫЕ КОМПЕТЕНЦИИ",
    color: "from-cyan-400 to-blue-500",
    items: [
      "Full-stack разработка на Django",
      "Промышленный DevOps (Docker → K8s)",
      "Проектирование высоконагруженных БД",
      "Решение production-проблем",
    ],
  },
  {
    title: "ТЕХНИЧЕСКИЕ РЕЗУЛЬТАТЫ",
    color: "from-violet-400 to-purple-600",
    items: [
      "7 независимых Django-приложений",
      "Масштабируемая microservices архитектура",
      "Автоматический CI/CD пайплайн",
      "Продукт с SLA 99.95%",
    ],
  },
  {
    title: "ГОТОВЫЙ ПРОДУКТ",
    color: "from-emerald-400 to-teal-500",
    items: [
      "Рабочий маркетплейс с 1000+ товаров",
      "Панели для всех ролей пользователей",
      "Готовый шаблон для стартапа",
      "Production-ready решение",
    ],
  },
  {
    title: "ПЕРСПЕКТИВЫ РАЗВИТИЯ",
    color: "from-amber-400 to-orange-500",
    items: [
      "Платежная система (Stripe/YooKassa)",
      "Рекомендательная система (ML)",
      "Мобильное приложение (React Native)",
      "Multi-region deployment",
    ],
  },
]

export function Results() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="results" className="relative min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              КЛЮЧЕВЫЕ ДОСТИЖЕНИЯ
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-16">От идеи до production за 1 месяц</p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-2xl border-2 border-cyan-400/30 hover:border-cyan-400/70 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${achievement.color}`} />
                  <h3 className="text-xl font-bold text-cyan-300">{achievement.title}</h3>
                </div>
                <ul className="space-y-2">
                  {achievement.items.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: i * 0.1 + j * 0.05 }}
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 bg-gradient-to-r from-cyan-900/30 to-violet-900/30 rounded-2xl border border-cyan-400/40 mb-12"
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-cyan-300">РАСПРЕДЕЛЕНИЕ РАБОТЫ</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-xl font-bold text-cyan-300 mb-2">Султангереев Данияр</h4>
                <p className="text-slate-300">Архитектура, Backend, БД, Docker, Kubernetes</p>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-xl font-bold text-violet-300 mb-2">Аудаңғалиев Нұрислам</h4>
                <p className="text-slate-300">Frontend, UI/UX, Nginx, тестирование, документация</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="p-8 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 rounded-2xl text-center shadow-2xl shadow-violet-500/30"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">ФИНАЛЬНЫЙ ВЫВОД</h3>
            <p className="text-xl text-white leading-relaxed">
              Мы не просто выполнили учебный проект — мы создали промышленное решение, готовое к реальной нагрузке.
              <br />
              <span className="font-bold">От идеи до production за 1 месяц!</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-slate-400 mb-4">УЧЕБНАЯ ПРАКТИКА | 21.11.2025 – 22.12.2025</p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://multivendor-shop-iz5t.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Рабочий продукт
              </a>
              <span className="text-slate-600">|</span>
              <a
                href="https://github.com/Daniyar008/ecom_prj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Исходный код
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
