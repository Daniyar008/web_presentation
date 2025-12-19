import './App.css'
import CircularGallery from './components/CircularGallery/CircularGallery'

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
        maxWidth: '1400px'
      }}>
        <CircularGallery 
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </div>
  )
}

export default App