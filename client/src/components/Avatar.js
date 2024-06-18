import React from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";
const Avatar = ({ userId, name, profilepicurl, width, height }) => {
  const onlineuser = useSelector((state) => state?.user?.onlineUser);
  let avatarname = "";

  if (name) {
    const splitname = name.split(" ");
    if (splitname.length > 1) {
      avatarname = splitname[0][0] + splitname[1][0];
    } else {
      avatarname = splitname[0][0];
    }
  }


  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ]

  const randomNumber = Math.floor(Math.random() * 9)
  const isonline = onlineuser.includes(userId);// for generating a random color on our profile
  console.log(isonline);
  return (
    <div
      className="rounded-full border shadow text-slate-800  relative  text-2xl font-bold"
      style={{ width: width + "px", height: height + "px" }}
    >
      {profilepicurl ? (
        <img src={profilepicurl} width={width} height={height}></img>
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${bgColor[randomNumber]}`}
        >
          {avatarname}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}

      {isonline && (
        <div className="bg-green-600 p-1 absolute bottom-2 -right-1 z-10 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
