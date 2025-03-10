import React, { useState } from "react";
import { motion } from "framer-motion";

const FlightList = ({ priceRange, duration, selectedAirport }) => {
  const [selectedSection, setSelectedSection] = useState("best");

  const flights = [
    {
      airline: "Emirates",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/1280px-Emirates_logo.svg.png",
      time: "16:40 - 18:20",
      duration: "1h 40m",
      price: 8781,
      airport: "DEL: Indira Gandhi Intl",
      isBest: true,
    },
    {
      airline: "IndiGo",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/IndiGo_Logo.svg/1280px-IndiGo_Logo.svg.png",
      time: "18:05 - 19:40",
      duration: "1h 35m",
      price: 8781,
      airport: "AMD: Ahmedabad",
      isBest: true,
    },
    {
      airline: "SpiceJet",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/SpiceJet_logo.svg/1280px-SpiceJet_logo.svg.png",
      time: "13:45 - 15:30",
      duration: "1h 45m",
      price: 9200,
      airport: "DEL: Indira Gandhi Intl",
      isBest: false,
    },
    {
      airline: "Air India",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Air_India_Logo.svg/1280px-Air_India_Logo.svg.png",
      time: "20:00 - 21:30",
      duration: "1h 30m",
      price: 9500,
      airport: "AMD: Ahmedabad",
      isBest: false,
    },
  ];


  const filteredFlights = flights.filter((flight) => {
    const withinPriceRange = flight.price >= priceRange[0] && flight.price <= priceRange[1];
    const matchesDuration =
      duration === "short"
        ? flight.duration.includes("1h")
        : duration === "medium"
        ? flight.duration.includes("2h") || flight.duration.includes("3h")
        : duration === "long"
        ? flight.duration.includes("5h")
        : true;
    const matchesAirport = selectedAirport ? flight.airport === selectedAirport : true;

    return withinPriceRange && matchesDuration && matchesAirport;
  });


  const bestFlights = filteredFlights.filter((flight) => flight.isBest);
  const otherFlights = filteredFlights.filter((flight) => !flight.isBest);

  return (
    <div className="space-y-8">
      
      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedSection("best")}
          className={`px-6 py-2 rounded-lg ${
            selectedSection === "best"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Best Flights
        </button>
        <button
          onClick={() => setSelectedSection("other")}
          className={`px-6 py-2 rounded-lg ${
            selectedSection === "other"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Other Flights
        </button>
      </div>

      
      {selectedSection === "best" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Flights</h2>
          <div className="space-y-4">
            {bestFlights.length > 0 ? (
              bestFlights.map((flight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <p className="text-xl font-semibold text-gray-800">{flight.airline}</p>
                        <p className="text-gray-600">{flight.time}</p>
                        <p className="text-gray-600">{flight.duration}</p>
                      </div>
                    </div>

                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">{flight.price} ₹</p>
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-2">
                        Select
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No best flights match your filters.</p>
            )}
          </div>
        </div>
      )}

      
      {selectedSection === "other" && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Flights</h2>
          <div className="space-y-4">
            {otherFlights.length > 0 ? (
              otherFlights.map((flight, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div className="flex items-center gap-4">
                      <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <p className="text-xl font-semibold text-gray-800">{flight.airline}</p>
                        <p className="text-gray-600">{flight.time}</p>
                        <p className="text-gray-600">{flight.duration}</p>
                      </div>
                    </div>

                    
                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-800">{flight.price} ₹</p>
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-2">
                        Select
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600">No other flights match your filters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightList;