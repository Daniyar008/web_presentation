import './App.css'
import ChromaGrid from './components/ChromaGrid/ChromaGrid'

function App() {
  return (
    <div className="App" style={{
      backgroundColor: '#000000',
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: '100%', 
        height: '600px', 
        position: 'relative',
        maxWidth: '800px'
      }}>
        <ChromaGrid 
          radius={350}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          columns={2}
          rows={1}
        />
      </div>
    </div>
  )
}

export default App