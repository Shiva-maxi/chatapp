import React, { useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from './Avatar'
import { useSelector } from "react-redux";
import Edituserdetails from "./Edituserdetails";
import Divider from "./Divider";
import { FiArrowUpLeft } from "react-icons/fi";
 import Searchuser from "./Searchuser";
const Siderbar = () => {
  const user=useSelector(state=>state?.user);
  const [edituserdetailsopen,setEdituserdetailsopen]=useState(false);
  const [alluserdata,setAlluserdata]=useState([]);
  const [opensearchuser,setOpensearchuser]=useState(true);
  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
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

          <div onClick={()=>setOpensearchuser(true)} title="adduser" className="w-12 mt-4  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300">
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

      <div className="w-full ">
        <div className="h-16 flex items-center">
        <h2 className="text-xl p-2  font-bold">Message</h2>
        </div>

        <div className='  h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
        {
                        alluserdata.length === 0 && (
                            <div className='mt-12'>
                                <div className='flex justify-center items-center my-4 text-slate-500'>
                                    <FiArrowUpLeft
                                        size={50}
                                    />
                                </div>
                                <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>    
                            </div>
                        )
                    }
        </div>
        
        <div>

        </div>
      </div>


      {edituserdetailsopen &&(
        <Edituserdetails onclose={()=>setEdituserdetailsopen(false)} user={user}/>
      )}

      {opensearchuser && (
        <Searchuser onclose={()=>setOpensearchuser(false)}/>
      )}
    </div>
  );
};

export default Siderbar;
