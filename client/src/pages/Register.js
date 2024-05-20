import React from 'react'
import { useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { Link } from 'react-router-dom';
const Register = () => {
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    profilepic:""
  })

  const [uploadphoto,setUploadphoto]=useState("");

  const handleonchange=(e)=>{
    const {name,value}=e.target;
    setData((prevdata)=>{
      return {...prevdata,
                  [name]:value
      }
    })
  }

  const handlephoto=(e)=>{
        const data=e;

        const uploadedfile=e.target.files[0];

        setUploadphoto(uploadedfile);
  }

  const handlecancelphoto=(e)=>{
     
     
    e.stopPropagation();
    e.preventDefault();
    setUploadphoto(null);
  }
  const handlesubmit=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log(data);
  }
  return (
    <div className='mt-5'>
      <div className='bg-white  max-w-sm mx-3  p-4  rounded mx-auto'>
        <h3>Welcome to registeration page</h3>

        <form className='grid gap-3 mt-4' onSubmit={handlesubmit} >
          <div className='flex flex-col gap-2'>
            <label htmlFor='name'>Name </label>
            <input id="name" value={data.name} name='name' type='text' placeholder='Enter your name' className='px-2 py-1 bg-slate-200 focus:outline-primary'
            onChange={handleonchange} required></input>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Email </label>
            <input id="email" value={data.email} name='email' type='email' placeholder='Enter your email' className='px-2 py-1 bg-slate-200 focus:outline-primary'
            onChange={handleonchange} required></input>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='password'>Password </label>
            <input id="password" value={data.password} name='password' type='password' placeholder='Enter your password' className='px-2 py-1 bg-slate-200 focus:outline-primary'
            onChange={handleonchange} required></input>
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor='profilepic'>Photo 
              <div className='h-14 bg-slate-200 flex justify-center items-center border hover:border-primary  rounded'>
                <p className='text-sm'>{uploadphoto?.name ?uploadphoto?.name:"Upload your profile pic"}</p>
                {uploadphoto?.name && <button className='text-lg ml-1 pt-1' onClick={handlecancelphoto}><IoIosClose/></button>}
                
              </div>
            </label>
            <input type='file' id='profilepic' className='hidden' onChange={handlephoto}></input>
          </div>
           
            <button className='bg-primary text-lg py-1 px-3 hover:bg-secondary rounded mt-3'>Register</button>
           
        </form>
        <p className='text-center mt-4'>Already have an account ?  <Link to={'/email'}> <span className='hover:text-primary font-semibold'>Login</span></Link> </p>
      </div>
    </div>
  )
}

export default Register
