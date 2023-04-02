import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Modal from 'react-modal';
// import {getAllHeader} from "../../../store/action/header"

export const Dropdown = ({ data, functionOnClick }) => {



  const dropdownMenu = useRef([]);
  const dropdownMain = useRef()
  useEffect(() => {

    var tlShow = gsap.timeline();
    gsap.to(dropdownMenu.current, {
      height: '100vh',
      paddingTop: 185,
      duration: 0
    })
    tlShow.from(dropdownMenu.current, {
      height: 0,
      paddingTop: 0,
      duration: 0.7,
      ease: "power2.out",
      stagger: -0.1
    });
    tlShow.play();




    return () => {
      tlShow.reverse()
    }

  })
  return (
    <div className="dropdown-container" ref={dropdownMain}>
      <div className="dropdown-menu" ref={(el) => { dropdownMenu.current.push(el) }}>
        <div className="container">
          <div className="navigation-area">
            <div className="navogation-links">
              <div className="menu-item">
                <div className="parent-link">
                  <Link href="/">
                    <a onClick={functionOnClick}>

                      {data.menu.home}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="menu-item">
                <div className="parent-link">


                  {data.menu.whoWeAre.titleWhoWeAre}

                  <ul className="sub-menu">
                    <li className="sub-menu-item">
                      <Link href="/who-we-are/about-us" >
                        <a className="sub-itemlink" onClick={functionOnClick}>
                          {data.menu.whoWeAre.whoWeAre.aboutUs}
                        </a>
                      </Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link href="/who-we-are/firm-history">
                        <a className="sub-itemlink" onClick={functionOnClick}>
                          {data.menu.whoWeAre.whoWeAre.firmHistory}
                        </a>
                      </Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link href="/who-we-are/our-approach">
                        <a className="sub-itemlink" onClick={functionOnClick}>
                          {data.menu.whoWeAre.whoWeAre.ourApproach}
                        </a>
                      </Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link href="/who-we-are/our-team">
                        <a className="sub-itemlink" onClick={functionOnClick}>
                          {data.menu.whoWeAre.whoWeAre.ourTeam}
                        </a>
                      </Link>
                    </li>
                    <li className="sub-menu-item">
                      <Link href="/who-we-are/careers">
                        <a className="sub-itemlink" onClick={functionOnClick}>
                          {data.menu.whoWeAre.whoWeAre.careers}
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-item">
                <div className="parent-link">
                  <Link href="/why-vietnam">
                    <a onClick={functionOnClick}>
                      {data.menu.whyVietnam}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="menu-item">
                <div className="parent-link">
                  <Link href="/products">
                    <a onClick={functionOnClick}>
                      {data.menu.product.titleProduct}
                    </a>
                  </Link>


                  {/* <ul className="sub-menu">
                    <div className="sub-menu-item">
                     

                      <div className="sub_child_menu sub_child_menu_remove">
                        <div className="child_sub-menu-item child___sub">
                          <Link href="/products/TIMVT">
                            <a className="sub-itemlink" onClick={functionOnClick}>
                              {data.menu.product.product.certificateOffering.timvt}
                            </a>
                          </Link>
                        </div>
                        <div className="sub-menu-item child___sub">
                          <Link href="/products/mandate">
                            <a className="sub-itemlink" onClick={functionOnClick}>
                              {data.menu.product.product.mandates}
                            </a>
                          </Link>
                        </div>
                        <div className="child_sub-menu-item child___sub">
                          <Link href="/products/other">
                            <a className="sub-itemlink" onClick={functionOnClick}>
                              {data.menu.product.product.certificateOffering.other}
                            </a>
                          </Link>
                        </div>

                      </div>
                    </div>

                  </ul> */}
                </div>
              </div>
              <div className="menu-item">
                <div className="parent-link">
                  <Link href="/news">
                    <a onClick={functionOnClick}>
                      {data.menu.newInsights}
                    </a>
                  </Link>
                </div>
              </div>
              <div className="menu-item">
                <div className="parent-link">
                  <Link href="/get-in-touch">
                    <a onClick={functionOnClick}>
                      {data.menu.getInTouch}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="info">
            <div className="info-1 info-item">
              <Link href="https://www.google.com/maps/place/Blegistrasse+5,+6340+Baar,+Th%E1%BB%A5y+S%C4%A9/@47.2160405,8.5697026,17z/data=!3m1!4b1!4m5!3m4!1s0x479aa95ccf9b4bdd:0x9ddd1530b535c88b!8m2!3d47.2160405!4d8.5718913?hl=vi-VN" target="_blank" >
                <a>
                  {data.contactInfoHeader.information}
                </a>
              </Link>
            </div>
            <div className="info-1 info-item">
              <Link href="tel:+41 41 449 61 61">
                <a>
                  {data.contactInfoHeader.sdt}
                </a>
              </Link>
            </div>
            <div className="info-1 info-item">
              <Link href="mailto:info@timvest.ch">
                <a>
                  {data.contactInfoHeader.email}
                </a>
              </Link>
            </div>
          </div>
          <div className="copyright">
            {data.investmentManagement}
          </div>
        </div>
      </div>
      <div className="fake-background" ref={(el) => { dropdownMenu.current.push(el) }}></div>
    </div>
  );
};


