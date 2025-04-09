import React from "react";
import GroupPanel from "./group_panel/GroupPanel";
import MainPanel from "./main_panel/MainPanel";
import MemberPanel from "./member_panel/MemberPanel";

const ComponentLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <GroupPanel />
      <MainPanel />
      <MemberPanel />
    </div>
  );
};

export default ComponentLayout;
