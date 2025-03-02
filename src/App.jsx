
import './App.css'
import Weather from './components/Weather'

function App() {
  

  return (
    <>
    
    <div className="w-full min-h-screen" data-theme="dark">
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Weather />
    </div>
    </div>
    </>
  )
}

export default App
