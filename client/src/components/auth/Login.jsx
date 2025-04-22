import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandleToast } from "../../utils/ErrorHandleToast";

import userApi from "../../api/user";
import { USER_CREDENTIAL } from "../../utils/Constants";

import { CgLogIn } from "react-icons/cg";

const Login = () => {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("testtest");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    try {
      if (!(email || password)) {
        toast.info("Fill all input fields", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }
      // console.log(`client: loginpage: Email: ${email} Password: ${password}`);

      console.log(`\nclient: hitting user login api...`);
      const res = await userApi.userLogin({ email, password });

      // todo : save user details / token on cookie or localStorage
      console.log(
        `\nclient: res got after login : ${JSON.stringify(res.data)}`
      );

      if (res.data) {
        // store the response on localStorage
        localStorage.setItem(USER_CREDENTIAL, JSON.stringify(res.data.data));
      }

      toast.success("Login successful! ", {
        position: "top-center", // Optional customization
        autoClose: 3000, // Closes after 3 seconds
      });

      navigate("/dashboard");
    } catch (error) {
      errorHandleToast(error);
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem(USER_CREDENTIAL);
    if (userData) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-center text-3xl font-bold text-gray-900">
            Login
          </h1>
          <div className="mt-6">
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2">
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
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <button
                  className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit">
                  <CgLogIn />
                  Login
                </button>
                <Link
                  to="/register" // Replace with your actual register route
                  className="inline-block align-baseline font-semibold text-sm text-blue-500 hover:text-blue-800">
                  Don't have an account? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
