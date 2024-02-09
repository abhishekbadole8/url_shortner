import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { createContext, useEffect, useState } from 'react'
import Section from './pages/Homepage/Homepage'
import "./styles/global.css"
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register'
import Layout from './components/Layout'

export const UserContext = createContext()

function App() {
  const API = `https://url-shortner-2ruv.onrender.com`
  // const API = `http://localhost:5001`

  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null)

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    setToken(savedToken)
  }, [!token])

  return (
    <UserContext.Provider value={{ API, isLoading, setIsLoading, token, setToken }}>
      <Router>
        <Routes>
          {token || localStorage.getItem('authToken') ? (
            <>
              <Route path='/' element={<Layout><Route element={<Section />} /></Layout>} />
              <Route path='/dashboard' element={<Layout><Route index element={<Section />} /></Layout>} />
            </>
          ) : (
            <>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/*' element={<Navigate to='/login' />} />
            </>
          )}
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
