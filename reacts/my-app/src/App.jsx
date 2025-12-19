import './App.css'
import LiquidEther from './components/LiquidEther/LiquidEther'

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#000000',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0
    }}>
      <LiquidEther
        colors={[ '#9D4EDD', '#C77DFF', '#E0AAFF' ]} // Сиренево-фиолетовые оттенки
        // colors={[ '#8A2BE2', '#9370DB', '#D8BFD8' ]} // Альтернатива
        mouseForce={25}
        cursorSize={110}
        isViscous={false}
        viscous={35}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.55}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.3}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default App