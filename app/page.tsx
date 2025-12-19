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
import LiquidEther from "@/components/liquid-ether"
import { LogoLoop } from "@/components/logo-loop"
import { CircularGallery } from "@/components/circular-gallery"
import { ChromaGrid } from "@/components/chroma-grid"
import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiDocker, SiGit,
  SiPrisma, SiVercel, SiFigma, SiVite
} from "react-icons/si"

// Логотипы технологий для LogoLoop - можете заменить на свои изображения
const techLogos = [
  { node: <SiReact className="text-4xl text-cyan-400" />, title: "React" },
  { node: <SiNextdotjs className="text-4xl text-white" />, title: "Next.js" },
  { node: <SiTypescript className="text-4xl text-blue-500" />, title: "TypeScript" },
  { node: <SiTailwindcss className="text-4xl text-cyan-400" />, title: "Tailwind CSS" },
  { node: <SiNodedotjs className="text-4xl text-green-500" />, title: "Node.js" },
  { node: <SiPostgresql className="text-4xl text-blue-400" />, title: "PostgreSQL" },
  { node: <SiDocker className="text-4xl text-blue-500" />, title: "Docker" },
  { node: <SiGit className="text-4xl text-orange-500" />, title: "Git" },
  { node: <SiPrisma className="text-4xl text-white" />, title: "Prisma" },
  { node: <SiVercel className="text-4xl text-white" />, title: "Vercel" },
  { node: <SiFigma className="text-4xl text-pink-400" />, title: "Figma" },
  { node: <SiVite className="text-4xl text-purple-400" />, title: "Vite" },
]

// Скриншоты для CircularGallery - замените на свои изображения
// Используем публичные placeholder-изображения, чтобы избежать 404 пока локальные файлы не добавлены в public/images
const galleryItems = [
  { image: '/images/1.svg', text: 'Скриншот 1' },
  { image: '/images/2.svg', text: 'Скриншот 2' },
  { image: '/images/3.svg', text: 'Скриншот 3' },
  { image: '/images/4.svg', text: 'Скриншот 4' },
  { image: '/images/5.svg', text: 'Скриншот 5' },
  { image: '/images/6.svg', text: 'Скриншот 6' },
  { image: '/images/7.svg', text: 'Скриншот 7' },
  { image: '/images/8.svg', text: 'Скриншот 8' },
  { image: '/images/9.svg', text: 'Скриншот 9' },
  { image: '/images/10.svg', text: 'Скриншот 10' },
  { image: '/images/11.svg', text: 'Скриншот 11' },
  { image: '/images/12.svg', text: 'Скриншот 12' },
]

// Данные команды для ChromaGrid - замените image на свои фотографии
const teamMembers = [
  {
    image: 'https://via.placeholder.com/400x300.png?text=Daniyar',
    title: 'Султангереев Данияр',
    subtitle: 'Full Stack Developer',
    handle: '@Daniyar008',
    borderColor: '#06b6d4',
    gradient: 'linear-gradient(145deg, #06b6d4, #0f172a)',
    url: 'https://github.com/Daniyar008'
  },
  {
    image: 'https://via.placeholder.com/400x300.png?text=Nurislam',
    title: 'Ауданғалиев Нұрислам',
    subtitle: 'Full Stack Developer',
    handle: '@Nurislam_Nutelliks',
    borderColor: '#10B981',
    gradient: 'linear-gradient(180deg, #10B981, #0f172a)',
    url: 'https://github.com/Nutelliks'
  }
]

export default function Home() {
  return (
    <main className="relative bg-slate-950 text-white overflow-x-hidden">
      {/* Жидкий анимированный фон */}
      {/* <LiquidEther
        colors={['#06b6d4', '#8b5cf6', '#ec4899', '#3b82f6']}
        autoDemo={true}
        autoSpeed={1.2}
      /> */}

      <Navigation />
      <Hero />

      {/* Бегущая лента с логотипами технологий */}
      <section className="py-8 relative z-10">
        <LogoLoop
          logos={techLogos}
          speed={80}
          logoHeight={48}
          gap={64}
          pauseOnHover={true}
          fadeOut={true}
          fadeOutColor="#0f172a"
          scaleOnHover={true}
        />
      </section>

      <Vision />
      <Architecture />
      <TechStack />
      <Features />

      {/* Галерея скриншотов проекта */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Скриншоты проекта
          </h2>
          <p className="text-center text-gray-400 mt-4">
            Прокрутите или перетащите для просмотра
          </p>
        </div>
        <CircularGallery
          items={galleryItems}
          bend={2}
          textColor="#ffffff"
          borderRadius={0.05}
        />
      </section>

      <Problems />
      <Metrics />

      {/* Карточки команды */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Наша команда
          </h2>
          <p className="text-center text-gray-400 mt-4">
            Разработчики проекта
          </p>
        </div>
        <ChromaGrid
          items={teamMembers}
          radius={350}
          columns={2}
        />
      </section>

      <Results />
    </main>
  )
}
