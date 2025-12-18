"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const features = {
  buyer: {
    title: "Для покупателя",
    color: "cyan",
    items: [
      { title: "Умный поиск", desc: "Автодополнение + фильтры" },
      { title: "AJAX-корзина", desc: "Без перезагрузки страницы" },
      { title: "Быстрый заказ", desc: "Одноэкранное оформление" },
      { title: "Рейтинги", desc: "Система отзывов и оценок" },
      { title: "Wishlist", desc: "Избранное с синхронизацией" },
      { title: "Уведомления", desc: "Статус заказа в реальном времени" },
    ],
  },
  vendor: {
    title: "Для продавца",
    color: "violet",
    items: [
      { title: "Vendor Dashboard", desc: "Аналитика продаж" },
      { title: "Управление каталогом", desc: "CRUD операции" },
      { title: "Обработка заказов", desc: "В реальном времени" },
      { title: "Уведомления", desc: "Система алертов" },
      { title: "Админ-панель", desc: "Кастомная настройка" },
      { title: "Аналитика", desc: "Статистика и метрики" },
    ],
  },
  technical: {
    title: "Технические изюминки",
    color: "emerald",
    items: [
      { title: "Custom Auth", desc: "Email/Username авторизация" },
      { title: "Redis Cache", desc: "Кэширование горячих данных" },
      { title: "Celery Tasks", desc: "Фоновые задачи" },
      { title: "WebSockets", desc: "Уведомления в реальном времени" },
      { title: "RESTful API", desc: "Для мобильного клиента" },
      { title: "PWA-ready", desc: "Прогрессивное веб-приложение" },
    ],
  },
}

export function Features() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState<keyof typeof features>("buyer")

  return (
    <section id="features" className="relative min-h-screen flex items-center py-20 bg-slate-900/50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              ФУНКЦИОНАЛЬНОЕ БОГАТСТВО
            </span>
          </h2>
          <p className="text-xl text-slate-300 text-center mb-12">Комплексные решения для всех ролей пользователей</p>

          <div className="flex flex-wrap gap-4 mb-8 justify-center">
            {Object.entries(features).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as keyof typeof features)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${activeTab === key
                  ? `bg-gradient-to-r from-${data.color}-500 to-${data.color}-600 text-white scale-105 shadow-lg shadow-${data.color}-500/50`
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
              >
                {data.title}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features[activeTab].items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, rotateZ: 1 }}
                className={`p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur rounded-xl border-2 border-${features[activeTab].color}-400/30 hover:border-${features[activeTab].color}-400/70 transition-all cursor-pointer`}
              >
                <div className={`w-10 h-10 mb-3 rounded-lg bg-gradient-to-br from-${features[activeTab].color}-400 to-${features[activeTab].color}-600`} />
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
