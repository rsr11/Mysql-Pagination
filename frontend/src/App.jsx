import { useEffect, useState } from 'react'
import {BrowserRouter , Routes ,Route} from "react-router-dom"

import './App.css'
import TestingFilter from './TestingFilter'
import PaginationTest from './PaginationTest'

function App() {

 

  return (
    <>

   
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<TestingFilter/>} /> 
      <Route path='/pagination' element={<PaginationTest/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
