import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import image1 from "@/assets/images/image1.png"
import image2 from "@/assets/images/image2.png"

const marqueeData = Array(12).fill(image1);
const marqueeData2 = Array(12).fill(image2);

const Home = () => {
  gsap.registerPlugin(ScrollTrigger);

  const slider = useRef(null);
  const firstSlider = useRef(null);
  const secondSlider = useRef(null);
  let xPercentLeft = 0;
  let xPercentRight = 100;
  let direction = -1;
  let speed = 0.1;
  let animationFrameId;

  const [scroll, setScroll] = useState(0);
  const timeoutRef = useRef(null);

  const handleScroll = () => {
    setScroll(window.scrollY);
    speed = 0.5;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      speed = 0.1;
    }, 100);
  };

  const animateSliders = () => {
    xPercentLeft = xPercentLeft <= -100 ? 0 : xPercentLeft + speed * direction;
    xPercentRight = xPercentRight <= 0 ? 100 : xPercentRight + speed * direction;

    gsap.set(firstSlider.current, { xPercent: xPercentLeft });
    gsap.set(secondSlider.current, { xPercent: -xPercentRight });

    animationFrameId = requestAnimationFrame(animateSliders);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    animateSliders();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div className="h-[50vh]"></div>
      <div className="w-100 bg-black overflow-hidden relative">
        <div className="relative w-100" ref={slider}>
          <div ref={firstSlider} className="flex my-10">
            {marqueeData.map((src, index) => (
              <div className="flex items-center gap-3 px-10" key={index}>
                <div className="relative w-56 h-36">
                  <Image className="object-contain opacity-50 transition-opacity duration-150 hover:opacity-100 cursor-pointer" src={src} alt="ars technica logo" fill />
                </div>
              </div>
            ))}
          </div>
          <div ref={secondSlider} className="flex my-10">
            {marqueeData2.map((src, index) => (
              <div className="flex items-center gap-3 px-10" key={index}>
                <div className="relative w-56 h-36">
                  <Image className="object-contain opacity-50 transition-opacity duration-150 hover:opacity-100 cursor-pointer" src={src} alt="Glamour logo" fill />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
