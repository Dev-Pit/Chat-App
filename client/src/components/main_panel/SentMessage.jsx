import React from "react";

const SentMessage = () => {
  return (
    <div className="w-full flex justify-end mt-3">
      <div className="w-fit max-w-10/12 ">
        <div className="w-full flex justify-end gap-2 mb-2 text-gray-500`">
          <span className="text-sm">Sender </span>
          <span className="text-sm">Date</span>
          <div className="flex justify-center align-middle items-center min-w-4 min-h-4 rounded-full bg-amber-200">
            <span className="text-sm border-1 rounded-full px-1">U</span>
          </div>
        </div>
        <div
          className="w-fit p-3 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl"
          style={{ background: "linear-gradient(135deg, #d4d6d8, #DDE6E8)" }}>
          <p>Sent message Lorem ipsum dolor sit amet,</p>
        </div>
      </div>
    </div>
  );
};

export default SentMessage;
