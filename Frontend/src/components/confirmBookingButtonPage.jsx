import React, { useEffect, useState } from "react";
import gsap from "gsap";
import JourneySuccess from "../components/ConfirmLastPage"; // Import JourneySuccess directly
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"

export default function ConfirmBooking() {
  const { state } = useLocation();
  const bookingData = state.bookingData;
  const navigate = useNavigate();

  useEffect(() => {
    gsap.set(".confirm-container", { opacity: 0, visibility: "visible" });
    gsap.to(".confirm-container", { opacity: 1, duration: 0.8, ease: "power3.out" });
  }, []);

  const handleConfirmClick = () => {
    gsap.to(".airplane-img", {
      x: -500,
      y: -300,
      opacity: 0,
      duration: 1.2,
      ease: "power3.inOut",
    });

    axios.post(`${import.meta.env.VITE_SERVER_API_URL}/bookings/confirm`, {
      booking_id: bookingData._id
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        navigate('/journey-success')
      }
    })
    
  };

  return (
    <div className="confirm-container flex flex-col items-center justify-center h-screen bg-white">
            <div className="font-semibold text-3xl opacity-50 mb-10 absolute top-4 left-6">EliteWings</div>
            <div onClick={()=>navigate("/home")} className="absolute top-8 left-5 my-10 flex items-center gap-3 cursor-pointer opacity-65"><i class="ri-arrow-left-line text-2xl "></i>Home</div>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-indigo-800 mb-4">Just one step away to get your flight!</h2>
        <p className="text-gray-600 opacity-85">Your flight is listed for you! Book the flight by confirming it.</p>
      </div>

      <button
        onClick={handleConfirmClick}
        className="mt-12 bg-indigo-500 text-white text-lg px-16 py-3 rounded-md shadow-md hover:bg-indigo-600 transition cursor-pointer"
      >
        Confirm the flight
      </button>

      <img src="AirplaneFlipped.png" alt="Airplane" className="airplane-img w-[35vw] absolute bottom-4 right-6" />
    </div>
  );
}
