import React from "react";
import MemberList from "./MemberList";
import { MdOutlineGroups2 } from "react-icons/md";

const MemberPanel = () => {
  return (
    <div className="w-[40%] flex flex-col border-l-1 border-gray-200">
      <div className="w-full flex  justify-start items-center py-1 ">
        <h2 className="text-2xl font-black m-3 flex items-center gap-1">
          <MdOutlineGroups2 /> Members
        </h2>
        <span className="bg-blue-200 px-2 rounded-full font-bold">3</span>
      </div>
      <hr className="text-gray-200" />
      <MemberList />
    </div>
  );
};

export default MemberPanel;
