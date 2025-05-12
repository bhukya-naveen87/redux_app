import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/Authentication/Login';
import HomePage from './components/Home/HomePage';

const App = () => {
  return (
    <div>
      <button className="btn btn-primary">
        <Link to={"/home"} style={{ color: "white" }}>
          Home
        </Link>
      </button>

      <button className="btn btn-primary">
        <Link to={"/"} style={{ color: "white" }}>
          Login
        </Link>
      </button>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
