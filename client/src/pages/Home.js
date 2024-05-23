import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout, setUser } from '../redux/user'
import Siderbar from '../components/Siderbar'
const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userdetails=async function(){
    try {
      

      const Url="http://localhost:8080/api/userdetails";

      const response=await axios({
        method:'get',
        url:Url,
        withCredentials: true
      })
      dispatch(setUser(response?.data?.data))
      if(response?.data?.data?.logout){
        dispatch(logout());
        navigate('/email');
      }
      console.log(response);
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    userdetails();
  },[])
  return (
    <div className='grid grid-cols-[300px,1fr] h-screen'>
      <section >
        <Siderbar/>
      </section>
      <section>
      <Outlet/>
      </section>
      
    </div>
  )
}

export default Home
