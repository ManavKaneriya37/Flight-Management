import React, { useEffect } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";


export default function JourneySuccess() {
  const navigate = useNavigate()
  useEffect(() => {
    // Fade-in effect for page
    gsap.fromTo(
      ".page-container",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Animate airplane entry
    gsap.fromTo(
      ".airplane-img",
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  return (
    <div className="page-container flex flex-col items-center justify-center min-h-screen bg-white p-6">
      {/* Header */}
      <div className="font-semibold text-3xl opacity-50 mb-10 absolute top-4 left-6">EliteWings</div>


      {/* Heading */}
      <h2 className="text-4xl font-bold text-indigo-800 text-center mb-3 mt-32">
        Hurray! Your journey is now ready to touch the Sky!
      </h2>

      {/* Go Home Button */}
      <button
        className="px-20 py-3 mt-10 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-400 transition text-lg"
        onClick={() => navigate('/home')}
      >
        Go to Home
      </button>

      {/* Airplane Image */}
      <img
        src="/AirplaneFlipped.png" // Ensure correct path
        alt="Airplane"
        className="airplane-img mt-10 w-[35vw]"
      />
    </div>
  );
}


// import React, { useEffect } from "react";
// import gsap from "gsap";

// export default function JourneySuccess({ onGoHome }) {
//   useEffect(() => {
//     gsap.fromTo(
//       ".page-container",
//       { opacity: 0 },
//       { opacity: 1, duration: 0.8, ease: "power3.out" }
//     );

//     gsap.fromTo(
//       ".airplane-img",
//       { x: 100, opacity: 0 },
//       { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
//     );
//   }, []);

//   const handleConfirmClick = () => {
//     gsap.to(".airplane-img", { x: -500, y: -300, opacity: 0, duration: 1.2, ease: "power3.inOut" });
//   };

//   return (
//     <div className="page-container min-h-screen flex flex-col justify-center items-center p-8 relative">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-black absolute top-6 left-6">SkyNest</h1>

//       {/* Main Text */}
//       <h2 className="text-5xl font-semibold text-black text-center mt-20">
//         Hurray! Your journey <br /> is now ready to touch <br /> the Sky!
//       </h2>

//       {/* Go Home Button */}
//       <button
//         onClick={handleConfirmClick}
//         className="mt-6 px-6 py-3 bg-gray-200 text-black rounded-lg shadow-md hover:bg-gray-300 transition text-lg cursor-pointer "
//       >
//         Go to Home
//       </button>

//       {/* Airplane Image */}
//       <img
//         src="/AirplaneFlipped.png"
//         alt="Airplane"
//         className="airplane-img absolute bottom-10 right-10 w-96"
//       />
//     </div>
//   );
// }
