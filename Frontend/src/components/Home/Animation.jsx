import { useEffect } from "react";
import gsap from "gsap";
import arrowImg from "../../assets/images/arrow-br.svg";

const Animation = () => {
  useEffect(() => {
    const wheelAnimation = () => {
      window.addEventListener("wheel", (event) => {
        if (event.deltaY > 0) {
          gsap.to(".marquee", {
            x: "-180%",
            ease: "none",
            duration: 2,
            repeat: -1,
          });

          gsap.to(".marquee img", {
            rotate: 180,
            scale: 1.2,
          });
        } else {
          gsap.to(".marquee", {
            x: "0%",
            ease: "none",
            duration: 2,
            repeat: -1,
          });

          gsap.to(".marquee img", {
            rotate: 0,
          });
        }
      });
    };

    wheelAnimation();
  }, []);

  return (
    <div>
      <style>
        {`
        @font-face {
          font-family: 'fnt';
          src: url("./src/assets/Fonts/silkserif-regularitalic-webfont.ttf");
        }

        #move {
          display: flex;
          padding: 2vw 0;
          margin-bottom: 2vw;
          overflow: hidden;
        }

        .marquee {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          padding: 0 1.5vw;
          gap: 4vw;
          transform: translateX(-100%);
        }

        .marquee h1 {
          font-size: 4vw;
          font-family: fnt;
          font-weight: 300;
        }

        .marquee img {
          height: 4vw;
        }
        `}
      </style>
        <div id="move">
          {[...Array(5)].map((_, index) => (
            <div className="marquee" key={index}>
              <h1>Elite in Every Mile</h1>
              <img src={arrowImg} alt="Arrow" />
            </div>
          ))}
        </div>
    </div>
  );
};

export default Animation;
