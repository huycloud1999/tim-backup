import Image from "next/image";
import imgOutTeam from "../../public/imgs/img_outTeam.png";
import img_about from "../../public/imgs/img_about.png";
import TIM_about1 from "../../public/imgs/TIM_about1.png";
import loadText from "../../public/imgs/loadText.png";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Countdown } from "../../components/layouts/Countdown";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import Footer from "../../components/layouts/footer";
import { Header } from "../../components/layouts/Header/MainHeader";
import { getAllAboutUs } from "../../store/action/who-we-are/pageAboutUs";
import LinkTab from "../../components/LinkTab";
import MetaSEO from "../../components/Seo";
import generateMetaData from "../api/generateMetaData";

export default function About(props) {
  gsap.registerPlugin(ScrollTrigger);
  var paragraph = useRef([]);
  paragraph.current = [];

  const { aboutUs: ab } = props.about;
  // console.log(ab);

  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <HeroSection
        title={props.about.HeroSection.title}
        // image={props.about.HeroSection.image.sourceUrl}
      />
      <div className="container">
        <div
          className="about_description animation-paragraph"
          ref={(el) => {
            paragraph.current.push(el);
          }}
          dangerouslySetInnerHTML={{ __html: ab.description.content }}
        ></div>
        <input type="checkbox" id="check" />
        <label className="btn_load" htmlFor="check">
          {/* <a>Read more <Image src={loadText} alt="Image" /></a> */}
        </label>
        <div
          className="about_description_2 animation-paragraph"
          ref={(el) => {
            paragraph.current.push(el);
          }}
        >
          {ab.description.content2}
        </div>
      </div>
      <div className="about">
        <div className="about_tow">
          <div className="about_tow_content container">
            <div className="image-container about_img ">
              <Image
                src={ab.timByNumber.image.sourceUrl}
                alt="image About"
                className="about__img image-item"
                layout="fill"
              />
            </div>
            <div className="about_text">
              <div className="about_title">
                <h3>{props.about.aboutUs.timByNumber.heading}</h3>
                <p>{props.about.aboutUs.timByNumber.title}</p>
              </div>
              <div className="tim_about">
                <Image src={TIM_about1} alt="TIM" />
              </div>
              <div className="about__description">
                <ul className="about__description_text">
                  {ab.timByNumber.item.map((item, id) => (
                    <li key={id}>
                      <p>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="container about_countDown_pc">
            <div className="about-us-countdown about_countDown">
              <div className="about_countdown_grid">
                <div className="countdown-grid  about_countDown_content">
                  {ab.timByNumber.countdown.map((value, index) => {
                    var isVisible =
                      value.symbolVisible == "visible" ? true : false;
                    return (
                      <Countdown
                        className="about_countDown_text"
                        key={index}
                        isSymbol={isVisible}
                        startNumber={value.number - 10}
                        number={value.number}
                      >
                        {value.description}
                      </Countdown>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">{/* <LinkTab /> */}</div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([getAllAboutUs()]);
  const dataSEO = await generateMetaData("/about-us/");
  return {
    props: {
      about: resNew.data.data.page,
      dataSEO: dataSEO.json,
      slug: "who-we-are/about-us",
    },
    revalidate: 60,
  };
}
