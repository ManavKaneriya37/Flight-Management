import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Home from "../page/Home";
import ErrorPage from "../page/ErrorPage";
import FlightDetails from "../page/FlightDetails";
import Navbar from "../components/Navbar/Navbar";
import Login from '../components/Login'
import SignupPage from '../components/signUpPage'

import ProfilePage from '../components/Profile'
import ConfirmBooking from '../components/confirmBookingButtonPage'
import JourneySuccess from '../components/ConfirmLastPage'
import PassengerDetails from '../components/PassangerDetails';
import UpdateProfile from '../components/UpdateProfile'

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return isAdmin ? <Element {...rest} /> : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/search" element={<FlightDetails />} />
        <Route path="/passenger-details" element={<PassengerDetails />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />   
        <Route path="/journey-success" element={<JourneySuccess />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
