import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";
import { HiDotsVertical } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import uploadfile from "../helpers/uploadfile";
import { IoClose } from "react-icons/io5";
import Loading from "./Loading";
import { LuSendHorizonal } from "react-icons/lu";
const Messagepage = () => {
  const socketconnection = useSelector(
    (state) => state?.user?.socketconnection
  );
  const user = useSelector((state) => state?.user);
  const [openimagevideooption, setOpenimagevideooption] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allmessages, setAllmessages] = useState([]);
  const newmessage = useRef(null);
  const [datauser, setDatauser] = useState({
    name: "",
    email: "",
    _id: "",
    profile_pic: "",
    online: "",
  });

  const [message, setMessage] = useState({
    text: "",
    imageurl: "",
    videourl: "",
    seen: "",
  });

  const handleopenimagevideooption = (e) => {
    setOpenimagevideooption(!openimagevideooption);
  };

  const hadleuploadimage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadfile(file);
    setLoading(false);
    setMessage((prev) => {
      return {
        ...prev,
        imageurl: uploadPhoto.url,
      };
    });

    setOpenimagevideooption(false);
  };
  const handleuploadvideo = async (e) => {
    const video = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadfile(video);
    setLoading(false);

    setMessage((prev) => {
      return {
        ...prev,
        videourl: uploadVideo.url,
      };
    });
    setOpenimagevideooption(false);
  };

  const handleclearuploadimage = (e) => {
    setMessage((prev) => {
      return { ...prev, imageurl: "" };
    });
  };
  const handleclearuploadvideo = (e) => {
    setMessage((prev) => {
      return { ...prev, videourl: "" };
    });
  };
  const handleonchange = (e) => {
    const textentered = e.target.value;

    setMessage((prev) => {
      return {
        ...prev,
        text: textentered,
      };
    });
  };
  const handleonsubmit = (e) => {
    e.preventDefault();

    if (message.text || message.imageurl || message.videourl) {
      if (socketconnection) {
        socketconnection.emit("new message", {
          sender: user?._id,
          receiver: params.userid,
          text: message.text,
          imageurl: message.imageurl,
          videourl: message.videourl,
          msgbyuserid: user?._id,
        });
      }

      setMessage({
        text: "",
        imageurl: "",
        videourl: "",
      });
    }
  };
  const params = useParams();
  // console.log("params",params);
  const userid = params?.userid;
  console.log(socketconnection);
  useEffect(() => {
    if (newmessage.current) {
      newmessage.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [allmessages]);
  useEffect(() => {
    if (socketconnection) {
      socketconnection.emit("message-page", params.userid);
      socketconnection.emit('seen',params.userid);

      socketconnection.on("message-user", (data) => {
        console.log("data", data);
        setDatauser(data);
      });

      socketconnection.on("message", (data) => {
        console.log("message data", data);
        setAllmessages(data);
      });
    }
  }, [socketconnection, params?.userid, user]);
  const url =
    "https://i.pinimg.com/564x/d2/a7/76/d2a77609f5d97b9081b117c8f699bd37.jpg";
  return (
    <div style={{ backgroundImage: `url(${url})` }} className="">
      <header className="bg-white h-16 top-0 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div>
            <Avatar
              width={50}
              height={50}
              name={datauser?.name}
              profilepicurl={datauser?.profile_pic}
              userId={datauser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg my-0">{datauser?.name}</h3>
            <p className="-my-2 text-sm">
              {datauser?.online ? (
                <span className="text-primary">online</span>
              ) : (
                <span className="text-slate">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="cursor-pointer hover:text-primary">
            <HiDotsVertical />
          </button>
        </div>
      </header>

      <section className="h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50">
        {/* {message part} */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={newmessage}>
          {allmessages.map((message, ind) => {
            return (
              <div
                className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm   ${
                  user._id === message?.msgbyuserid
                    ? "ml-auto bg-teal-100"
                    : "bg-white"
                }`}
              >
                <div className="w-full">
                  {message.imageurl && (
                    <img src={message?.imageurl}
                    className='w-full h-full object-scale-down'></img>
                  )}
                  {message.videourl && (
                    <video src={message?.videourl}
                    className='w-full h-full object-scale-down'
                    controls></video>
                  )}
                  <p className="px-2">{message.text}</p>
                </div>
              </div>
            );
          })}
        </div>
        {message?.imageurl && (
          <div className="bg-slate-700 w-full h-full sticky bottom-0 opacity-40 flex justify-center items-center  ">
            <div
              className="top-0 right-0 absolute text-black hover:text-primary cursor-pointer "
              onClick={handleclearuploadimage}
            >
              <IoClose size={25} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message?.imageurl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                alt="image"
              ></img>
            </div>
          </div>
        )}
        {/* for video part */}
        {message?.videourl && (
          <div className="bg-slate-700 w-full sticky bottom-0 h-full opacity-40 flex justify-center items-center ">
            <div
              className="top-0 right-0 absolute text-black hover:text-primary cursor-pointer "
              onClick={handleclearuploadvideo}
            >
              <IoClose size={25} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message.videourl}
                className="aspect-square w-full h-full max-w-sm m-2 object-scale-down"
                alt="video"
                muted
                autoPlay
                controls
              ></video>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex justify-center items-center w-full h-full sticky bottom-0">
            <Loading />
          </div>
        )}
      </section>
      <section className="bg-white h-16 flex items-center px-4">
        <div className="relative flex justify-center items-center w-11 h-11 rounded-full  hover:bg-primary   hover:text-white">
          <button className="" onClick={handleopenimagevideooption}>
            <FaPlus />
          </button>
          {openimagevideooption && (
            <div className="bg-white shadow rounded absolute bottom-14 w-36 p-2 left-1 ">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-primary">
                    <FaImage size={18} />
                  </div>
                  <p className="text-black">Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-purple-500">
                    <FaVideo size={18} />
                  </div>
                  <p className="text-black">Video</p>
                </label>

                <input
                  type="file"
                  id="uploadImage"
                  className="hidden"
                  onChange={hadleuploadimage}
                />

                <input
                  type="file"
                  id="uploadVideo"
                  className="hidden"
                  onChange={handleuploadvideo}
                />
              </form>
            </div>
          )}
        </div>
        <form className="w-full flex gap-2" onSubmit={handleonsubmit}>
          <input
            type="text"
            value={message.text}
            onChange={handleonchange}
            className="w-full px-4 py-2 "
            placeholder="Message"
          ></input>
          <button className="mt-1 hover:text-secondary">
            <LuSendHorizonal size={20} />
          </button>
        </form>
      </section>
    </div>
  );
};

export default Messagepage;
