import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/yinka-logo.png'
import navProfile from '../../assets/yinka-logo.png'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
            <img src={navlogo} alt="" className="nav-logo" />
            <h3>Admin Panel</h3>
      </div>
    </div>
  )
}

export default Navbar
