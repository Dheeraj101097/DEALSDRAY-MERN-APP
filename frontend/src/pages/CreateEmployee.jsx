import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const CreateEmployee = () => {
    let navigate = useNavigate();
    let [name, setName] = useState("")
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState()
    let [designation, setDesignation] = useState()
    let [gender, setGender] = useState("")
    let [course, setCourse] = useState([])
    let [image, setImage] = useState()

    let formHandle = (e) => {
        e.preventDefault()
        let payload = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            designation: designation,
            gender: gender,
            course: course
        }

        if (!name || !email || !phone || !designation || !gender || !course || !image) {
            alert("To Create Employee Fill all the fields..!")
        }
        else {
            axios.post("http://localhost:4001/employees", payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((e) => { alert(e.data) })
                .catch(() => { console.log("can not register"); })

            navigate("/employee-list")
        }}

        let handleCourseChange = (e) => {
            const course1 = e.target.value;
            const isChecked = e.target.checked;
            if (isChecked) {
                setCourse(course.concat(course1));
            }
            else {
                setCourse(course.filter(item => item !== course1));
            }
        };

        return (
            <div className=' max-w-[940px]  h-[620px] border-4 border-black mx-auto relative top-[-80px] shadow-xl scale-75 p-[30px]'>
                <h1 className='text-center font-bold text-3xl my-3'>Create Employee</h1>
                <div className='border text-center  max-w-[300px] mx-auto my-5 p-8 justify-center align-center'>
                    <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center ' placeholder='Enter Full Name' type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center' placeholder='Enter Email' type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input className=' text-black my-3 placeholder-black bg-gray-200 border-black border-2 rounded-lg  text-center ' placeholder='Enter Phone Number' type="text" value={phone} onChange={(e) => { setPhone(e.target.value) }} />

                    {/* designation dropdown */}
                    <label htmlFor="">Designation</label>
                    <select onChange={(e) => { setDesignation(e.target.value); }} name='designation' required className="block appearance-auto w-full  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>

                    {/* Gender radio button */}
                    <label htmlFor="">Geneder : </label><br />
                    <input type="radio" id="male" name="gender" value={gender} onChange={(e) => { setGender("Male") }} />
                    <label for="male"> Male </label>
                    <input type="radio" id="female" name="gender" value={gender} onChange={(e) => { setGender("Female") }} />
                    <label for="female"> Female </label><br/>

                    {/* Courses check boxes */}
                    <label>Course :</label><br />
                    <input type="checkbox" id="MCA" name="course" value="MCA" checked={course.includes('MCA')} onChange={handleCourseChange} />
                    <label for="MCA"> MCA </label>
                    <input type="checkbox" id="BCA" name="course" value="BCA" checked={course.includes('BCA')} onChange={handleCourseChange} />
                    <label for="BCA"> BCA </label>
                    <input type="checkbox" id="BSC" name="course" value="BSC" checked={course.includes('BSC')} onChange={handleCourseChange} />
                    <label for="BSC"> BSC </label><br/><br/>

                    {/* file upload */}
                    <label htmlFor="">Upload your photo</label><br/>
                    <input accept=" image/jpg image/png" type="file" name='image' onChange={(e) => { setImage(e.target.files[0]) }} /><br />
                    <br/>
                    <button className='bg-red-300 ml-5 rounded-lg p-1' onClick={formHandle}>Register Me</button>
                </div>

            </div>
        )
    }

    export default CreateEmployee