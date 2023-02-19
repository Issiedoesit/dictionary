import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Nav from './components/Nav/Nav'
import Word from './components/Word/Word'
import useThemeStore from './hooks/stores/useThemeStore'

function App() {

  const {primary, variant} = useThemeStore(state=>state.theme)
  return (
    <div className={`w-full App raleway transition-colors duration-500 ease-in-out ${variant === 'light' ? 'bg-white' : 'bg-black'} text-theme-text-color min-h-screen`}>
      <div>
        <Nav />
      </div>
      <div>
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/word/:query' element={<Word />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
