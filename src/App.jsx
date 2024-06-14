import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Faculty from './pages/Faculty'
import Upload from './pages/Upload'
import Approve from './pages/Approve'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/approve' element={<Approve />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
