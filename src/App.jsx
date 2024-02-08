import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Section from './pages/Homepage/Homepage'
import "./styles/global.css"
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register'

export const UserContext = createContext()

function App() {
  const API = `http://localhost:5001`
  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserContext.Provider value={{ API,isLoading, setIsLoading }}>
      <Router>
        <Routes>
          <Route index path='/' element={<Section />} />
          <Route path='/dashboard' element={<Section />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
