import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import axios from "axios";
import { toast } from "react-toastify";

const HomeTicketBookingBox = () => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState("");
  const [departurePanelOpen, setDeparturePanelOpen] = useState(false);
  const [arrival, setArrival] = useState("");
  let [arrivalPanelOpen, setArrivalPanelOpen] = useState(false);
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [list, setList] = useState([]);

  const navToSearchPage = () => {
    if (!departure || !arrival || !date || !returnDate) {
      toast.error("Please fill all required fields");
      return;
    }

    localStorage.setItem("departure_id", departure);
    localStorage.setItem("arrival_id", arrival);
    localStorage.setItem("outbound_date", date);
    localStorage.setItem("return_date", returnDate);
    axios
      .get(`${import.meta.env.VITE_SERVER_API_URL}/flights/search/data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          departure_id: departure,
          arrival_id: arrival,
          outbound_date: date,
          return_date: returnDate,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/search", {
            state: {
              bestFlights: response.data.bestFlights,
              otherFlights: response.data.otherFlights,
            },
          });
        }
      });
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

  const getTomorrowDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
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
                autoComplete="off"
                type="text"
                placeholder="Delhi"
                className="outline-none text-[30px] max-w-[250px]"
                value={departure}
                required
                onChange={handleDepartureChange}
              />
              {departurePanelOpen && departure && (
                <div className="z-10 absolute min-h-[10vh] p-2 max-h-[30vh] w-[20vw] overflow-hidden overflow-y-scroll bg-neutral-100 flex flex-col top-28 rounded-lg">
                  {list.length > 0 ? (
                    list.map((listItem, index) => (
                      <div
                        onClick={() => {
                          setDeparture(listItem.iata);
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
                autoComplete="off"
                name="to"
                type="text"
                placeholder="Mumbai"
                className="outline-none text-[30px] max-w-[250px]"
                value={arrival}
                required
                onChange={handleArrivalChange}
                // onChange={handleFormDataChange}
              />
              {arrivalPanelOpen && arrival && (
                <div className="z-10 absolute min-h-[10vh] p-2 max-h-[30vh] w-[20vw] overflow-hidden overflow-y-scroll bg-neutral-100 flex flex-col top-28 rounded-lg">
                  {list.length > 0 ? (
                    list.map((listItem, index) => (
                      <div
                        onClick={() => {
                          setArrival(listItem.iata);
                          setArrivalPanelOpen(false);
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
          </div>
          <div className="flex gap-5 border-[1px]  border-gray-300 rounded-[20px]">
            <div className="flex flex-col p-5">
              <h1>Departure Date</h1>
              <input
                name="departDate"
                type="date"
                className="outline-none text-[20px] sm:text-[30px] w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                min={getTomorrowDate()}
              />
            </div>
          </div>
          <div className="flex gap-5 border-[1px]  border-gray-300 rounded-[20px]">
            <div className="flex flex-col p-5">
              <h1>Return Date</h1>
              <input
                name="returnDate"
                type="date"
                className="outline-none text-[20px] sm:text-[30px] w-full"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
              />
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
