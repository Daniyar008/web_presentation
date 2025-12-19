"use client"

import { useRef, useEffect, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import { gsap } from 'gsap'

interface ChromaCardItem {
  image: string
  title: string
  subtitle: string
  handle?: string
  borderColor?: string
  gradient?: string
  url?: string
}

interface ChromaGridProps {
  items?: ChromaCardItem[]
  className?: string
  radius?: number
  columns?: number
  rows?: number
  damping?: number
  fadeOut?: number
  ease?: string
}

const defaultItems: ChromaCardItem[] = [
  {
    // временные внешние изображения для предотвращения 404
    image: 'https://via.placeholder.com/400x300.png?text=Team+1',
    title: 'Султангереев Данияр',
    subtitle: 'Full Stack Developer',
    handle: '@Daniyar008',
    borderColor: '#3B82F6',
    gradient: 'linear-gradient(145deg, #3B82F6, #000)',
    url: 'https://github.com/Daniyar008'
  },
  {
    image: 'https://via.placeholder.com/400x300.png?text=Team+2',
    title: 'Ауданғалиев Нұрислам',
    subtitle: 'Full Stack Developer',
    handle: '@Nurislam_Nutelliks',
    borderColor: '#10B981',
    gradient: 'linear-gradient(180deg, #10B981, #000)',
    url: 'https://github.com/Nutelliks'
  }
]

export function ChromaGrid({
  items,
  className = '',
  radius = 300,
  columns = 2,
  rows = 1,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}: ChromaGridProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const fadeRef = useRef<HTMLDivElement>(null)
  const setX = useRef<((value: number) => void) | null>(null)
  const setY = useRef<((value: number) => void) | null>(null)
  const pos = useRef({ x: 0, y: 0 })

  const data = items?.length ? items : defaultItems

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    setX.current = gsap.quickSetter(el, '--x', 'px') as (value: number) => void
    setY.current = gsap.quickSetter(el, '--y', 'px') as (value: number) => void
    const { width, height } = el.getBoundingClientRect()
    pos.current = { x: width / 2, y: height / 2 }
    setX.current(pos.current.x)
    setY.current(pos.current.y)
  }, [])

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x)
        setY.current?.(pos.current.y)
      },
      overwrite: true
    })
  }

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    moveTo(e.clientX - r.left, e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    })
  }

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleCardMove = (e: ReactMouseEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <>
      <style jsx global>{`
        .chroma-grid {
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(var(--cols, 2), 320px);
          grid-auto-rows: auto;
          justify-content: center;
          gap: 0.75rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          box-sizing: border-box;
          --x: 50%;
          --y: 50%;
          --r: 220px;
        }
        
        .chroma-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 320px;
          height: auto;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid #333;
          transition: border-color 0.3s ease;
          background: var(--card-gradient);
          --mouse-x: 50%;
          --mouse-y: 50%;
          --spotlight-color: rgba(255, 255, 255, 0.3);
        }
        
        .chroma-card:hover {
          border-color: var(--card-border);
        }
        
        .chroma-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 2;
        }
        
        .chroma-card:hover::before {
          opacity: 1;
        }
        
        .chroma-img-wrapper {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 10px;
          box-sizing: border-box;
          background: transparent;
          transition: background 0.3s ease;
        }
        
        .chroma-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }
        
        .chroma-info {
          position: relative;
          z-index: 1;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: system-ui, sans-serif;
          display: grid;
          grid-template-columns: 1fr auto;
          row-gap: 0.25rem;
          column-gap: 0.75rem;
        }
        
        .chroma-info .role,
        .chroma-info .handle {
          color: #aaa;
        }
        
        .chroma-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          -webkit-backdrop-filter: grayscale(1) brightness(0.78);
          backdrop-filter: grayscale(1) brightness(0.78);
          background: rgba(0, 0, 0, 0.001);
          -webkit-mask-image: radial-gradient(
            circle var(--r) at var(--x) var(--y),
            transparent 0%,
            transparent 15%,
            rgba(0, 0, 0, 0.1) 30%,
            rgba(0, 0, 0, 0.22) 45%,
            rgba(0, 0, 0, 0.35) 60%,
            rgba(0, 0, 0, 0.5) 75%,
            rgba(0, 0, 0, 0.68) 88%,
            white 100%
          );
          mask-image: radial-gradient(
            circle var(--r) at var(--x) var(--y),
            transparent 0%,
            transparent 15%,
            rgba(0, 0, 0, 0.1) 30%,
            rgba(0, 0, 0, 0.22) 45%,
            rgba(0, 0, 0, 0.35) 60%,
            rgba(0, 0, 0, 0.5) 75%,
            rgba(0, 0, 0, 0.68) 88%,
            white 100%
          );
        }
        
        .chroma-fade {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 4;
          -webkit-backdrop-filter: grayscale(1) brightness(0.78);
          backdrop-filter: grayscale(1) brightness(0.78);
          background: rgba(0, 0, 0, 0.001);
          -webkit-mask-image: radial-gradient(
            circle var(--r) at var(--x) var(--y),
            white 0%,
            white 15%,
            rgba(255, 255, 255, 0.9) 30%,
            rgba(255, 255, 255, 0.78) 45%,
            rgba(255, 255, 255, 0.65) 60%,
            rgba(255, 255, 255, 0.5) 75%,
            rgba(255, 255, 255, 0.32) 88%,
            transparent 100%
          );
          mask-image: radial-gradient(
            circle var(--r) at var(--x) var(--y),
            white 0%,
            white 15%,
            rgba(255, 255, 255, 0.9) 30%,
            rgba(255, 255, 255, 0.78) 45%,
            rgba(255, 255, 255, 0.65) 60%,
            rgba(255, 255, 255, 0.5) 75%,
            rgba(255, 255, 255, 0.32) 88%,
            transparent 100%
          );
          opacity: 1;
          transition: opacity 0.25s ease;
        }
        
        @media (max-width: 768px) {
          .chroma-grid {
            grid-template-columns: 1fr !important;
          }
          .chroma-card {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>
      <div
        ref={rootRef}
        className={`chroma-grid ${className}`}
        style={{
          '--r': `${radius}px`,
          '--cols': columns,
          '--rows': rows
        } as React.CSSProperties}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        {data.map((c, i) => (
          <article
            key={i}
            className="chroma-card"
            onMouseMove={handleCardMove}
            onClick={() => handleCardClick(c.url)}
            style={{
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient || 'linear-gradient(145deg, #333, #000)',
              cursor: c.url ? 'pointer' : 'default'
            } as React.CSSProperties}
          >
            <div className="chroma-img-wrapper">
              <img src={c.image} alt={c.title} loading="lazy" />
            </div>
            <footer className="chroma-info">
              <h3 className="name text-lg font-semibold">{c.title}</h3>
              {c.handle && <span className="handle text-sm">{c.handle}</span>}
              <p className="role text-sm">{c.subtitle}</p>
            </footer>
          </article>
        ))}
        <div className="chroma-overlay" />
        <div ref={fadeRef} className="chroma-fade" />
      </div>
    </>
  )
}

export default ChromaGrid
