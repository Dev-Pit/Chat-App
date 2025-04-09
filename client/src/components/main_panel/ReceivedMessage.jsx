import React from "react";

const ReceivedMessage = () => {
  return (
    <div className="w-full flex justify-start mt-3">
      <div className="w-fit max-w-10/12 ">
        <div className="w-full flex gap-2 mb-2 text-gray-500`">
          <div className="flex justify-center align-middle items-center min-w-4 min-h-4 rounded-full bg-amber-200">
            <span className="text-sm border-1 rounded-full px-1">U</span>
          </div>
          <span className="text-sm">Sender </span>
          <span className="text-sm">Date</span>
        </div>
        <div
          className="w-fit p-3 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl text-white"
          style={{ background: "linear-gradient(159deg, #5dbdfd, #3655f2)" }}>
          <p>Lorem ipsum is the best</p>
        </div>
      </div>
    </div>
  );
};

export default ReceivedMessage;
