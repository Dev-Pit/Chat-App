import React, { useEffect, useState } from "react";
import GroupPanel from "./group_panel/GroupPanel";
import MainPanel from "./main_panel/MainPanel";
import MemberPanel from "./member_panel/MemberPanel";
import { useNavigate } from "react-router-dom";

import userApi from "../api/user.js";

import { toast } from "react-toastify";
import { errorHandleToast } from "../utils/ErrorHandleToast";
import { USER_CREDENTIAL } from "../utils/Constants";

const ComponentLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    async function checkUser() {
      try {
        const token = localStorage.getItem(USER_CREDENTIAL);
        const res = await userApi.dashboard(token);
        console.log(`response after login! ${res}`);

        setLoading(false);
      } catch (error) {
        setError(error);
        errorHandleToast(error);
      }
    }

    checkUser();
  }, []);

  // useEffect(() => {
  //   const fetchProtectedData = async () => {
  //     try {
  //       const res = await apiClient.get("/dashboard");
  //       console.log(
  //         `client: got user in dashboard: ${JSON.stringify(res.data)}`
  //       );
  //     } catch (error) {
  //       console.error(
  //         "Dashboard authentication error:",
  //         error.response?.data || error.message
  //       );
  //       toast.error(error.response?.data?.message || "Authentication failed", {
  //         position: "top-center",
  //       });
  //       navigate("/login");
  //     }
  //   };
  //   fetchProtectedData();
  // }, [navigate]);
  return (
    <div className="w-screen h-screen flex">
      {error && <p className="font-bold">Error: {error}</p>}
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
