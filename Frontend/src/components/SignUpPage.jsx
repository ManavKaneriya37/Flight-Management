import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export default function SignUp({ switchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const inputRefs = {
    firstName: useRef(null),
    lastName: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  useEffect(() => {
    // Floating animation for the airplane image
    gsap.to(".plane-img", { 
      y: 10, 
      duration: 2, 
      repeat: -1, 
      yoyo: true, 
      ease: "power1.inOut" 
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fade-out animation before switching
    gsap.to(".signup-box", { 
      opacity: 0, 
      y: 50, 
      duration: 0.5, 
      onComplete: () => {
        console.log("Form submitted", formData);
        switchToLogin(); // ✅ Switch view after submission
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="signup-box flex flex-col md:flex-row items-center max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Section */}
        <div className="md:w-1/2 p-6 flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-900">SkyNest</h1>
          <p className="text-gray-700 mt-2">SkyNest – Your Journey, Our Wings! ✈️🌍</p>
          <img src="/Airplane.png" alt="Airplane" className="plane-img mt-4 w-64" />
        </div>
        
        {/* Right Section */}
        <div className="md:w-1/2 p-8 bg-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 opacity-60">Register yourself to experience sky!</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              ref={inputRefs.firstName}
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              ref={inputRefs.lastName}
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              ref={inputRefs.email}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
              required
            />
            <input
              ref={inputRefs.password}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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
              onClick={switchToLogin}
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
