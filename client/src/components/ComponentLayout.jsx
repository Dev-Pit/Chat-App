import React, { useEffect } from "react";
import GroupPanel from "./group_panel/GroupPanel";
import MainPanel from "./main_panel/MainPanel";
import MemberPanel from "./member_panel/MemberPanel";
import { useNavigate } from "react-router-dom";

import apiClient from "../api/client";

import { toast } from "react-toastify";

const ComponentLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const res = await apiClient.get("/dashboard");
        console.log(
          `client: got user in dashboard: ${JSON.stringify(res.data)}`
        );
      } catch (error) {
        console.error(
          "Dashboard authentication error:",
          error.response?.data || error.message
        );
        toast.error(error.response?.data?.message || "Authentication failed", {
          position: "top-center",
        });
        navigate("/login");
      }
    };
    fetchProtectedData();
  }, [navigate]);
  return (
    <div className="w-screen h-screen flex">
      <GroupPanel />
      <MainPanel />
      <MemberPanel />
    </div>
  );
};

export default ComponentLayout;
