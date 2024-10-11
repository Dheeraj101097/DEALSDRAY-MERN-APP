import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import {  useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import {  handleSuccess } from "../utils";

const DashBord = () => {
  const [setLoggedInUser]=useState('');
  const navigate = useNavigate();
  useEffect(()=>{setLoggedInUser(localStorage.getItem('loggedInUser'))},[])
  
  const handleLogout=(e)=>{
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    handleSuccess("user Logged Out")
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  let [name, setname] = useState("")
  let ID = useParams()

  useEffect(()=>{
    axios.get(`http://localhost:4001/user/${ID.ID}`)
    .then((e)=>{
      setname(e.data)
    
    })
    .catch(()=>{console.log("unable to fetch data in Edit comp");})
},[])

  return (
    <div>
      <div id='navbar' className=' bg-yellow-200'>
        <ul className='flex gap-24 px-10'>
          <li>Home</li>
          <li><Button variant="text"><Link to='/create-employee'> Create Employee</Link></Button> </li>
          <li><Button variant="text"><Link to="/employee-list">  Employee list </Link></Button> </li>
          <li className='p-2 text-red-500 border border-dashed border-red-400 '>{name}</li>
          <button onClick={handleLogout}>Logout</button>
        </ul>
      </div>
      <h1 className='bg-yellow-200 place-content-center'>DashBord</h1>
      <p>Wellcome to admin panel</p>
    </div>
  )
}

export default DashBord
