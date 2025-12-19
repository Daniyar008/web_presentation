import './App.css'
import LogoLoop from './components/LogoLoop/LogoLoop'
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiJavascript, SiHtml5, SiCss3, SiVite, SiGit,
  SiGithub, SiNodedotjs, SiMongodb, SiFirebase
} from 'react-icons/si'

// ВАШИ ИКОНКИ - можно добавлять/удалять/менять
const myLogos = [
  { node: <SiReact size={48} color="#61DAFB" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs size={48} color="#000000" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript size={48} color="#3178C6" />, title: "TypeScript", href: "https://typescriptlang.org" },
  { node: <SiTailwindcss size={48} color="#06B6D4" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiJavascript size={48} color="#F7DF1E" />, title: "JavaScript", href: "https://javascript.com" },
  { node: <SiVite size={48} color="#646CFF" />, title: "Vite", href: "https://vitejs.dev" },
  { node: <SiGithub size={48} color="#181717" />, title: "GitHub", href: "https://github.com" },
  { node: <SiNodedotjs size={48} color="#339933" />, title: "Node.js", href: "https://nodejs.org" },
  // { src: "/logos/ваш-логотип.png", alt: "Описание", title: "Название", href: "ссылка" },
]

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#000000ff',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* ОДИН горизонтальный Logo Loop */}
      <div style={{ 
        height: '200px', 
        width: '100%', 
        maxWidth: '1400px',
        position: 'relative', 
        overflow: 'hidden'
      }}>
        <LogoLoop
          logos={myLogos}
          speed={90}                // Скорость: 60-120 (рекомендуется 90)
          direction="left"          // Направление: left (влево) или right (вправо)
          logoHeight={60}           // Размер иконок: 48-80
          gap={70}                  // Расстояние между иконками
          hoverSpeed={0}            // 0 = стоп при наведении, undefined = без эффекта
          scaleOnHover={true}       // true = увеличение при наведении
          fadeOut={true}            // true = эффект затухания по краям
          fadeOutColor="#000000"    // Цвет затухания (черный)
          pauseOnHover={true}       // true = пауза при наведении
          ariaLabel="Technology stack"
        />
      </div>

    </div>
  )
}

export default App