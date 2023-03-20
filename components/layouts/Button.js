import React from "react";
import Image from "next/image";

import arrow from "../../public/imgs/Arrow_footer.png"
import whitearrow from "../../public/imgs/white arrow.svg"
import Link from "next/link";


export const Button = ({ className, text, link }) => {
    return (
        <Link href={link || '/who-we-are/about-us'}>
            <a className={className + " button-global"}> {text || "Find out more"} <Image src={className.split(' ').includes("blueButton") ? whitearrow : arrow} alt='navigation_button' /></a>
        </Link>

    )
}