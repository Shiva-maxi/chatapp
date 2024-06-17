import React, { useRef, useState } from "react";
import Avatar from "./Avatar";
import { useEffect } from "react";
import uploadfile from "../helpers/uploadfile";
import Divider from "./Divider";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user";
const Edituserdetails = ({ onclose, user }) => {
  const [data, setData] = useState({
    name: user?.user,
    profilepic: user?.profilepic,
  });
  const uploadphotoref = useRef();
  const dispatch=useDispatch();
  useEffect(() => {
    setData((prevuserdata) => {
      return {
        ...prevuserdata,
        ...user,
      };
    });
  }, [user]);
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setData((prevdata) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
  };
   
  const handleuploadphoto = async(e)=>{
    const file = e.target.files[0]

    const uploadPhoto = await uploadfile(file)

    setData((preve)=>{
    return{
        ...preve,
        profilepic : uploadPhoto?.url
    }
    })
}

  const handleopenphoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadphotoref.current.click();
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/updateuserdetails`;
      const response = await axios({
        method : 'post',
        url : URL,
        data : data,
        withCredentials : true
    })

    console.log('response',response)
    toast.success(response?.data?.message)
    dispatch(setUser(response.data.data));
    onclose();
       
    } catch (error) {
      toast.error();
    }
  };
  return (
    <div className="fixed top-0 bottom-0  right-0 left-0 bg-gray-700 opacity-70 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-sm py-5">
        <h2 className="font-semibold">Profiledetails</h2>
        <p className="text-sm">Edit user details</p>
        <form className="grid gap-3 mt-3" onSubmit={handlesubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              className="w-full p-1 focus:outline-primary border-0.5"
              type="text"
              id="name"
              value={data.name}
              name="name"
              onChange={handleonchange}
            />
          </div>

          <div>
            <div>photo</div>

            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                profilepicurl={data?.profilepic}
                name={data?.name}
              />

              <label htmlFor="profilepic">
                <button className="font-semibold" onclick={handleopenphoto}>
                  Change Photo
                </button>
                <input
                  type="file"
                  id="profilepic"
                  onChange={handleuploadphoto}
                  ref={uploadphotoref}
                />
              </label>
            </div>
          </div>

          <Divider />
          <div className="flex gap-2  ml-auto ">
            <button
              onClick={onclose}
              className="border border-primary py-1 px-4 rounded hover:bg-primary"
            >
              Cancel
            </button>
            <button
              onclick={handlesubmit}
              className="bg-primary text-white px-4 py-1 rounded hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(Edituserdetails);
