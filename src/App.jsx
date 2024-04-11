import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Shopping from './components/Shopping'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <div>
            <Shopping/>
        </div>
      
    </>
  )
}

export default App
