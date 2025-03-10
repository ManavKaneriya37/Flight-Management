import React, { useEffect, useState } from "react";
import gsap from "gsap";

export default function UpdateProfile({ onCancel }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    // GSAP smooth entry animation
    gsap.fromTo(
      ".update-profile-container",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");

    // Smooth exit animation before returning to profile page
    gsap.to(".update-profile-container", {
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => onCancel(), // Call parent function to go back to ProfilePage
    });
  };

  return (
    <div className="update-profile-container max-w-lg mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition cursor-pointer"
            onClick={() => {
              gsap.to(".update-profile-container", {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power3.in",
                onComplete: onCancel, // Call onCancel to go back smoothly
              });
            }}
          >
            Back
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
