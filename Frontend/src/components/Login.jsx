import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom'
import gsap from "gsap";
import axios from 'axios'
import { toast } from "react-toastify";
import {UserDataContext} from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const containerRef = useRef(null);
  const { setUser } = useContext(UserDataContext);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    gsap.to(".plane-img", {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_SERVER_API_URL}/users/login`, formData)
     .then((response) => {
        if(response.status === 200) {
          localStorage.setItem('token', response.data.token);
          setUser(response.data.user);
          toast.success(response.data.message);
          navigate('/home');
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });

    setFormData({ email: "", password: "" });
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div
        ref={containerRef}
        className="login-box flex flex-col md:flex-row items-center max-w-4xl w-full bg-white py-20 px-10 shadow-lg rounded-lg overflow-hidden"
      >
        {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-900">SkyNest</h1>
          <p className="text-gray-700 mt-2">Get set to explore the world ✈️🌍</p>
          <img src="/Airplane.png" alt="Airplane" className="plane-img mt-4 w-64" />
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 bg-gray-100/40 p-12 rounded-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 opacity-60">
            Once again, Get ready to feel the sky!!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-white border rounded-lg text-gray-800 font-semibold duration-300 ease hover:bg-neutral-100/20 hover:shadow-lg cursor-pointer"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
