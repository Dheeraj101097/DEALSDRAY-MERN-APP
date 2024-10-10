import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [cnfPassword, setCnfPassword] = useState('')
    let navigate = useNavigate()

    let submitForm =()=>{
        let payload = {
            name,email,cnfPassword
        }
        if(!name || !email || !cnfPassword){
            alert("To register Fill all the fields..!")
        }
        else{
            if(password === cnfPassword ){
                axios.post('http://localhost:4001/register', payload)
            .then((e)=>{
                alert(e.data);
                navigate("/")
            })
            .catch((e)=>{
                alert("problem in sending data to the Backend.!");
            })
            }
            else{
                alert("both password should be matched..")
            }
            
        }
    }

    return (
        <div className=' h-max'>
            <div className=' max-w-[940px]  h-[500px] border-4 border-black mx-auto relative  shadow-xl scale-75 p-[10px]'>
                <h1 className='text-center font-bold text-2xl my-3'>Signup</h1>
                <div className='border  max-w-[300px] mx-auto my-5 p-10 text-center '>
                    <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Enter Full Name' type="text" value={name} onChange={(e)=>{setName(e.target.value)}} required />
                    <input required  className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Enter Email' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    <input required  className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Enter Password' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Retype Password' type="password" value={cnfPassword} onChange={(e)=>{setCnfPassword(e.target.value)}}/>
                    <button className='bg-red-300  rounded-lg p-1' onClick={submitForm}>Signup</button><br/>
                    <p>Already have an account?<button className='underline text-blue-400' variant="outlined"><Link to='/'> Sign In</Link></button> </p>
                </div>
            </div>
        </div>
    )
}

export default Registration