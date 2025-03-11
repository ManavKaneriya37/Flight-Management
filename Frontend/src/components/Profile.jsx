// import React, { useState } from "react";

// export default function ProfilePage() {
//   const [profileImage, setProfileImage] = useState(null);

//   const bookings = [
//     {
//       id: 1,
//       bookingDate: "March 5, 2025",
//       departure: "Los Angeles (LAX)",
//       arrival: "New York (JFK)",
//       seats: 2,
//       status: "Confirmed",
//       travelClass: "Business",
//     },
//     {
//       id: 2,
//       bookingDate: "April 10, 2025",
//       departure: "San Francisco (SFO)",
//       arrival: "Chicago (ORD)",
//       seats: 1,
//       status: "Pending",
//       travelClass: "Economy",
//     },
//     {
//       id: 3,
//       bookingDate: "May 22, 2025",
//       departure: "Miami (MIA)",
//       arrival: "London (LHR)",
//       seats: 1,
//       status: "Confirmed",
//       travelClass: "First Class",
//     },
//   ];

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

      
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
//       {/* Profile Section */}
//       <div className="flex items-center justify-between pb-7">
//         <div className="flex items-center gap-4">
//           <label className="relative w-20 h-20">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border">
//               {profileImage ? (
//                 <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-gray-500">Upload</span>
//               )}
//             </div>
//           </label>
//           <div>
//             <h2 className="text-2xl font-semibold">User Name</h2>
//             <p className="text-gray-600">email@example.com</p>
//           </div>
//         </div>
//         <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
//           Update Profile
//         </button>
//       </div>

//       {/* Recent Bookings */}
//       <h3 className="mt-6 text-xl font-semibold">Your Recent Bookings</h3>
//       <div className="mt-4 space-y-4">
//         {bookings.map((booking) => (
//           <div key={booking.id} className=" p-4 bg-gray-200 shadow-sm">
//             <div className="grid grid-cols-5 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Booking Date</p>
//                 <p className="font-medium">{booking.bookingDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Departure Airport</p>
//                 <p className="font-medium">{booking.departure}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Arrival Airport</p>
//                 <p className="font-medium">{booking.arrival}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Seats</p>
//                 <p className="font-medium">{booking.seats}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Status</p>
//                 <p className={`font-medium ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
//                   {booking.status}
//                 </p>
//               </div>
//             </div>
//             <p className="mt-2 text-sm text-gray-500">Travel Class: <span className="font-medium">{booking.travelClass}</span></p>
//             <a
//               href={`/booking/${booking.id}`} 
//               className="mt-2 inline-block text-blue-500 hover:underline text-sm"
//             >
//               View Details
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";

// function ProfilePage() {
//   const [profileImage, setProfileImage] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const bookings = [
//     {
//       id: 1,
//       bookingDate: "March 5, 2025",
//       departure: "Los Angeles (LAX)",
//       arrival: "New York (JFK)",
//       seats: 2,
//       status: "Confirmed",
//       travelClass: "Business",
//     },
//     {
//       id: 2,
//       bookingDate: "April 10, 2025",
//       departure: "San Francisco (SFO)",
//       arrival: "Chicago (ORD)",
//       seats: 1,
//       status: "Pending",
//       travelClass: "Economy",
//     },
//     {
//       id: 3,
//       bookingDate: "May 22, 2025",
//       departure: "Miami (MIA)",
//       arrival: "London (LHR)",
//       seats: 1,
//       status: "Confirmed",
//       travelClass: "First Class",
//     },
//   ];

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imgURL = URL.createObjectURL(file);
//       setProfileImage(imgURL);
//     }
//   };

//   const handleProfileUpdate = (updatedProfile) => {
//     // Handle profile update logic here
//     console.log("Profile updated:", updatedProfile);
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
//       {isEditing ? (
//         <ProfileUpdateForm
//           profileImage={profileImage}
//           onImageUpload={handleImageUpload}
//           onSave={handleProfileUpdate}
//           onCancel={() => setIsEditing(false)}
//         />
//       ) : (
//         <>
//           {/* Profile Section */}
//           <div className="flex items-center justify-between pb-7">
//             <div className="flex items-center gap-4">
//               <label className="relative w-20 h-20">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border">
//                   {profileImage ? (
//                     <img
//                       src={profileImage}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-500">Upload</span>
//                   )}
//                 </div>
//               </label>
//               <div>
//                 <h2 className="text-2xl font-semibold">User Name</h2>
//                 <p className="text-gray-600">email@example.com</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsEditing(true)}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition transform hover:scale-105"
//             >
//               Update Profile
//             </button>
//           </div>

//           {/* Recent Bookings */}
//           <h3 className="mt-6 text-xl font-semibold">Your Recent Bookings</h3>
//           <div className="mt-4 space-y-4">
//             {bookings.map((booking) => (
//               <div
//                 key={booking.id}
//                 className="p-4 bg-gray-200 shadow-sm rounded-md"
//               >
//                 <div className="grid grid-cols-5 gap-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Booking Date</p>
//                     <p className="font-medium">{booking.bookingDate}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Departure Airport</p>
//                     <p className="font-medium">{booking.departure}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Arrival Airport</p>
//                     <p className="font-medium">{booking.arrival}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Seats</p>
//                     <p className="font-medium">{booking.seats}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-500">Status</p>
//                     <p
//                       className={`font-medium ${
//                         booking.status === "Confirmed"
//                           ? "text-green-600"
//                           : "text-yellow-600"
//                       }`}
//                     >
//                       {booking.status}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">
//                   Travel Class:{" "}
//                   <span className="font-medium">{booking.travelClass}</span>
//                 </p>
//                 <a
//                   href={`/booking/${booking.id}`}
//                   className="mt-2 inline-block text-blue-500 hover:underline text-sm"
//                 >
//                   View Details
//                 </a>
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }




// import React, { useState } from "react";
// import UpdateProfile from "../components/updateProfile"; // Import Update Profile Component

// export default function ProfilePage() {
//   const [showUpdateProfile, setShowUpdateProfile] = useState(false);

//   const bookings = [
//     {
//       id: 1,
//       bookingDate: "March 5, 2025",
//       departure: "Los Angeles (LAX)",
//       arrival: "New York (JFK)",
//       seats: 2,
//       status: "Confirmed",
//       travelClass: "Business",
//     },
//     {
//       id: 2,
//       bookingDate: "April 10, 2025",
//       departure: "San Francisco (SFO)",
//       arrival: "Chicago (ORD)",
//       seats: 1,
//       status: "Pending",
//       travelClass: "Economy",
//     },
//     {
//       id: 3,
//       bookingDate: "May 22, 2025",
//       departure: "Miami (MIA)",
//       arrival: "London (LHR)",
//       seats: 1,
//       status: "Confirmed",
//       travelClass: "First Class",
//     },
//   ];

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   return isEditing ? (
//     <UpdateProfile onCancel={() => setIsEditing(false)} />
//   ) : (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
//       {/* Profile Section */}
//       <div className="flex items-center justify-between pb-7">
//         <div className="flex items-center gap-4">
//           <label className="relative w-20 h-20">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//             />
//             <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border">
//               {profileImage ? (
//                 <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//               ) : (
//                 <span className="text-gray-500">Upload</span>
//               )}
//             </div>
//           </label>
//           <div>
//             <h2 className="text-2xl font-semibold">User Name</h2>
//             <p className="text-gray-600">email@example.com</p>
//           </div>
//         </div>
//         <button
//           onClick={() => setIsEditing(true)} // Switch to Update Profile
//           className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
//         >
//           Update Profile
//         </button>
//       </div>

//       {/* Recent Bookings */}
//       <h3 className="mt-6 text-xl font-semibold">Your Recent Bookings</h3>
//       <div className="mt-4 space-y-4">
//         {bookings.map((booking) => (
//           <div key={booking.id} className="p-4 bg-gray-200 shadow-sm">
//             <div className="grid grid-cols-5 gap-4">
//               <div>
//                 <p className="text-sm text-gray-500">Booking Date</p>
//                 <p className="font-medium">{booking.bookingDate}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Departure Airport</p>
//                 <p className="font-medium">{booking.departure}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Arrival Airport</p>
//                 <p className="font-medium">{booking.arrival}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Seats</p>
//                 <p className="font-medium">{booking.seats}</p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500">Status</p>
//                 <p className={`font-medium ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
//                   {booking.status}
//                 </p>
//               </div>
//             </div>
//             <p className="mt-2 text-sm text-gray-500">
//               Travel Class: <span className="font-medium">{booking.travelClass}</span>
//             </p>
//             <a
//               href={`/booking/${booking.id}`}
//               className="mt-2 inline-block text-blue-500 hover:underline text-sm"
//             >
//               View Details
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import UpdateProfile from "../components/updateProfile";
// import gsap from "gsap";

// export default function ProfilePage() {
//   const [showUpdateProfile, setShowUpdateProfile] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);

//   const bookings = [
//     { id: 1, bookingDate: "March 5, 2025", departure: "Los Angeles (LAX)", arrival: "New York (JFK)", seats: 2, status: "Confirmed", travelClass: "Business" },
//     { id: 2, bookingDate: "April 10, 2025", departure: "San Francisco (SFO)", arrival: "Chicago (ORD)", seats: 1, status: "Pending", travelClass: "Economy" },
//     { id: 3, bookingDate: "May 22, 2025", departure: "Miami (MIA)", arrival: "London (LHR)", seats: 1, status: "Confirmed", travelClass: "First Class" },
//   ];

//   useEffect(() => {
//     gsap.from(".profile-container", { opacity: 0, y: -30, duration: 0.5, ease: "power3.out" });
//     gsap.from(".booking-card", { opacity: 0, y: 20, duration: 0.5, stagger: 0.2, ease: "power3.out" });
//   }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-lg">
//       {showUpdateProfile ? (
//         <div className="update-profile-container">
//           <UpdateProfile onCancel={() => setShowUpdateProfile(false)} />
//         </div>
//       ) : (
//         <div className="profile-container">
//           {/* Profile Section */}
//           <div className="flex items-center justify-between pb-7">
//             <div className="flex items-center gap-4">
//               {/* Profile Image Upload */}
//               <label className="relative w-20 h-20">
//                 <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
//                 <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden border transition-transform transform hover:scale-105">
//                   {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-gray-500">Upload</span>}
//                 </div>
//               </label>

//               {/* User Info */}
//               <div>
//                 <h2 className="text-2xl font-semibold">User Name</h2>
//                 <p className="text-gray-600">email@example.com</p>
//               </div>
//             </div>

//             {/* Update Profile Button */}
//             <button
//               onClick={() => setShowUpdateProfile(true)}
//               className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transform hover:scale-105 transition-all"
//             >
//               Update Profile
//             </button>
//           </div>

//           {/* Recent Bookings Section */}
//           <h3 className="mt-6 text-xl font-semibold">Your Recent Bookings</h3>
//           <div className="mt-4 space-y-4">
//             {bookings.map((booking) => (
//               <div key={booking.id} className="booking-card p-4 bg-gray-200 shadow-sm rounded-lg">
//                 <div className="grid grid-cols-5 gap-4">
//                   <div><p className="text-sm text-gray-500">Booking Date</p><p className="font-medium">{booking.bookingDate}</p></div>
//                   <div><p className="text-sm text-gray-500">Departure</p><p className="font-medium">{booking.departure}</p></div>
//                   <div><p className="text-sm text-gray-500">Arrival</p><p className="font-medium">{booking.arrival}</p></div>
//                   <div><p className="text-sm text-gray-500">Seats</p><p className="font-medium">{booking.seats}</p></div>
//                   <div><p className="text-sm text-gray-500">Status</p><p className={`font-medium ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>{booking.status}</p></div>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">Travel Class: <span className="font-medium">{booking.travelClass}</span></p>
//                 <a href={`/booking/${booking.id}`} className="mt-2 inline-block text-blue-500 hover:underline text-sm">View Details</a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import UpdateProfile from "../components/UpdateProfile";
import axios from "axios"

function ProfilePage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      ".page-transition",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [isUpdating]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
     .then((response) => setUser(response.data))
     .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [])

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-md">
      {isUpdating ? (
        <UpdateProfile
          onCancel={() => setIsUpdating(false)}
          setProfileImage={setProfileImage}
          user={user}
        />
      ) : (
        <ProfileView
          onUpdateClick={() => setIsUpdating(true)}
          user={user}
        />
      )}
    </div>
  );
}

function ProfileView({ onUpdateClick, user }) {
  return (
    <div className="page-transition">
      <h1 className="text-2xl font-bold mb-4">SkyNest</h1>
      <div className="flex items-center justify-between pb-7">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <img className="w-16 h-16 rounded-full" src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png" alt="" />
          </label>
          {user && <div>
            <h2 className="text-2xl font-semibold">{user?.firstName + " " + user?.lastName}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div> }
        </div>
        <button
          onClick={onUpdateClick}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition transform hover:scale-105 cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      <h3 className="mt-6 text-xl font-semibold">Your Recent Bookings</h3>
      <div className="mt-4 space-y-4">
        {user?.bookings?.map((booking) => (
          <div key={booking._id} className="p-4 bg-gray-200 shadow-sm rounded-md">
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-500">Booking Date</p>
                <p className="font-medium">{booking.bookingDate.split("T")[0]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-medium">{booking.flight.departureAirport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Arrival</p>
                <p className="font-medium">{booking.flight.arrivalAirport}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seats</p>
                <p className="font-medium">{booking.seats}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${booking.status === "confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  {booking.status}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">Travel Class: <span className="font-medium">{booking.flight.travelClass}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
