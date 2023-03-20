import React from "react";
import Image from "next/image";


export const ChartImage = ({ image, title, className,source }) => {

    return (
        <>
            <div className={"chart-image-item " + className}>
            {
                source && <div className="source">{source}</div>
            }
                <div className="item">
                    <div className="text">{title}</div>
                    <div className="image-container image">
                        <Image src={image} layout="fill" className="image-item" alt='image_chart' />
                    </div>
                </div>
            </div>
        </>
    )
}