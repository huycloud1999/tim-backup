import React from "react";
import Image from "next/image";
// import icon from "../../public/imgs/stability.svg"

export const IconBoxTag=({icon, title,content,border,color})=>{
    return (
        <div className="icon-box-tag" style={{
            borderColor:border
        }}>
            <div className="image-container icon">
                <Image src={icon} className='image-item' layout="fill" alt='icon_alt'/>
            </div>
            <div className="text-box">
                <div className="title" style={{
                    color: color
                }}>{title}</div>
                <div className="content-box" dangerouslySetInnerHTML={{__html:content}}></div>
            </div>
        </div>
    )
}