import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

import arrow from "../public/imgs/aaa.svg";

function LinkTab() {
    const router = useRouter()




    return (
        <div className="link_linktab container">
            <Link href="/who-we-are/about-us">
                <button
                    // key={'about-us'}
                    className={router.pathname == "/who-we-are/about-us" ? "active" : ""}
                    // id={"1"}
                    // onClick={handleClick}
                >
                    About us
                    <Image src={arrow} alt="Image" />
                </button>
            </Link>

            <Link href="/who-we-are/firm-history">
                <button
                    // key={'firm-history'}
                    className={router.pathname == "/who-we-are/firm-history" ? "active" : ""}
                    // id={"2"}
                    // onClick={handleClick}
                >
                    FIRM HISTORY
                    <Image src={arrow} alt="Image" />
                </button>
            </Link>

            <Link href="/who-we-are/our-approach">
                <button
                    // key={'our-approach'}
                    className={router.pathname == "/who-we-are/our-approach" ? "active" : ""}

                    // id={"3"}
                    // onClick={handleClick}
                >
                    OUR APPROACH
                    <Image src={arrow} alt="Image" />

                </button>
            </Link>

            <Link href="/who-we-are/our-team">
                <button
                    // key={'our-team'}
                    className={router.pathname == "/who-we-are/our-team" ? "active" : ""}

                    // id={"4"}
                    // onClick={handleClick}
                >
                    oUR TEAM
                    <Image src={arrow} alt="Image" />
                </button>
            </Link>

            <Link href="/who-we-are/careers">
                <button
                    // key={5}
                    className={router.pathname == "/who-we-are/careers" ? "active" : ""}
                    // id={"5"}
                    // onClick={handleClick}
                >
                    CAREERS
                    <Image src={arrow} alt="Image" />
                </button>
            </Link>

        </div>
    )
}

export default LinkTab