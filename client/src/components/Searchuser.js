import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import Loading from "./Loading";
import Usersearchcard from "./Usersearchcard";
import axios from "axios";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
const Searchuser = ({ onclose }) => {
  const [searchusers, setSearchusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const handleSearchUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/searchuser`;
    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);

      setSearchusers(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  const handleonchange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    handleSearchUser();
  }, [search]);

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-40">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="bg-white h-16 rounded overflow-hidden flex">
          <input
            type="text"
            className="w-full max-w-md h-full outline-none px-4 py-2"
            placeholder="Search user by name,email....."
            onChange={handleonchange}
            value={search}
          ></input>
          <div className="h-14 w-14 flex justify-center items-center">
            <IoSearchOutline size={25} />
          </div>
        </div>
        <div className="bg-white mt-2 w-full p-4 rounded">
          {searchusers.length === 0 && !loading && (
            <p className="text-center text-slate-500">no user found!</p>
          )}

          {loading && (
            <p>
              <Loading />
            </p>
          )}

          {searchusers.length !== 0 &&
            !loading &&
            searchusers.map((user, index) => {
              return (
                <Usersearchcard key={user._id} user={user} onclose={onclose} />
              );
            })}
        </div>
      </div>
       
    </div>
  );
};

export default Searchuser;
