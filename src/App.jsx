import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { JuegoProvider } from './context/JuegoProvider'
import Jugar from './paginas/Jugar'
import Layout from './paginas/Layout'
import InfoJugadores from './paginas/InfoJugadores'

function App() {

  return (
    <BrowserRouter>
      <JuegoProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<InfoJugadores/>}/>
            {<Route path='jugar' element={<Jugar/>}/>}

            </Route>
        </Routes>
      </JuegoProvider>
    </BrowserRouter>
  )
}

export default App
