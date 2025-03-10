import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Home from "../page/Home";
import ErrorPage from "../page/ErrorPage";
import FlightDetails from "../page/FlightDetails";
import Navbar from "../components/Navbar/Navbar";
import Login from "../components/Login";
import SignupPage from "../components/SignUpPage";
import UserProtectedWrapper from "../components/UserProtectedWrapper";

import ProfilePage from "../components/Profile";
import ConfirmBooking from "../components/confirmBookingButtonPage";
import JourneySuccess from "../components/ConfirmLastPage";
import PassengerDetails from "../components/PassangerDetails";
import UpdateProfile from "../components/UpdateProfile";

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
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/profile"
          element={
            <UserProtectedWrapper>
              <ProfilePage />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/update-profile"
          element={
            <UserProtectedWrapper>
              <UpdateProfile />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/search"
          element={
            <UserProtectedWrapper>
              <FlightDetails />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/passenger-details"
          element={
            <UserProtectedWrapper>
              <PassengerDetails />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/confirm-booking"
          element={
            <UserProtectedWrapper>
              <ConfirmBooking />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/journey-success"
          element={
            <UserProtectedWrapper>
              <JourneySuccess />
            </UserProtectedWrapper>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
