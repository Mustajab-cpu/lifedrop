import React from 'react'
import Leftsec from './components/layout/Leftsec'
import Page1 from './pages/page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'


const App = () => {
  return (
    <Router>
      <div className='h-screen w-full flex overflow-hidden'>

        <Leftsec/>

        <Routes>
          
          <Route path='/' element={<Page1/>}/>
          <Route path='/page2' element={<Page2/>}/>
          <Route path='/page3' element={<Page3/>}/>
          <Route path='/page4' element={<Page4/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/Login' element={<Login/>}/>


        </Routes>
      
      </div>

    </Router>
  )
}

export default App
