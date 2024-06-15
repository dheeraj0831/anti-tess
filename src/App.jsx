import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Faculty from './pages/Faculty'
import Upload from './pages/Upload'
import Approve from './pages/Approve'
import Specific from './components/Specific'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/" element={<Specific name='Sanjay' rollno='21BD1A0503' section='FS-ELITE' imageUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs8Wrp4Gpqx5pmsG-N-qma1-aLBfonzMpI_g&s' description='deepa gandu'/>} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/upload" element={<Upload />} />
          <Route path='/approve' element={<Approve />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
