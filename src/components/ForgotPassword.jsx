import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left_arrow.svg";
import putData from "../utils/putData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import homeIcon from "../assets/images/home_icon.svg";

export default function ForgotPassword(props) {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPassword = async () => {
    setLoading(true);
    const res = await putData("/api/auth/password/forgot", { email });
    if (res.success === true) {
      toast(res.message, {
        type: "error",
        theme: props.mode,
        autoClose: 2000,
      });
      setEmail("");
    } else {
      toast(res.message, {
        type: "error",
        theme: props.mode,
        autoClose: 2000,
      });
    }
    setLoading(false);
  };

  const handleForm = (event) => {
    event.preventDefault();
    forgotPassword();
  };

  return (
    <>
      {isLoading ? (
        <Loading height={100} />
      ) : (
        <div>
          <ToastContainer />
          <div className="mt-4 mx-2 flex justify-between items-center">
            <img
              src={leftArrow}
              alt="left-arrow"
              className={`w-7 h-7 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={() => navigate(-1)}
            />
            <img
              src={homeIcon}
              alt="home-icon"
              className={`w-9 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={() => navigate("/")}
            />
          </div>
          <form
            className="mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-72 2xl:mx-96 my-20"
            onSubmit={handleForm}
          >
            <div
              className={`font-extrabold text-2xl mb-7 text-center ${
                props.mode === "light" ? "text-black" : "text-white"
              }`}
            >
              Forgot password
            </div>
            <div className="my-6">
              <input
                type="email"
                placeholder="Your Email Address"
                className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
                  props.mode === "light"
                    ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                    : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
                }`}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="my-6">
              <button
                type="submit"
                className={`w-full py-3 rounded-3xl font-semibold text-lg bg-blue-500 text-white shadow-lg`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
