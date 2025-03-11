import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import FlightList from "./FlightList";
import AirlinesFilter from "./AirlinesFilter";
import FlightSearchNavbar from "./FlightSearchNavbar";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const FlightDetails = () => {
  document.title = "EliteWings | Search";
  const sectionRefs = useRef([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [duration, setDuration] = useState("");
  const [selectedAirport, setSelectedAirport] = useState("");
  const { state } = useLocation();
  const { bestFlights, otherFlights } = state || {};

  useEffect(() => {
    sectionRefs.current.forEach((section, index) => {
      gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    });
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        
        <div  className="mb-[2vw]" ref={(el) => (sectionRefs.current[0] = el)}>
          <FlightSearchNavbar />
        </div>

        
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* <div ref={(el) => (sectionRefs.current[1] = el)} className="w-full lg:w-64">
            <AirlinesFilter
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              duration={duration}
              setDuration={setDuration}
              selectedAirport={selectedAirport}
              setSelectedAirport={setSelectedAirport}
            />
          </div> */}

          
          <div className="mt-[2vw] flex-1 px-20" ref={(el) => (sectionRefs.current[2] = el)}>
            <FlightList
              bestFlights={bestFlights}
              otherFlights={otherFlights}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FlightDetails;