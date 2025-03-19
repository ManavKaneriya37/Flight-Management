import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FlightList = ({ bestFlights, otherFlights }) => {
  const [selectedSection, setSelectedSection] = useState("best");
  const navigate = useNavigate();

  // const flights = [
  //   {
  //     airline: "Emirates",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
  //     time: "16:40 - 18:20",
  //     duration: "1h 40m",
  //     price: 8781,
  //     airport: "DEL: Indira Gandhi Intl",
  //     isBest: true,
  //   },
  //   {
  //     airline: "IndiGo",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/IndiGo_Logo.svg/1280px-IndiGo_Logo.svg.png",
  //     time: "18:05 - 19:40",
  //     duration: "1h 35m",
  //     price: 8781,
  //     airport: "AMD: Ahmedabad",
  //     isBest: true,
  //   },
  //   {
  //     airline: "SpiceJet",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/SpiceJet_logo.svg/1280px-SpiceJet_logo.svg.png",
  //     time: "13:45 - 15:30",
  //     duration: "1h 45m",
  //     price: 9200,
  //     airport: "DEL: Indira Gandhi Intl",
  //     isBest: false,
  //   },
  //   {
  //     airline: "Air India",
  //     logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Air_India_Logo.svg/1280px-Air_India_Logo.svg.png",
  //     time: "20:00 - 21:30",
  //     duration: "1h 30m",
  //     price: 9500,
  //     airport: "AMD: Ahmedabad",
  //     isBest: false,
  //   },
  // ];

  // const filteredFlights = flights.filter((flight) => {
  //   const withinPriceRange = flight.price >= priceRange[0] && flight.price <= priceRange[1];
  //   const matchesDuration =
  //     duration === "short"
  //       ? flight.duration.includes("1h")
  //       : duration === "medium"
  //       ? flight.duration.includes("2h") || flight.duration.includes("3h")
  //       : duration === "long"
  //       ? flight.duration.includes("5h")
  //       : true;
  //   const matchesAirport = selectedAirport ? flight.airport === selectedAirport : true;

  //   return withinPriceRange && matchesDuration && matchesAirport;
  // });

  // const bestFlights = filteredFlights.filter((flight) => flight.isBest);
  // const otherFlights = filteredFlights.filter((flight) => !flight.isBest);

  const getDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  };

  const manageFlightSelect = (flight_id, airplane) => {
    const departure_id = localStorage.getItem("departure_id");
    const arrival_id = localStorage.getItem("arrival_id");
    const outbound_date = localStorage.getItem("outbound_date");
    const return_date = localStorage.getItem("return_date");

    axios
      .post(
        `${import.meta.env.VITE_SERVER_API_URL}/flights/select`,
        {
          flight_id,
          airplane,
          departure_id,
          arrival_id,
          outbound_date,
          return_date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/passenger-details", {
            state: {flightData: response.data},
          });
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 justify-center">
        <button
          onClick={() => setSelectedSection("best")}
          className={`px-12 py-2 rounded ${
            selectedSection === "best"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Best Flights
        </button>
        <button
          onClick={() => setSelectedSection("other")}
          className={`px-12 py-2 rounded ${
            selectedSection === "other"
              ? "bg-indigo-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Other Flights
        </button>
      </div>

      {selectedSection === "best" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Best Flights for you
          </h2>
          <div className="space-y-4">
            {bestFlights?.length > 0 ? (
              bestFlights?.map((flight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg border-b-[3px] hover:bg-indigo-50 duration-200 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={flight.airline_logo}
                        alt={flight.airline}
                        className="w-16 h-16 object-cover"
                      />
                      <div>
                        <p className=" text-gray-600 text-lg font-semibold">
                          {flight.flights[0].departure_airport.id} -{" "}
                          {flight.flights[0].arrival_airport.id}
                        </p>
                        <p className="text-gray-600 text-xs w-2/3 mt-1">
                          {flight.flights[0].departure_airport.name} -{" "}
                          {flight.flights[0].arrival_airport.name}
                        </p>
                        <p className="text-gray-600">
                          {getDuration(flight.flights[0].duration)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">
                        {flight.flights[0].departure_airport.time.split(" ")[1]}{" "}
                        - {flight.flights[0].arrival_airport.time.split(" ")[1]}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">
                        ${flight.price}
                      </p>
                      <button
                        onClick={() =>
                          manageFlightSelect(
                            flight.flights[0].flight_number,
                            flight.flights[0].airplane
                          )
                        }
                        className="border-indigo-500 border-[1px] px-12 py-2 rounded-lg hover:bg-indigo-700 hover:text-white transition duration-300 mt-2"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">
                No best flights match your filters.
              </p>
            )}
          </div>
        </div>
      )}

      {selectedSection === "other" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Other Flights
          </h2>
          <div className="space-y-4">
            {otherFlights.length > 0 ? (
              otherFlights.map((flight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg border-b-[3px] hover:bg-indigo-50 duration-200 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={flight.airline_logo}
                        alt={flight.airline}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <p className=" text-gray-600 text-lg font-semibold">
                          {flight.flights[0].departure_airport.id} -{" "}
                          {flight.flights[0].arrival_airport.id}
                        </p>
                        <p className="text-gray-600 text-xs w-2/3 mt-1">
                          {flight.flights[0].departure_airport.name} -{" "}
                          {flight.flights[0].arrival_airport.name}
                        </p>
                        <p className="text-gray-600">
                          {getDuration(flight.flights[0].duration)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-gray-800">
                        {flight.flights[0].departure_airport.time.split(" ")[1]}{" "}
                        - {flight.flights[0].arrival_airport.time.split(" ")[1]}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">
                        ${flight.price}
                      </p>
                      <button
                        onClick={() =>
                          manageFlightSelect(
                            flight.flights[0].flight_number,
                            flight.flights[0].airplane
                          )
                        }
                        className="border-indigo-500 border-[1px] px-12 py-2 rounded-lg hover:bg-indigo-700 hover:text-white transition duration-300 mt-2"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">
                No other flights match your filters.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightList;
