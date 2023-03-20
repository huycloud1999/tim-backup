import React , {useEffect, useRef} from 'react';
import { Player } from 'video-react';
import Image from "next/image";
import iconPlay from "../public/imgs/videoplay.png"
import VisibilitySensor from "react-visibility-sensor";
// import "video-react/dist/video-react.css";


export const Video = ({poster, url})=>{
    const player=useRef();
    const triggerButton = useRef();
    const isPlay=false

    useEffect(()=>{
        
    });
    const pauseVideo =()=>{
        player.current.pause();
            triggerButton.current.style.opacity=1
            var video = document.querySelector('.video-area video');
            video.removeAttribute('controls');
            isPlay =!isPlay
    }

    const playVideo=()=>{
        player.current.play();
            var video = document.querySelector('.video-area video');
            video.setAttribute('controls','true')
            triggerButton.current.style.opacity=0;
            isPlay =!isPlay
    }
    const handleVisible = (isVisible)=>{
    
        if (isVisible){
            // playVideo()
            // isPlay =!isPlay
        } else {
            if (isPlay){

                pauseVideo()
            }
        }
    }
    const handleClick = ()=>{
        
        if (isPlay){
           pauseVideo()
        } else{
            
           playVideo()
        }
        // isPlay =!isPlay
       
    }
    const videoOnClick = ()=>{
     
    }

    return (
    <div className="video-area container" onClick={handleClick}>

            <div className="button-trigger-play"  ref={triggerButton}>
                <Image src={iconPlay} alt="play_icon"/>
            </div>
            <VisibilitySensor onChange={handleVisible} partialVisibility={true} offset={{top:300,bottom:300}}  delayedCall  >

            
            <Player
            playsInline
            poster={poster}
            src={url}
            loop={true}
            height={750}
            ref={player}
            controls={true}
            muted={true}
      
            />
            </VisibilitySensor>
   
    </div>
    )
}