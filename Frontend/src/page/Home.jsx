import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Loader from "../components/Home/Loader";
import Navbar from "../components/Navbar/Navbar";
import HeroSection from "../components/Home/HeroSection";
import TopPlaces from "../components/Home/TopPlaces";
import ValuesWeProvide from "../components/Home/ValuesWeProvide";
import LetGetToKnow from "../components/Home/LetGetToKnow";
import HomeTicketBookingBox from "../components/HomeTicketBookingBox";
import Animation from "../components/Home/Animation";

const Home = () => {
  document.title = "EliteWings.in";
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, filter: "blur(8px)", scale: 0 },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          scale: 1,
          ease: "power2.out",
        }
      );
    }
  }, [loading]);

  return (
    <>
      {loading ? (
        <Loader onLoaded={() => setLoading(false)} />
      ) : (
        <>
          <Navbar />
          <div ref={contentRef} className="transition-all">
            <section className="px-[30px]">
              <HeroSection />
              <ValuesWeProvide />
              <HomeTicketBookingBox />
              <TopPlaces />
              <Animation />
              <LetGetToKnow />
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
