// import { useEffect } from "react";
// import { gsap } from "gsap";

// const ConfirmBooking = () => {
//   useEffect(() => {
//     gsap.from(".container", { opacity: 0, y: 50, duration: 1 });
//     gsap.from(".plane", { opacity: 0, x: 50, duration: 1.5 });
//   }, []);

//   const handleConfirm = () => {
//     gsap.to(".plane", {
//       x: -300,
//       y: -200,
//       opacity: 0,
//       duration: 1.5,
//       ease: "power2.out",
//     });
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white max-w-5xl">
//       <div className="container text-center space-y-6">
//         <h1 className="text-3xl font-bold">Just one step away to get your flight!</h1>
//         <p className="text-gray-500">Your flight is listed for you! Book the flight by confirming it.</p>
//         <button 
//           onClick={handleConfirm} 
//           className="px-6 py-3 bg-gray-200 text-black rounded-md shadow-md hover:bg-gray-300 transition"
//         >
//           Confirm the flight
//         </button>
//       </div>
//       <img 
//         src="AirplaneFlipped.png" 
//         alt="Plane" 
//         className="plane absolute bottom-10 right-10 w-60"
//       />
//     </div>
//   );
// };

// export default ConfirmBooking;


import React, { useEffect, useState } from "react";
import gsap from "gsap";
import JourneySuccess from "../components/ConfirmLastPage"; // Import JourneySuccess directly
import {useLocation, useNavigate} from "react-router-dom"
import axios from "axios"

export default function ConfirmBooking() {
  const { state } = useLocation();
  const bookingData = state.bookingData;
  const navigate = useNavigate();

  console.log(bookingData)

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
      <h1 className="text-2xl font-bold absolute top-4 left-6">SkyNest</h1>

      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Just one step away to get your flight!</h2>
        <p className="text-gray-600">Your flight is listed for you! Book the flight by confirming it.</p>
      </div>

      <button
        onClick={handleConfirmClick}
        className="mt-6 bg-gray-200 text-black text-lg px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition cursor-pointer"
      >
        Confirm the flight
      </button>

      <img src="AirplaneFlipped.png" alt="Airplane" className="airplane-img w-[35vw] absolute bottom-4 right-6" />
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import gsap from "gsap";

// export default function ConfirmBooking() {
//   const [flightConfirmed, setFlightConfirmed] = useState(false);

//   useEffect(() => {
//     gsap.fromTo(
//       ".page-container",
//       { opacity: 0 },
//       { opacity: 1, duration: 0.8, ease: "power3.out" }
//     );

//     // Animate airplane entry
//     gsap.fromTo(
//       ".airplane-img",
//       { x: 100, opacity: 0 },
//       { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
//     );
//   }, []);

//   const handleConfirm = () => {
//     setFlightConfirmed(true);
//     gsap.to(".airplane-img", {
//       x: -500,
//       y: -300,
//       opacity: 0,
//       duration: 1.5,
//       ease: "power3.inOut",
//     });

//     setTimeout(() => {
//       alert("🎉 Your flight has been booked successfully!");
//     }, 1500);
//   };

//   return (
//     <div className="page-container flex flex-col items-center justify-center min-h-screen bg-white">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">SkyNest</h1>

//       {/* Heading */}
//       <h2 className="text-4xl font-semibold text-gray-900 text-center mb-3">
//         Just one step away to get your flight!
//       </h2>

//       {/* Subtext */}
//       <p className="text-gray-500 text-center mb-6">
//         Your flight is listed for you! Book the flight by confirming it.
//       </p>

//       {/* Confirm Button */}
//       {!flightConfirmed && (
//         <button
//           className="px-6 py-3 bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition text-lg"
//           onClick={handleConfirm}
//         >
//           Confirm the flight
//         </button>
//       )}

//       {/* Airplane Image */}
//       <img
//         src="/AirplaneFlipped.png" // Ensure this path is correct
//         alt="Airplane"
//         className="airplane-img mt-10 w-80"
//       />
//     </div>
//   );
// }


// import React, { useState } from "react";

// export default function ConfirmBooking() {
//   const [flightConfirmed, setFlightConfirmed] = useState(false);

//   const handleConfirm = () => {
//     setFlightConfirmed(true);
//     setTimeout(() => {
//       alert("🎉 Your flight has been booked successfully!");
//     }, 500);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-4">SkyNest</h1>

//       {/* Heading */}
//       <h2 className="text-4xl font-semibold text-gray-900 text-center mb-3">
//         Just one step away to get your flight!
//       </h2>

//       {/* Subtext */}
//       <p className="text-gray-500 text-center mb-6">
//         Your flight is listed for you! Book the flight by confirming it.
//       </p>

//       {/* Confirm Button */}
//       {!flightConfirmed && (
//         <button
//           className="px-6 py-3 bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition text-lg"
//           onClick={handleConfirm}
//         >
//           Confirm the flight
//         </button>
//       )}

//       {/* Airplane Image */}
//       <img
//         src="/AirplaneFlipped.png" // Ensure correct path
//         alt="Airplane"
//         className="mt-10 w-80"
//       />
//     </div>
//   );
// }
