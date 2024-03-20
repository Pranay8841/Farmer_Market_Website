import React from 'react'
import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-main flex flex-col font-inter'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route
          path='signup'
          element={
            <Signup />
          }
        />

        <Route
          path='login'
          element={
            <Login />
          }
        />
      </Routes>
    </div>
  )
}

export default App
