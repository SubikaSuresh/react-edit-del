import React from 'react'
import img from "../../assets/img.jpg"
import { useNavigate, useNavigation } from 'react-router-dom'
import "../../styles/navlinks.css"

export default function Navlinks() {
const navigate = useNavigate();

  return (
    <div className='navbar-container'>
      <img src={img} alt='' width={"100px"}/>
      <div className='navlinks'>
        <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About</li>
            <li onClick={() => navigate('/contacts')}>Contact</li>
            <li onClick={() =>navigate('/Addmarks')}>Marks</li>
        </ul>
      </div>
    </div>
  )
}
