import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useSelector } from "react-redux";
import Edituserdetails from "./Edituserdetails";
const Siderbar = () => {
  const user=useSelector(state=>state?.user);
  const [edituserdetailsopen,setEdituserdetailsopen]=useState(false);
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600  flex flex-col justify-between ">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={25} />
          </NavLink>

          <div title="adduser" className="w-12 mt-4  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300">
            <FaUserPlus size={25} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <button title={user?.name} onClick={()=>setEdituserdetailsopen(true)}>
            <span className="">
              <Avatar width={40}
              profilepicurl={user?.profile_pic}
              name={user?.name}/>
            </span>
            
          </button>
          <button title='logout' className="w-12 mt-4  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300">
            <span className="mr-3">
            <BiLogOut size={25} />
            </span>
          
          </button>
          
        </div>
      </div>


      {edituserdetailsopen &&(
        <Edituserdetails onclose={()=>setEdituserdetailsopen(false)} user={user}/>
      )}
    </div>
  );
};

export default Siderbar;
