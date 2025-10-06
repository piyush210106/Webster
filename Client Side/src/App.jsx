import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Statistics from './Components/Statistics.jsx';
import Chatbot from './Components/Chatbot.jsx';
import Home from './Components/Home.jsx';
import Landing from './Components/Landing.jsx';
import Footer from './Components/Footer.jsx';
import Logs from './Components/Logs.jsx';
import Navbar from './Components/Navbar.jsx';
import Navbar2 from './Components/Navbar2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <div>
          <Navbar2/>
          <Landing/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/user/home",
    element: (
        <div>
          <Navbar/>
          <Home/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/user/stats",
    element: (
        <div>
          <Navbar/>
          <Statistics/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/user/logs",
    element: (
        <div>
          <Navbar/>
          <Logs/>
          <Footer/>
        </div>
    )
  },
  {
    path: "/user/chatbot",
    element: (
        <div>
          <Navbar/>
          <Chatbot/>
          <Footer/>
        </div>
    )
  }
]);

function App() {

  return (
    <RouterProvider router = {router}/>
  )
}

export default App
