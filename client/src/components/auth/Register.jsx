import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userApi from "../../api/user";
import { errorHandleToast } from "../../utils/ErrorHandleToast";

import { toast } from "react-toastify";
import { FaDoorOpen } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("idle");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setStatus("pending"); // Request starts

    try {
      if (!username || !email || !password) {
        throw new Error("Please! fill up all input fields.");
      }
      // send data to the server
      const response = await userApi.postUser({ username, email, password });
      setStatus("fulfilled");
      toast.success(
        "Registration successful! " + JSON.stringify(response.data.message),
        {
          position: "top-center", // Optional customization
          autoClose: 3000, // Closes after 3 seconds
        }
      );
      navigate("/login");
    } catch (error) {
      setStatus("rejected");
      // Check if the error is from Axios (server response) or a local throw
      errorHandleToast(error);
    } finally {
      // Reset status and clear fields only on success (move this logic if needed)
      if (status === "fulfilled") {
        setUsername("");
        setEmail("");
        setPassword("");
      }
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            Register
          </h1>
          <div className="mt-6">
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete=""
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-1">
                <button
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={status === "pending" ? true : false}>
                  <FaDoorOpen />
                  Register
                </button>
                <Link
                  to="/login" // Replace with your actual login route
                  className="inline-block align-baseline font-semibold text-sm text-green-500 hover:text-green-800">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
