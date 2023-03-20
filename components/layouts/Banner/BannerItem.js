import React from "react";
import Link from "next/link";
import Image from "next/image";



import borderContainer from "../../../public/imgs/border-container.png"
import arrow from "../../../public/imgs/Arrow_footer.png"
import symbol from "../../../public/imgs/symbol.png"
import landscape from "../../../public/imgs/landscape.png"



export const BannerItem = ({dataItem}) => {


    return (
        <div className="slider-item">
            <div className="container">
                <div className="content-box">
                    <div className="content-detail">
                        <div className="title" dangerouslySetInnerHTML={{__html:dataItem.title}}></div>
                        <div className="description" dangerouslySetInnerHTML={{__html:dataItem.description}}></div>
                    </div>
                    <div className="border-container">
                        <Image src={borderContainer} alt="" />
                    </div>
                    
                    <div className="symbol">
                        <Image src={symbol} alt="" />
                    </div>
                    <Link href={dataItem.link.url} >

                    <a className="arrow">
                        <Image src={arrow} alt="" />
                    </a>
                    </Link>

                </div>
            </div>
            <div className="image-container image">
                <Image src={dataItem.image.mediaItemUrl} alt="" layout="fill" className="image-item" unoptimized={true}/>
            </div>
        </div>
        
    );
}