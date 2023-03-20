import React from "react";
import Image from "next/image";
import defaultImage from "../../public/imgs/default.png"

export const HeroSection=({title, image, className})=>{
    return (
    
    <div className={"hero-section "+ className}>
        <div className="container">

            <div className="title big-title">{title || "Default Title"}</div>
            {/* <div className="image image-container">
                <Image src={image || defaultImage} alt="hero_image" layout="fill" className='image-item' />
            </div> */}
            

        </div>
    </div>
    )
}