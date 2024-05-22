import React from 'react'
import {PiUserCircle} from 'react-icons/pi'
const Avatar = ({userid,name,profilepicurl,width,height}) => {

    let avatarname="";

    if(name){
        const splitname=name.split(" ");
        if(splitname.length>1){
            avatarname=splitname[0][0]+splitname[1][0];
        }
        else{
            avatarname=splitname[0][0];
        }
    }
  return (
    <div className='rounded-full border shadow text-slate-800 overflow-hidden text-2xl font-bold' style={{width:width+"px",height:height+"px"}}>
      {
        profilepicurl ?(
            <img src={profilepicurl} width={width} height={height}></img>
        ):(
            name?(
                <div style={{width:width+"px",height:height+"px"}} className='overflow-hidden  rounded-full flex justify-center items-center'>
                    {avatarname}
                </div>
            ):
            <PiUserCircle
            size={width}/>

        )
      }
    </div>
  )
}

export default Avatar
