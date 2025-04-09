import React from "react";
import userLogo from "../../assets/user.png";

const MemberList = () => {
  return (
    <div className="my-2 mx-1 flex justify-between items-center p-2 border border-gray-200 rounded-sm">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={userLogo}
            alt="user"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <p className="font-bold">Member Name</p>
      </div>

      <span className="border border-green-600 rounded-sm px-2 py-0.5 text-sm bg-green-100 text-green-700">
        active
      </span>
    </div>
  );
};

export default MemberList;
