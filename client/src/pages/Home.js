import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
const Home = () => {

  const userdetails=async function(){
    try {
      

      const Url="http://localhost:8080/api/userdetails";

      const response=await axios({
        method:'get',
        url:Url,
        withCredentials: true
      })

      console.log(response);
    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    userdetails();
  },[])
  return (
    <div>
      <h1>Home</h1>
      <Outlet/>
    </div>
  )
}

export default Home
