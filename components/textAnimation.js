import React,{useRef,useEffect}  from "react";
// import { SplitText, LineWrapper, WordWrapper, LetterWrapper } from "@cyriacbr/react-split-text/dist"

import gsap from "gsap";
import SplitType from 'split-type'
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useState } from "react";
// import "splitting/dist/splitting.css";
// import "splitting/dist/splitting-cells.css";
// import Splitting from "splitting";

const TextAnimation =({data})=>{
    gsap.registerPlugin(ScrollTrigger)
    const [first, setFirst]= useState(false)
    const {paragraph, author} = data
    const heightAni = useRef()
    const text = useRef(0);
    const triggerContainer=useRef();
    useEffect(()=>{
        var elementText = text.current;
        var height = document.querySelector('.wrapper-text').clientHeight
        console.log(height)
        if (height != 0){
          heightAni.current= height

          document.querySelector('.ani-text').style.height = heightAni.current+'px'
        }



      
        var timeline = gsap.timeline({
            scrollTrigger:{
                trigger: triggerContainer.current,
                start:'top 50%',
                end:"bottom 50%",
                // markers:true
           
                
            },
            
            
        });

        timeline.fromTo('.ani-text .wrapper-text',{
          height:0,
          opacity:0,
        },{
          height: heightAni.current,
          opacity:1,
          duration:0.8,
          ease:'power2.out'
        })
 
      

        timeline.scrollTrigger.refresh()
      return ()=>{
  
        timeline.scrollTrigger.kill();
        timeline.kill();
        // document.querySelector('.ani-text').style.height = heightAni+'px'
        // lines.revert()
      }
       
    })

    useEffect(()=>{
        setFirst(true)
    },[])

    return(
        <>
             <div className="text-animation" ref={triggerContainer}>
        <div className="container">
          <div className="text-container">
          <div className="text" >
         
            <div className="ani-text" ref={text}>
              <div className="wrapper-text">

                {paragraph}
              </div>
            </div>

            {/* <div className="clonetext">
              {paragraph}
            </div> */}
         
            </div>
          <div className="author">{author}</div>
          </div>
        </div>
      </div>
        </>
    )
}

export default TextAnimation