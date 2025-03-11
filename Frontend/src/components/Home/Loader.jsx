import { useEffect } from "react";
import gsap from "gsap";
import LoaderGif from "../../assets/images/airport.gif";
import FntLoad from "../../assets/Fonts/silkserif-regularitalic-webfont.ttf";

const Loader = ({ onLoaded }) => {
  useEffect(() => {
    const load = document.querySelector("#loader");
    setTimeout(() => {
      gsap.to("#loader", {
        top: "-100%",
        duration: 0.5,
        delay: 0.3,
        ease: "power2",
        onComplete: onLoaded,
      });
    }, 4500);

    const tl = gsap.timeline();

    tl.from("#loader #con h1", {
      opacity: 0,
      delay: 0.5,
      duration: 3,
      fontFamily: FntLoad,
      onStart: function () {
        if (window.jQuery) {
          window.jQuery("h1").textillate({ in: { effect: "fadeIn" } });
        }
      },
    });

    tl.from("#loader #con img", {
      opacity: 0,
      delay: 0.30,
      duration: 3.1,
    });

    tl.to(
      "#loader #con",
      {
        opacity: 0,
        duration: 3,
      },
      "-=0.4"
    );

    tl.from("#hero", {
      opacity: 0,
    });
  }, [onLoaded]);

  return (
    <>
      <style>
        {`
            @font-face {
                font-family: 'fnt_load';
                src: url("./assets/Fonts/silkserif-regularitalic-webfont.ttf");
            }

          #loader {
            height: 100vh;
            width: 100%;
            background-color: #fff;
            position: fixed;
            z-index: 999;
            top: 0;
            transition: all ease 0.5s;
          }

          #loader #con {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.1vw;
            margin-left: -6vw;
          }

           #loader #con h1 {
            font-size: 3vw;
            color: #111;
            font-family: FntLoad;
            filter: drop-shadow(0vw 0vw 1.5vw rgba(255, 255, 255, 0.5));
          }

          #loader #con img {
            width: 5vw;
            margin-top: -0.3vw;
            filter: drop-shadow(0vw 0vw 1.5vw rgba(255, 255, 255, 0.5));
          }
        `}
      </style>
      <div id="loader">
        <div id="con">
          <h1 className="font-[FntLoad] text-black">For Those Who Fly Above the Ordinary !!</h1>
          <img src={LoaderGif} alt="Loading" />
        </div>
      </div>
    </>
  );
};

export default Loader;
