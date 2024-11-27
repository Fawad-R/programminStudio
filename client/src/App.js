import React from 'react'
import {Route,Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import Favourite from './Pages/Favourite'
import Home from './Pages/Home'
import Details from './Pages/Details'
import './App.css'

const App = () => {
  return (
    <Routes>
    {/* <Route path="/" element={<AdminRoute element={<Home />} />} /> */}
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path='/favourite-movies' element={<Favourite />} />
    <Route path='/details' element={<Details />} />
    </Routes>
  )
}

export default App