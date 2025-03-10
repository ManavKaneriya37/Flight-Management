import React, { useState } from "react";

const AirlinesFilter = () => {
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [duration, setDuration] = useState("");
  const [selectedAirport, setSelectedAirport] = useState("");

  const airports = ["AMD: Ahmedabad", "DEL: Indira Gandhi Intl", "BOM: Mumbai", "BLR: Bangalore"];

  return (
    <aside className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>
      <div className="space-y-6">
        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Price Range</h3>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max="20000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, e.target.value])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0 ₹</span>
              <span>{priceRange[1]} ₹</span>
            </div>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Duration</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="duration"
                value="short"
                checked={duration === "short"}
                onChange={() => setDuration("short")}
                className="mr-2"
              />
              <span className="text-gray-600">Short (0-2 hours)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="duration"
                value="medium"
                checked={duration === "medium"}
                onChange={() => setDuration("medium")}
                className="mr-2"
              />
              <span className="text-gray-600">Medium (2-5 hours)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="duration"
                value="long"
                checked={duration === "long"}
                onChange={() => setDuration("long")}
                className="mr-2"
              />
              <span className="text-gray-600">Long (5+ hours)</span>
            </label>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Airport</h3>
          <div className="mt-2 space-y-2">
            {airports.map((airport, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="airport"
                  value={airport}
                  checked={selectedAirport === airport}
                  onChange={() => setSelectedAirport(airport)}
                  className="mr-2"
                />
                <span className="text-gray-600">{airport}</span>
              </label>
            ))}
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Stops</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Non-stop</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">1 Stop</span>
            </label>
          </div>
        </div>

        
        <div>
          <h3 className="text-lg font-medium text-gray-700">Airlines</h3>
          <div className="mt-2 space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">IndiGo</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">SpiceJet</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Air India</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AirlinesFilter;