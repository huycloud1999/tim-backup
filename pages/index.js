import { Player } from "video-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Video } from "../components/Video";
import Head from "next/head";
import { Banner } from "../components/layouts/Banner/Banner";
import Footer from "../components/layouts/footer";
// import { Header } from "../components/layouts/Header/MainHeader";
import styles from "../styles/Home.module.css";
import { PostGrid } from "../components/layouts/Post Grid/PostGrid";
import { Countdown } from "../components/layouts/Countdown";
import { Button } from "../components/layouts/Button";
import monthlyImage from "../public/imgs/monthly.png";
// import { TextAnimation } from "../components/textAnimation";
import { getFilterNews, getAllCat, getAllNews } from "../store/action/new";
import { getAllHomeInfo } from "../store/action/home";
import Script from "next/script";
import dynamic from "next/dynamic";
import SplitType from "split-type";
import Cookies from "../components/layouts/Cookies";
import home_image1 from "../public/imgs/home_image1.png";
import Link from "next/link";

import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { NextSeo } from "next-seo";
import generateMetaData from "./api/generateMetaData";
import MetaSEO from "../components/Seo";
// import TextAnimation from "../components/textAnimation";

const TextAnimation = dynamic(() => import("../components/textAnimation"), {
  ssr: false,
});

export default function Home(props) {
  const {
    monthlyHighlight,
    whatWeDo: WhatWeDo,
    textAnimationSection: TextAnimationSection,
    countdownSection: CountDown,
    videoSection: VideoSection,
  } = props.AllInfo;

  // useEffect(()=>{
  //   var paragraphs = document.querySelectorAll('.what-we-do .description .text p');
  //   var gradientText = document.querySelector('.gradient-text');
  //   var tl = gsap.timeline({
  //     scrollTrigger:{
  //       trigger: '.what-we-do',
  //       // markers:true,
  //       start:'top 50%',
  //       end:'bottom 50%'
  //     }
  //   })

  //   tl.fromTo([paragraphs,gradientText],{
  //     opacity:0,
  //     // stagger:0.1
  //   },{
  //     opacity:1,
  //     stagger:0.3,
  //     duration:1
  //   })

  //   return ()=>{
  //     tl.scrollTrigger.kill()
  //     tl.kill()
  //   }

  // })
  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <div>
        <Banner data={props.Banner.bannerItem} />

        <div className="what-we-do">
          <div className="container">
            <div className="heading">What we do</div>

            <div className="description">
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: WhatWeDo.blackText }}
              ></div>
              <div className="gradient-text">{WhatWeDo.gradientText}</div>
            </div>
          </div>
        </div>

        <Video
          poster={VideoSection.poster.sourceUrl}
          url={VideoSection.video.url}
        />

        {/* <TextAnimation data={TextAnimationSection} /> */}

        <div className="about-us-countdown">
          <div className="container">
            <div className="info-area">
              <div
                className="heading"
                dangerouslySetInnerHTML={{ __html: CountDown.sectionTitle }}
              ></div>
              <div className="description">
                <div className="text">{CountDown.sectionDescription}</div>

                <Button
                  className={"hideOnMobile"}
                  link="/who-we-are/our-team"
                />
              </div>
            </div>

            <div className="countdown-grid">
              {CountDown.countdown.countdownItem.map((value, index) => {
                var isVisible = value.symbolVisible == "visible" ? true : false;
                return (
                  <Countdown
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
            <Button
              className={"hideOnDesktop hideOnTablet"}
              link="/who-we-are/our-team"
            />
          </div>
        </div>

        <div className="monthly-highlights">
          <div className="container">
            <div className="info">
              <div
                className="heading"
                dangerouslySetInnerHTML={{ __html: props.HightLights.title }}
              ></div>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: props.HightLights.excerpt }}
              ></div>
              <Button
                className="blueButton"
                link={`/${props.HightLights.slug}`}
              />
            </div>
            <div className="image-container image">
              <Image
                src={props.HightLights.featuredImage.node.mediaItemUrl}
                alt="monthly-hightlight-image"
                layout="fill"
                className="image-item"
              />
            </div>
          </div>
        </div>
        <PostGrid data={props.AllNew} />
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [allNew, res1] = await Promise.all([getAllNews(3)]);
  const [allHomeInfo, res2] = await Promise.all([getAllHomeInfo()]);

  const dataSEO = await generateMetaData("/turicum-investment-management-ag/");

  return {
    props: {
      AllNew: allNew?.data?.data?.posts?.nodes || null,
      AllInfo: allHomeInfo.data.data.page.Home,
      Banner: allHomeInfo.data.data.page.bannerSection,
      HightLights: allHomeInfo.data.data.posts.edges[0].node,
      dataSEO: dataSEO?.json,
      slug: "",
    },
    revalidate: 60,
  };
}
