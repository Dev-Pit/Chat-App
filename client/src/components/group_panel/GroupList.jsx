import React from "react";
import { RiGroup2Fill } from "react-icons/ri";

const GroupList = () => {
  return (
    <div className="flex justify-between items-center m-1 p-2 bg-green-50 border-1 border-green-500 rounded-sm">
      <div className="flex flex-col px-2">
        <h2 className="font-bold flex items-center"><RiGroup2Fill/> Group Name</h2>
        <p className="text-sm">
          {/* if description is more that 2 line then show ... */}
          Description Lorem ipsum dolor sit amet,
        </p>
      </div>
      <button className=" bg-green-300 text-sm">Join</button>
    </div>
  );
};

export default GroupList;
