import React, { useRef } from "react";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export const Countdown = ({isSymbol, startNumber, number, children,className }) => {
  gsap.registerPlugin(ScrollTrigger)
  const countRef = useRef()
  const isPlay = useRef(false)
  useEffect(() => {
   

  });

  const handleStart=(isVisible,start)=>{
    if (isVisible && !isPlay.current ){
      isPlay.current = true;
      start()
    }
  }
 
  
  
  return (
    <div className={"countdown " + className}  ref={countRef}>
      <CountUp start={startNumber || 0} end={number} duration={0.5} separator="">
        {({ countUpRef, start }) => (
          <VisibilitySensor onChange={(isVisible)=> handleStart(isVisible,start)}  delayedCall  >
            <div className="countdown-area">
              <div className="number" ref={countUpRef}></div>
              {isSymbol && <div className="symbol">+</div>}
            </div>
          </VisibilitySensor>
        )}
      </CountUp>

      <div className="additional-info" dangerouslySetInnerHTML={{__html: children}}></div>
    </div>
  );
};
