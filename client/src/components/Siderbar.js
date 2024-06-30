import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import Edituserdetails from "./Edituserdetails";
import Divider from "./Divider";
import { FiArrowUpLeft } from "react-icons/fi";
import Searchuser from "./Searchuser";
import { MdClose } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { logout } from "../redux/user";

const Siderbar = () => {
  const user = useSelector((state) => state?.user);
  const [edituserdetailsopen, setEdituserdetailsopen] = useState(false);
  const [alluserdata, setAlluserdata] = useState([]);
  const [opensearchuser, setOpensearchuser] = useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const socketconnection = useSelector(
    (state) => state?.user?.socketconnection
  );

  useEffect(() => {
    if (socketconnection) {
      socketconnection.emit("sidebar", user._id);

      socketconnection.on("conversation", (data) => {
        console.log("conversation data", data);
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.receiver?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.receiver?._id !== user?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser.receiver,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser.sender,
            };
          }
        });
        setAlluserdata(conversationUserData);
      });
    }
  }, [socketconnection, user]);

  const handlelogout=(e)=>{
      dispatch(logout());
      navigate('/email');
      localStorage.clear();

  }
  return (
    //   <div className="w-full h-full ">
    //     <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600  flex flex-col justify-between ">
    //       <div>
    //         <NavLink
    //           className={({ isActive }) =>
    //             `w-12  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300 ${
    //               isActive && "bg-slate-200"
    //             }`
    //           }
    //           title="chat"
    //         >
    //           <IoChatbubbleEllipses size={25} />
    //         </NavLink>

    //         <div onClick={()=>setOpensearchuser(true)} title="adduser" className="w-12 mt-4  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300">
    //           <FaUserPlus size={25} />
    //         </div>
    //       </div>

    //       <div className="flex flex-col items-center justify-center">
    //         <button title={user?.name} onClick={()=>setEdituserdetailsopen(true)}>

    //             {/* <Avatar width={40}
    //             profilepicurl={user?.profile_pic}
    //             name={user?.name}/> */}

    //         </button>
    //         <button title='logout' className="w-12 mt-4  h-12 flex justify-center items-center cursor-pointer hover:bg-slate-300">
    //           <span className="mr-3">
    //           <BiLogOut size={25} />
    //           </span>

    //         </button>

    //       </div>
    //     </div>

    //     <div className="w-full ">
    //       <div className="h-16 flex items-center">
    //       <h2 className="text-xl p-2  font-bold">Message</h2>
    //       </div>

    //       <div className='  h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
    //       {
    //                       alluserdata.length === 0 && (
    //                           <div className='mt-12'>
    //                               <div className='flex justify-center items-center my-4 text-slate-500'>
    //                                   <FiArrowUpLeft
    //                                       size={50}
    //                                   />
    //                               </div>
    //                               <p className='text-lg text-center text-slate-400'>Explore users to start a conversation with.</p>
    //                           </div>
    //                       )
    //                   }
    //       </div>

    //       <div>

    //       </div>
    //     </div>

    //     {edituserdetailsopen &&(
    //       <Edituserdetails onclose={()=>setEdituserdetailsopen(false)} user={user}/>
    //     )}

    //     {opensearchuser && (
    //       <Searchuser onclose={()=>setOpensearchuser(false)}/>
    //     )}
    //     <button>mkslcnndlncl</button>
    //   </div>

    // );

    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-white">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <div
            title="add friend"
            onClick={() => setOpensearchuser(true)}
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            className="mx-auto"
            title={user?.name}
            onClick={() => setEdituserdetailsopen(true)}
          >
            <Avatar
              width={50}
              height={50}
              name={user?.name}
              profilepicurl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            title="logout"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <span className="-ml-2" onClick={handlelogout}>
              <BiLogOut size={20} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="h-16 flex items-center">
          <h2 className="text-xl font-bold p-4 text-slate-800">Message</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className=" h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {alluserdata.length === 0 && (
            <div className="mt-12">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <FiArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation with.
              </p>
            </div>
          )}

          {alluserdata.map((conv, index) => {
            return (
              <NavLink
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 py-3 px-2 border border-transparent hover:border-primary rounded hover:bg-slate-100 cursor-pointer"
              >
                <div>
                  <Avatar
                    imageUrl={conv?.userDetails?.profile_pic}
                    name={conv?.userDetails?.name}
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h3 className="text-ellipsis line-clamp-1 font-semibold text-base">
                    {conv?.userDetails?.name}
                  </h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage />
                          </span>
                          {!conv?.lastMsg?.text && <span>Image</span>}
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo />
                          </span>
                          {!conv?.lastMsg?.text && <span>Video</span>}
                        </div>
                      )}
                    </div>
                    <p className=" ">
                      {conv?.lastMsg?.text}
                    </p>
                  </div>
                </div>
                {Boolean(conv?.unseenMsg) && (
                  <p className="text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-primary text-white font-semibold rounded-full">
                    {conv?.unseenMsg}
                  </p>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {edituserdetailsopen && (
        <Edituserdetails
          onclose={() => setEdituserdetailsopen(false)}
          user={user}
        />
      )}

      {opensearchuser && (
        <Searchuser onclose={() => setOpensearchuser(false)} />
      )}
      {opensearchuser && (
        <div
          className="absolute top-0   right-0  p-4 hover:text-white text-2xl"
          onClick={() => setOpensearchuser(false)}
        >
          <button>
            <MdClose size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Siderbar;
