import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import axios from "axios";

const HomeTicketBookingBox = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [selectedDeparture, setSelectedDeparture] = useState("");
  let [departurePanelOpen, setDeparturePanelOpen] = useState(false);
  const [arrival, setArrival] = useState("");
  const [selectedArrival, setSelectedArrival] = useState("");
  let [arrivalPanelOpen, setArrivalPanelOpen] = useState(false);

  const [list, setList] = useState([]);

  const navToSearchPage = () => {
    navigate(`/search`);
  };

  const handleDepartureChange = (e) => {
    setDeparture(e.target.value);
    if (departure.length > 0 && departure !== "") {
      setDeparturePanelOpen(true);
    } else {
      setDeparturePanelOpen(false);
    }

    axios
      .get(
        `${import.meta.env.VITE_SERVER_API_URL}/flights/search/airports?name=${
          e.target.value
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
        }
      });
  };

  const handleArrivalChange = (e) => {
    setArrival(e.target.value);

    if (arrival.length > 0 && arrival !== "") {
      setArrivalPanelOpen(true);
    } else {
      setArrivalPanelOpen(false);
    }

    axios
      .get(
        `${import.meta.env.VITE_SERVER_API_URL}/flights/search/airports?name=${
          e.target.value
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setList(response.data);
        }
      });
  };

  return (
    <div className="py-[50px] max-w-[1400px] mx-auto">
      <div className="flex flex-col ">
        <div className="flex justify-between gap-5 flex-col xl:flex-row">
          <div className="relative flex gap-5 border-[1px] max-w-full xl:max-w-fit border-gray-300 rounded-[20px] flex-col xl:flex-row">
            <div className="relative flex flex-col p-5 pb-0 xl:pr-0">
              <h1>From</h1>
              <input
                name="from"
                type="text"
                placeholder="Delhi"
                className="outline-none text-[30px] max-w-[300px]"
                value={departure}
                onChange={handleDepartureChange}
              />
              {departurePanelOpen && departure && (
                <div className="z-10 absolute min-h-[10vh] p-2 max-h-[30vh] w-[35vw] overflow-hidden overflow-y-scroll bg-neutral-100 flex flex-col top-28 rounded-lg">
                  {list.length > 0 ? (
                    list.map((listItem, index) => (
                      <div
                        onClick={() => {
                          setDeparture(listItem.iata);
                          setSelectedDeparture(listItem.iata);
                          setDeparturePanelOpen(false);
                          setList([]);
                        }}
                        key={index}
                        className="flex items-center py-2 px-2 gap-2 hover:bg-gray-300 duration-300 ease cursor-pointer rounded"
                      >
                        <i className="ri-search-line p-1 bg-gray-300 rounded-md px-2"></i>
                        <h1>
                          {listItem.airport}
                          <br />
                          <span className="text-sm opacity-70">
                            {listItem.name} | {listItem.iata}
                          </span>
                        </h1>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-xl mt-2">No airport found!</h1>
                  )}
                </div>
              )}
            </div>
            <div className="relative flex flex-col p-5 border-t-[1px] xl:border-l-[1px] xl:border-t-0 border-gray-300">
              <h1>To</h1>
              <input
                name="to"
                type="text"
                placeholder="Mumbai"
                className="outline-none text-[30px] max-w-[300px]"
                value={arrival}
                onChange={handleArrivalChange}
                // onChange={handleFormDataChange}
              />
              {arrivalPanelOpen && arrival && (
                <div className="z-10 absolute min-h-[10vh] p-2 max-h-[30vh] w-[35vw] overflow-hidden overflow-y-scroll bg-neutral-100 flex flex-col top-28 rounded-lg">
                  {list.length > 0 ? (
                    list.map((listItem, index) => (
                      <div
                        onClick={() => {
                          setArrival(listItem.iata);
                          setSelectedArrival(listItem.iata);
                          setArrivalPanelOpen(false);
                        }}
                        key={index}
                        className="flex items-center py-2 px-2 gap-2 hover:bg-gray-300 duration-300 ease cursor-pointer rounded"
                      >
                        <i className="ri-search-line p-1 bg-gray-300 rounded-md px-2"></i>
                        <h1>
                          {listItem.airport}
                          <br />
                          <span className="text-sm opacity-70">
                            {listItem.name} | {listItem.iata}
                          </span>
                        </h1>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-xl mt-2">No airport found!</h1>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-5 border-[1px]  border-gray-300 rounded-[20px]">
            <div className="flex flex-col p-5">
              <h1>Departure Date</h1>
              <input
                name="departDate"
                type="date"
                className="outline-none text-[20px] sm:text-[30px] w-full"
                // onChange={handleFormDataChange}
              />
            </div>
          </div>
          <div className="flex gap-5 border-[1px] flex-1 border-gray-300 rounded-[20px] flex-col xl:flex-row">
            <div className="flex flex-col p-5 w-full">
              <h1>Flight Type</h1>
              <select
                name="flightType"
                id="flightType"
                className="w-full text-xl mt-3 outline-none border-none"
                // onChange={handleFormDataChange}
              >
                <option value="Economy">Economy</option>
                <option value="Premium">Premium</option>
                <option value="Business">Business</option>
                <option value="First">First</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button
        className="hover:bg-[#1E293B] bg-[#bebebe] text-black hover:text-white px-5 py-2 mt-5 rounded-lg transition duration-100"
        onClick={navToSearchPage}
      >
        Search Flights
      </button>
    </div>
  );
};

export default HomeTicketBookingBox;
