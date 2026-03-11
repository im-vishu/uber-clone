import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path ="/" element={< Home />} />
        <Route path="/login" element={< UserLogin />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />


      </Routes>

    </div>
  )
}

export default App
