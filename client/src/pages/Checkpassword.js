import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/user';
const Checkpassword = () => {
  const [data,setData]=useState({
    password:"",
  })
  const navigate=useNavigate();
  const location=useLocation();
  const dispatch=useDispatch();
  const handleonchange=(e)=>{
    const {name,value}=e.target;
    setData((prevdata)=>{
      return {...prevdata,
                  [name]:value
      }
    })
  }

  useEffect(()=>{
    if(!location?.state?.userdata?.name){
      navigate('/email');
    }
  },[])
  
  console.log("location",location?.state?.userdata);
  const handlesubmit=async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    // console.log(data);
    // console.log(process.env.REACT_APP_BACKEND_URL)
    const url=`${process.env.REACT_APP_BACKEND_URL}/api/password`;

    try {
      
      const response = await axios({
        method :'post',
        url : url,
        data : {
          user_id : location?.state?.userdata?._id,
          password : data?.password
        },
        withCredentials : true
      })
      console.log(response);
      toast.success(response?.data.message);

      if(response.data.success){
        dispatch(setToken(response?.data?.token));
        localStorage.setItem('token',response?.data?.token);
        setData({
          password:"",
        })
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log("error",error)
    }

    
  }
  return (
    <div className='mt-5'>
      <div className='bg-white  max-w-sm   p-4  rounded mx-auto'>
        <div className='flex justify-center items-center' >
        <Avatar name={location?.state?.userdata?.name}  profilepicurl={location?.state?.userdata?.profilepic} width={70} height={70}/>
        </div>
        <p className='text-center mt-2 font-bold'>{location?.state?.userdata?.name}</p>
        
        <h3 className='mt-3'>Welcome to Chat App</h3>

        <form className='grid gap-3 mt-4' onSubmit={handlesubmit} >
           
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Password </label>
            <input id="email" value={data.password} name='password' type='password' placeholder='Enter your password' className='px-2 py-1 bg-slate-200 focus:outline-primary'
            onChange={handleonchange} required></input>
          </div>
           
            <button className='bg-primary text-lg py-1 px-3 hover:bg-secondary rounded mt-3 text-white  hover:text-bold'>Login</button>
           
        </form>
        <p className='text-center mt-4'>  <Link to={'/forgetpassword'}> <span className='hover:text-primary font-semibold'>Forgot Password?</span></Link> </p>
      </div>
    </div>
  )
}

export default Checkpassword
