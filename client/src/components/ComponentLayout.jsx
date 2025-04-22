import React, { useEffect, useState } from "react";
import GroupPanel from "./group_panel/GroupPanel";
import MainPanel from "./main_panel/MainPanel";
import MemberPanel from "./member_panel/MemberPanel";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import apiClient from "../api/client.js";
import userApi from "../api/user.js";
import { USER_CREDENTIAL } from "../utils/Constants.js";

const ComponentLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProtectedData = async () => {
      setLoading(true);
      try {
        const res = await userApi.dashboard("/dashboard/");
        const userInfo = res.data.data;
        // redirect to login if user data not fetched
        if (!userInfo) navigate("/login");

        // store user info in localStorage
        if (!USER_CREDENTIAL) localStorage.setItem(USER_CREDENTIAL, userInfo);

        // console.log(
        //   `client: got user in dashboard: ${JSON.stringify(res.data)}`
        // );
        setLoading(false);
      } catch (error) {
        // console.error(
        //   "Dashboard authentication error:",
        //   error.response?.data || error.message
        // );
        toast.error(error.response?.data?.message || "Authentication failed", {
          position: "top-center",
        });
        navigate("/login");

        setLoading(false);
      }
    };
    fetchProtectedData();
  }, [navigate]);
  return (
    <div className="w-screen h-screen flex">
      {loading ? (
        <p className="font-bold">Loading...</p>
      ) : (
        <>
          <GroupPanel />
          <MainPanel />
          <MemberPanel />
        </>
      )}
    </div>
  );
};

export default ComponentLayout;
