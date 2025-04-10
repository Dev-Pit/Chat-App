import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { CgLogOut } from "react-icons/cg";
import GroupList from "./GroupList";

import { HiUserGroup } from "react-icons/hi";
import { USER_CREDENTIAL } from "../../utils/Constants";

const GroupPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(USER_CREDENTIAL);
    navigate("/login");
  };

  return (
    <section className="w-[40%] flex flex-col border-r-1 border-gray-200">
      <div className="w-full flex justify-between items-center gap-1 py-1 ">
        <h2 className="text-2xl font-black m-3 flex items-center gap-1">
          <HiUserGroup /> Groups
        </h2>

        <IoIosAdd
          size={30}
          className=" hover:bg-blue-700 hover:rounded-full hover:text-white mr-2 cursor-pointer"
        />
      </div>
      <hr className="text-gray-200" />
      <div className="h-[80%] mt-1">
        <GroupList />
      </div>

      <div className="relative h-[8%]  mb-2">
        <hr className="text-gray-200" />
        <div className="absolute bottom-0 w-full ">
          <div className="flex justify-center items-center h-full">
            <button
              onClick={handleLogout}
              className="flex  mx-1 justify-center items-center gap-1 bg-red-100 text-red-700 hover:bg-red-700 hover:text-white">
              <CgLogOut />
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupPanel;
