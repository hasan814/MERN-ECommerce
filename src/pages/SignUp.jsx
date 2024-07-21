import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { toast, Toaster } from "react-hot-toast";
import { imageTobase64 } from "../utils/helper";
import { useState } from "react";
import { Link } from "react-router-dom";

import SummaryApi from "../utils/API";
import axios from "axios";

const SignUp = () => {
  // ========== State ============
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    confirmPassword: "",
  });

  // ========== Function ============
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords are not Matched!");
      return;
    }

    try {
      const response = await axios({
        method: SummaryApi.signUp.method,
        url: SummaryApi.signUp.url,
        headers: { "Content-Type": "application/json" },
        data,
      });
      const responseData = response.data;
      console.log(responseData);
      toast.success("Registration Successfull!");
    } catch (error) {
      console.error("Error during registeration:", error);
      if (error.response)
        toast.error(`Registration faild:${error.response.data.message}`);
      else toast.error("Registration failed:Network error");
    }
  };

  const handleUploadPic = async (event) => {
    const file = event.target.files[0];
    const imagePic = await imageTobase64(file);

    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  // ========== Rendering ============
  return (
    <section id="login">
      <Toaster />
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.profilePic || "/src/assets/signin.gif"}
                alt="login icon"
                className="w-full h-full object-cover"
              />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-75 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  required
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={submitHandler}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-200 p-1">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={changeHandler}
                  placeholder="Name ..."
                  alt="login icon"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-200 p-1">
                <input
                  type="email"
                  name="email"
                  required
                  value={data.email}
                  onChange={changeHandler}
                  placeholder="Email ..."
                  alt="login icon"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Password:</label>
              <div className="bg-slate-200 flex items-center p-1">
                <input
                  type={showPassword ? "text" : "password"}
                  alt="login icon"
                  name="password"
                  required
                  value={data.password}
                  onChange={changeHandler}
                  placeholder="Password ..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="grid">
              <label>Confirm Password:</label>
              <div className="bg-slate-200 flex items-center p-1">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  alt="login icon"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={changeHandler}
                  required
                  placeholder="Confirm password ..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="cursor-pointer"
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-4"
            >
              Sign Up
            </button>
          </form>
          <p className="my-5 flex items-center justify-center gap-1">
            Do you have an account?
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
