import { useState, useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserDataContext } from "../context/UserContext";

export default function SignUp() {
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const formRef = useRef();

  useEffect(() => {
    // Floating animation for the airplane image
    gsap.to(".plane-img", {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    console.log(formData);

    axios
      .post(`${import.meta.env.VITE_SERVER_API_URL}/users/register`, formData)
      .then((response) => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          toast.success(response.data.message);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="signup-box flex flex-col md:flex-row items-center max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-900">EliteWings</h1>
          <p className="text-gray-700 mt-2">
            SkyNest – Your Journey, Our Wings! ✈️🌍
          </p>
          <img
            src="/Airplane.png"
            alt="Airplane"
            className="plane-img mt-4 w-64"
          />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 p-8 bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 opacity-60">
            Register yourself to experience sky!
          </h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <input
              autoComplete="off"
              name="firstName"
              type="text"
              placeholder="First name"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              autoComplete="off"
              name="lastName"
              type="text"
              placeholder="Last name"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              name="email"
              autoComplete="off"
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              autoComplete="off"
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full p-3 bg-white border border-gray-700 rounded-lg text-gray-800 font-semibold hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              Sign up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate("/")}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
