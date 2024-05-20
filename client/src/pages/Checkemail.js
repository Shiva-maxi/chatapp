import React from 'react'
import { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaRegCircleUser } from "react-icons/fa6";
const Checkemail = () => {
  const [data,setData]=useState({
    email:"",
  })
  const navigate=useNavigate();
  

  const handleonchange=(e)=>{
    const {name,value}=e.target;
    setData((prevdata)=>{
      return {...prevdata,
                  [name]:value
      }
    })
  }

  

  const handlesubmit=async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log(data);
    console.log(process.env.REACT_APP_BACKEND_URL)
    const url=`${process.env.REACT_APP_BACKEND_URL}/api/email`;

    try {
      
      const response=await axios.post(url,data);
      console.log(response);
      toast.success(response?.data.message);

      if(response.data.success){
        setData({
          email:"",
        })
        navigate('/password');
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log("error",error)
    }

    
  }
  return (
    <div className='mt-5'>
      <div className='bg-white  max-w-sm mx-3  p-4  rounded mx-auto'>
        <div className='flex justify-center items-center' >
        <FaRegCircleUser size={50}/>
        </div>
        
        <h3 className='mt-3'>Welcome to Chat App</h3>

        <form className='grid gap-3 mt-4' onSubmit={handlesubmit} >
           
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Email </label>
            <input id="email" value={data.email} name='email' type='email' placeholder='Enter your email' className='px-2 py-1 bg-slate-200 focus:outline-primary'
            onChange={handleonchange} required></input>
          </div>
           
            <button className='bg-primary text-lg py-1 px-3 hover:bg-secondary rounded mt-3 text-white  hover:text-bold'>Lets Go</button>
           
        </form>
        <p className='text-center mt-4'>New User ?  <Link to={'/register'}> <span className='hover:text-primary font-semibold'>Register</span></Link> </p>
      </div>
    </div>
  )
}

export default Checkemail
