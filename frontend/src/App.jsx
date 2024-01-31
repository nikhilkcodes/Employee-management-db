import Home from './components/Home/Home'
import './App.css'
import axios from 'axios';
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loginform from './components/auth/Loginform';
import Signupform from './components/auth/Signupform';
import Profile from './components/profile/Profile';
import { UseContextProvider } from './Context/Context';


function App() {

  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.withCredentials = true

  return (
    <UseContextProvider>
      <Router>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Loginform />} />
        <Route path="/auth/signUp" element={<Signupform />} />
        <Route path="/auth/profile/:userId"  element={<Profile />} />
      </Routes>
    </Router>
    </UseContextProvider>
  )
}


export default App
