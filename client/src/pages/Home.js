import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout, setUser } from "../redux/user";
import Siderbar from "../components/Siderbar";
import io from "socket.io-client";
import { setOnlineuser } from "../redux/user";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userdetails = async function () {
    try {
      const Url = "http://localhost:8080/api/userdetails";

      const response = await axios({
        method: "get",
        url: Url,
        withCredentials: true,
      });
      dispatch(setUser(response?.data?.data));
      if (response?.data?.data?.logout) {
        dispatch(logout());
        navigate("/email");
      }
      // console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    userdetails();
  }, []);

  useEffect(() => {
    const socketconnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketconnection.on('onlineuser',(data)=>{
      console.log(data);
      dispatch(setOnlineuser(data));
    })


    return ()=>{
      socketconnection.disconnect();
    }
  });
  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Siderbar />
      </section>

      {/**message component**/}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <img
            src="data:image/png;base64,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"
            width={250}
            alt="logo"
          />
        </div>
        <p className="text-lg mt-2 text-slate-500">
          Select user to send message
        </p>
      </div>
    </div>
  );
};

export default Home;
