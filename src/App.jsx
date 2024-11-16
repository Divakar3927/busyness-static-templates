import React from 'react'
import TempSelection from './Components/TemplateSelection/TempSelection';
import { Routes,Route } from 'react-router-dom';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import HomeTwo from './Components/Template3';
import HeroFour from './Components/Template2';
import HomeOne from './Components/Template1';
import Maintenance from './Components/Maintenance';
import ServerError from './Components/ServerError';
import ServerUnreachable from './Components/ServerUnreachable';
function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<TempSelection/>}/>
        <Route path='/template-1' element={<HomeOne/>}/>
        <Route path="/template-2" element={<HeroFour/>} />
        <Route path="/template-3" element={<HomeTwo/>} />
        <Route path='/maintenance' element={<Maintenance/>}/>
        <Route path='/server-error' element={<ServerError/>}/>
        <Route path='/server-unreachable' element={<ServerUnreachable/>}/>
        <Route path='/*' element={<PageNotFound/>}/>
      </Routes>

    </>
  )
}

export default App
