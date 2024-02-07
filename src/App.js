import React from 'react'
import Navbar from './components/common/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className='w-screen min-h-screen bg-main flex flex-col font-inter'>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
