import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RiUser6Fill } from "react-icons/ri";
import { imageTobase } from "../../utils/imageTobase";
import { SummaryApi } from "../../common";
import { useState } from "react";

import toast from "react-hot-toast";

const SignUpPage = () => {
  // =============== Navigate ===============
  const navigate = useNavigate();

  // =============== State ===============
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
    confirmPassword: "",
  });

  // =============== Change Function ===============
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  // =============== Submit Function ===============
  const submitHandler = async (event) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords are not the same!");
      return;
    }
    try {
      const response = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =============== Upload Function ===============
  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const imagePic = await imageTobase(file);
    setData({ ...data, profilePic: imagePic });
  };

  // =============== Rendering ===============
  return (
    <section id="signup">
      <div className="mx-auto container my-44 flex items-center justify-center">
        <div className="bg-transparent shadow-lg border rounded-lg p-2 py-5 w-full max-w-md mx-auto neumorphic-container">
          <div className="my-3 flex flex-col cursor-pointer">
            <div>
              {data.profilePic ? (
                <img
                  src={data.profilePic}
                  alt="profilePic"
                  className="w-20 h-20 mx-auto"
                />
              ) : (
                <RiUser6Fill className="mx-auto" size={40} />
              )}
            </div>
            <form className="mx-auto cursor-pointer">
              <label>
                <div className="text-xs">Upload Photo</div>
                <input
                  type="file"
                  required
                  className="hidden"
                  onChange={uploadFileHandler}
                />
              </label>
            </form>
          </div>
          <form className="pt-5" onSubmit={submitHandler}>
            <div className="mb-5">
              <label className="block text-gray-700">Name:</label>
              <div>
                <input
                  required
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Name ..."
                  onChange={changeHandler}
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 focus:border-red-500 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">Email:</label>
              <div>
                <input
                  required
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={changeHandler}
                  placeholder="Email ..."
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 focus:border-red-500 rounded-lg"
                />
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">Password:</label>
              <div className="relative">
                <input
                  required
                  name="password"
                  value={data.password}
                  onChange={changeHandler}
                  placeholder="Password ..."
                  type={showPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 rounded-lg focus:border-red-500"
                />
                <div
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="block text-gray-700">Confirm Password:</label>
              <div className="relative">
                <input
                  required
                  name="confirmPassword"
                  onChange={changeHandler}
                  value={data.confirmPassword}
                  placeholder="Confirm Password ..."
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full h-full outline-none bg-transparent neumorphic-input border p-1 rounded-lg focus:border-red-500"
                />
                <div
                  className="absolute top-3 right-3 cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600 py-2"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-red-400 font-semibold rounded-lg neumorphic-button text-gray-700"
            >
              Sign Up
            </button>
          </form>
          <p className="py-3">
            Have an Account?{" "}
            <Link
              to="/login"
              className="hover:text-red-500 hover:underline font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
