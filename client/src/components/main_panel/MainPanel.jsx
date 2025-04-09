import React from "react";
import { RiWechatFill } from "react-icons/ri";
import { RxInfoCircled } from "react-icons/rx";
import { TbSend } from "react-icons/tb";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdVideoCall } from "react-icons/md";
import ReceivedMessage from "./ReceivedMessage";
import SentMessage from "./SentMessage";

const MainPanel = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full bg-amber-50 flex justify-between items-center p-2 border-b-1 border-gray-200 ">
        <div className="flex items-center gap-2">
          <RiWechatFill size={24} />
          <div className="flex flex-col">
            <h2 className="text-xl font-black">RoomName</h2>{" "}
            <p className="text-sm">Description</p>
          </div>
        </div>
        <div className="flex gap-4 mr-4">
          <BiSolidPhoneCall
            size={30}
            className="p-1 hover:bg-indigo-600 hover:text-white rounded-full cursor-pointer"
          />
          <MdVideoCall
            size={30}
            className="p-1 hover:bg-green-700 hover:text-white rounded-full cursor-pointer"
          />
          {/* <RxInfoCircled size={24} /> */}
        </div>
      </div>
      <div className="h-[80%] px-2 py-3 bg-gray-50 overflow-y-scroll hide-scrollbar">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illo
        sed vero ad debitis distinctio quae quis praesentium deleniti. Deleniti
        suscipit voluptate dicta illo corporis, deserunt laudantium alias natus
        molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Dolorum illo sed vero ad debitis distinctio quae quis praesentium
        deleniti. Deleniti suscipit voluptate dicta illo corporis, deserunt
        laudantium alias natus molestias! Lorem ipsum dolor sit amet consectetur
        <ReceivedMessage />
        <SentMessage/>
      </div>
      <div className=" h-[8%] flex align-middle items-center mb-2">
        <div className=" w-full px-2 flex gap-1">
          <input
            type="text"
            placeholder="Type Your message..."
            className="w-full"
          />
          <button className="flex items-center gap-1 bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white">
            <TbSend />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;
