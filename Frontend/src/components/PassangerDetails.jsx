import React, { useEffect, useState } from "react";
import gsap from "gsap";
import ConfirmBooking from "../components/confirmBookingButtonPage"; // Import ConfirmBooking page

export default function PassengerDetails() {
  const [seats, setSeats] = useState(1); // Default to 1 seat
  const [passengerData, setPassengerData] = useState([{ fullName: "", email: "", age: "" }]);
  const [showConfirmPage, setShowConfirmPage] = useState(false); // For page switching

  useEffect(() => {
    // Page fade-in animation
    gsap.set(".page-container", { opacity: 0, visibility: "visible" });
    gsap.to(".page-container", { opacity: 1, duration: 0.8, ease: "power3.out" });

    // Flight details animation
    gsap.set(".flight-details", { opacity: 0, y: 20 });
    gsap.to(".flight-details", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });

    // Passenger form animation
    gsap.set(".passenger-form div", { opacity: 1, y: 0 }); // Ensure visible
    gsap.to(".passenger-form div", { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out", delay: 0.6 });
  }, []);

  const handleSeatChange = (e) => {
    const numSeats = Math.max(1, parseInt(e.target.value) || 1); // Minimum 1 seat
    setSeats(numSeats);
    setPassengerData(Array.from({ length: numSeats }, () => ({ fullName: "", email: "", age: "" })));
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...passengerData];
    updatedData[index][field] = value;
    setPassengerData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Check if all fields are filled
    const isIncomplete = passengerData.some(passenger => 
      !passenger.fullName.trim() || !passenger.email.trim() || !passenger.age.trim()
    );

    if (isIncomplete) {
      alert("Please fill in all passenger details before proceeding.");
      return;
    }

    setShowConfirmPage(true); // Switch to ConfirmBooking page
  };

  if (showConfirmPage) {
    return <ConfirmBooking />;
  }

  return (
    <div className="page-container max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">SkyNest</h1>

      {/* Flight Details Section */}
      <div className="bg-gray-200 p-6 rounded-lg shadow-md flight-details">
        <h2 className="font-bold text-xl mb-2">Selected Flight Details</h2>
        <div className="bg-white p-6 rounded-lg flex justify-between items-center shadow">
          <div className="text-base text-blak-700">
            <div className="grid grid-cols-3 gap-4 gap-x-20">
              <div><strong>Departure airport </strong><br/> Airport name</div>
              <div><strong>Arrival airport </strong><br/> Airport name</div>
              <div><strong>Duration:</strong><br/> Duration</div>
              <div><strong>Departure Time </strong><br/> Time</div>
              <div><strong>Arrival Time </strong><br/> Time</div>
              <div><strong>Price </strong><br/> Price</div>
              <div><strong>Airline </strong><br/> Airline name</div>
              <div><strong>Travel class </strong><br/> Class name</div>
              <div><strong>Airline number </strong><br/> Airline number</div>
            </div>
          </div>
          <img src="AirplaneFlipped.png" alt="Airplane" className="w-72 object-contain" />
        </div>
      </div>

      {/* Passenger Form Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Register your flight now</h2>

        {/* Number of Seats Input */}
        <div className="mb-4 flex items-center gap-2">
          <label className="text-gray-600">Enter seats (number):</label>
          <input
            type="number"
            min="1"
            value={seats}
            onChange={handleSeatChange}
            className="border p-2 rounded w-16 text-center"
          />
        </div>

        {/* Form for Passenger Details */}
        <form onSubmit={handleSubmit} className="passenger-form">
          {passengerData.map((passenger, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
              <h3 className="font-bold text-gray-700 mb-2">Passenger {index + 1} details:</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  value={passenger.fullName}
                  onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
                  className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={passenger.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                  className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
                  required
                />
                <input
                  type="number"
                  placeholder="Enter Age"
                  value={passenger.age}
                  onChange={(e) => handleInputChange(index, "age", e.target.value)}
                  className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
                  required
                />
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition cursor-pointer">
            Get your flight book
          </button>
        </form>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import gsap from "gsap";
// import ConfirmBooking from "../components/ConfirmBookingButtonPage";

// export default function PassengerDetails({ setPage }) {
//   const [seats, setSeats] = useState(1);
//   const [passengerData, setPassengerData] = useState([{ fullName: "", email: "", age: "" }]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     gsap.set(".page-container", { opacity: 0, visibility: "visible" });
//     gsap.to(".page-container", { opacity: 1, duration: 0.8, ease: "power3.out" });
//   }, []);

//   const handleSeatChange = (e) => {
//     const numSeats = Math.max(1, parseInt(e.target.value) || 1);
//     setSeats(numSeats);
//     setPassengerData(Array.from({ length: numSeats }, () => ({ fullName: "", email: "", age: "" })));
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedData = [...passengerData];
//     updatedData[index][field] = value;
//     setPassengerData(updatedData);
//   };

//   const handleSubmit = () => {
//     // Check if all passenger details are filled
//     const isFormValid = passengerData.every(
//       (p) => p.fullName.trim() !== "" && p.email.trim() !== "" && p.age.trim() !== ""
//     );

//     if (isFormValid) {
//       setError(""); // Clear error
//       setPage("confirmBooking"); // Redirect to ConfirmBooking page
//     } else {
//       setError("Please fill in all passenger details before proceeding.");
//     }
//   };

//   return (
//     <div className="page-container max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       {/* Header */}
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">SkyNest</h1>

//       {/* Flight Details */}
//       <div className="bg-gray-200 p-6 rounded-lg shadow-md">
//         <h2 className="font-bold text-xl mb-2">Selected Flight Details</h2>
//         <div className="bg-white p-6 rounded-lg flex justify-between items-center shadow">
//           <div className="grid grid-cols-3 gap-4">
//             <div><strong>Departure airport:</strong> Airport name</div>
//             <div><strong>Arrival airport:</strong> Airport name</div>
//             <div><strong>Duration:</strong> Duration</div>
//             <div><strong>Departure Time:</strong> Time</div>
//             <div><strong>Arrival Time:</strong> Time</div>
//             <div><strong>Price:</strong> Price</div>
//             <div><strong>Airline:</strong> Airline name</div>
//             <div><strong>Travel class:</strong> Class name</div>
//             <div><strong>Airline number:</strong> Airline number</div>
//           </div>
//           <img src="AirplaneFlipped.png" alt="Airplane" className="w-70 object-contain" />
//         </div>
//       </div>

//       {/* Passenger Form */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-center mb-4">Register your flight now</h2>

//         {/* Number of Seats Input */}
//         <div className="mb-4 flex items-center gap-2">
//           <label className="text-gray-600">Enter seats (number):</label>
//           <input
//             type="number"
//             min="1"
//             value={seats}
//             onChange={handleSeatChange}
//             className="border p-2 rounded w-16 text-center"
//           />
//         </div>

//         {/* Passenger Details Form */}
//         <div>
//           {passengerData.map((passenger, index) => (
//             <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
//               <h3 className="font-bold text-gray-700 mb-2">Passenger {index + 1} details:</h3>
//               <div className="flex flex-col gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Full Name"
//                   value={passenger.fullName}
//                   onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Enter Email"
//                   value={passenger.email}
//                   onChange={(e) => handleInputChange(index, "email", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Enter Age"
//                   value={passenger.age}
//                   onChange={(e) => handleInputChange(index, "age", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Error Message */}
//         {error && <p className="text-red-500 text-center">{error}</p>}

//         {/* Submit Button */}
//         <button
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition cursor-pointer"
//           onClick={handleSubmit}
//         >
//           Get your flight book
//         </button>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import gsap from "gsap";
// import ConfirmBooking from "../components/ConfirmBookingButtonPage"; // Import ConfirmBooking page

// export default function PassengerDetails() {
//   const [seats, setSeats] = useState(1); // Default to 1 seat
//   const [passengerData, setPassengerData] = useState([{ fullName: "", email: "", age: "" }]);
//   const [showConfirmPage, setShowConfirmPage] = useState(false); // For page switching

//   useEffect(() => {
//     gsap.set(".page-container", { opacity: 0, visibility: "visible" });
//     gsap.to(".page-container", { opacity: 1, duration: 0.8, ease: "power3.out" });

//     gsap.set(".flight-details", { opacity: 0, y: 20 });
//     gsap.to(".flight-details", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.3 });

//     gsap.set(".passenger-form", { opacity: 1, y: 0 });
//     gsap.to(".passenger-form", { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out", delay: 0.6 });
//   }, []);

//   const handleSeatChange = (e) => {
//     const numSeats = Math.max(1, parseInt(e.target.value) || 1);
//     setSeats(numSeats);
//     setPassengerData(Array.from({ length: numSeats }, () => ({ fullName: "", email: "", age: "" })));
//   };

//   const handleBooking = () => {
//     setShowConfirmPage(true); // Switch to ConfirmBooking page
//   };

//   if (showConfirmPage) {
//     return <ConfirmBooking />;
//   }

//   return (
//     <div className="page-container max-w-5xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-gray-900 mb-6">SkyNest</h1>

//       {/* Flight Details */}
//       <div className="bg-gray-200 p-6 rounded-lg shadow-md flight-details">
//         <h2 className="font-bold text-xl mb-2">Selected Flight Details</h2>
//         <div className="bg-white p-6 rounded-lg flex justify-between items-center shadow">
//           <div className="text-base text-black-700 grid grid-cols-3 gap-x-16 gap-y-4">
//             <div><strong>Departure airport:</strong><br/> Airport name</div>
//             <div><strong>Arrival airport:</strong><br/> Airport name</div>
//             <div><strong>Duration:</strong><br/> Duration</div>
//             <div><strong>Departure Time:</strong><br/> Time</div>
//             <div><strong>Arrival Time:</strong><br/> Time</div>
//             <div><strong>Price:</strong><br/> Price</div>
//             <div><strong>Airline:</strong><br/> Airline name</div>
//             <div><strong>Travel class:</strong><br/> Class name</div>
//             <div><strong>Airline number:</strong><br/> Airline number</div>
//           </div>
//           <img src="AirplaneFlipped.png" alt="Airplane" className="w-70 object-contain" />
//         </div>
//       </div>

//       {/* Passenger Form */}
//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold text-center mb-4">Register your flight now</h2>

//         {/* Number of Seats */}
//         <div className="mb-4 flex items-center gap-2">
//           <label className="text-gray-600">Enter seats (number):</label>
//           <input
//             type="number"
//             min="1"
//             value={seats}
//             onChange={handleSeatChange}
//             className="border p-2 rounded w-16 text-center"
//           />
//         </div>

//         {/* Passenger Forms */}
//         <div className="passenger-form">
//           {passengerData.map((passenger, index) => (
//             <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4 shadow">
//               <h3 className="font-bold text-gray-700 mb-2">Passenger {index + 1} details:</h3>
//               <div className="flex flex-col gap-2">
//                 <input
//                   type="text"
//                   placeholder="Enter Full Name"
//                   value={passenger.fullName}
//                   onChange={(e) => handleInputChange(index, "fullName", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//                 <input
//                   type="email"
//                   placeholder="Enter Email"
//                   value={passenger.email}
//                   onChange={(e) => handleInputChange(index, "email", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Enter Age"
//                   value={passenger.age}
//                   onChange={(e) => handleInputChange(index, "age", e.target.value)}
//                   className="p-2 bg-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 w-1/2"
//                   required
//                 />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Submit Button */}
//         <button 
//           onClick={handleBooking} 
//           className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition cursor-pointer"
//         >
//           Get your flight book
//         </button>
//       </div>
//     </div>
//   );
// }
