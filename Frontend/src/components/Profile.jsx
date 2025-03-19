import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import UpdateProfile from "../components/UpdateProfile";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    axios
      .get(`${import.meta.env.VITE_SERVER_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div className="mx-10 p-6 bg-white">
      {isUpdating ? (
        <UpdateProfile
          onCancel={() => setIsUpdating(false)}
          setProfileImage={setProfileImage}
          user={user}
        />
      ) : (
        <ProfileView onUpdateClick={() => setIsUpdating(true)} user={user} />
      )}
    </div>
  );
}

function ProfileView({ onUpdateClick, user }) {
  const navigate = useNavigate();
  const handleCancelBooking = (bookingId) => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_API_URL}/bookings/cancel`,
        {
          booking_id: bookingId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        toast.success("Booking cancelled successfully");
        window.location.reload();
      })
  };
  return (
    <div className="page-transition">
      <div className="font-semibold text-3xl opacity-50 mb-10">EliteWings</div>
      <div onClick={()=> navigate("/home")} className="my-10 flex items-center gap-3 cursor-pointer opacity-65"><i class="ri-arrow-left-line text-2xl "></i>Home</div>
      <div className="flex items-center justify-between pb-7">
        <div className="flex items-center gap-4">
          <label className="cursor-pointer">
            <img
              className="w-16 h-16 rounded-full"
              src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
              alt=""
            />
          </label>
          {user && (
            <div>
              <h2 className="text-2xl font-semibold">
                {user?.firstName + " " + user?.lastName || "User"}
              </h2>
              <p className="text-gray-600">{user?.email || "User email"}</p>
            </div>
          )}
        </div>
        <button
          onClick={onUpdateClick}
          className="px-4 py-2 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 transition transform hover:scale-105 cursor-pointer"
        >
          Update Profile
        </button>
      </div>

      <h3 className="mt-6 text-2xl text-indigo-800 font-semibold">
        Your Recent Bookings
      </h3>
      <div className="mt-4 space-y-4 max-h-[80vh] overflow-hidden overflow-y-auto">
        {user?.bookings?.reverse().map((booking) => (
          <div
            key={booking._id}
            className="p-4 bg-white rounded-md border-b-2 border-indigo-200 shadow-sm shadow-indigo-100"
          >
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className="text-sm text-gray-500">Booking Date</p>
                <p className="font-medium">
                  {booking.bookingDate.split("T")[0]}
                </p>
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
                <p
                  className={`font-medium capitalize ${
                    booking.status === "confirmed"
                      ? "text-green-600"
                      : "text-amber-500"
                  } ${booking.status === "cancelled" ? "text-gray-300" : ""}`}
                >
                  {booking.status}
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Travel Class:{" "}
              <span className="font-medium">{booking.flight.travelClass}</span>
            </p>
            {booking.status === "pending" && (
              <div>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-zinc-200 px-10 py-2 rounded-md hover:bg-zinc-300 duration-200 mt-2"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
