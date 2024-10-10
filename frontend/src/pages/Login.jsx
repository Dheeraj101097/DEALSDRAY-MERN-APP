import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import Button from '@mui/material/Button';

const Login = () => {
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let navigate = useNavigate()

    let login=()=>{
        let payload = {email, password}
        axios.post('http://localhost:4001/login', payload)
        .then((e)=>{
            if(e.data.status == "success"){
                navigate(`/dashbord/${e.data.id}`)
            }
            else if(e.data.status == "fail"){
                alert("wrong password")
            }
            else if(e.data.status == "noUser"){
                alert("Invalid Email")
            }
        })
    }

    return (
        <div >
            <div className='max-w-[940px]  h-[450px] border-4 border-black mx-auto shadow-xl scale-75 p-[30px]'>
                <h1 className='text-center font-bold text-3xl '>Login</h1>
                <div className=' text-center max-w-[300px] mx-auto my-5 p-10'> 
                <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Enter email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <br />
                <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg text-center' placeholder='Password' type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='bg-red-300 m-1 rounded-lg p-2' onClick={login}>LOGIN</button>
                <br />
                <p>Do not have an Account ? &nbsp;<button className='underline text-blue-400' variant="outlined"><Link to='/register'> Sign Up</Link></button></p>
                </div>
            </div>


        </div>
    )
}

export default Login