import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Allatone from './pages/Allatone'
import Upload from './pages/Upload'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/all-issues' element={<Allatone />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>

      {/* Testing to be done here */}
      {/* <Allatone /> */}
    </>
  )
}
