import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './component/pages/Home'
import Leaderboard from './component/pages/Leaderboard'
import Play from './component/pages/Play'



ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/play" element={<Play/>} />

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)