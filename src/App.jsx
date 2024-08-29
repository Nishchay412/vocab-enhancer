import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css"
import './App.css'
import { Header } from './header'
import { useNavigate } from 'react-router-dom'
import { Front } from './frontpage'
function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <Header/>
    <Front/>
       
      
    </>
  )
}

export default App
