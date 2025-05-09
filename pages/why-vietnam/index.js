import React, { useEffect, useRef } from "react";
import Footer from "../../components/layouts/footer";
import { Header } from "../../components/layouts/Header/MainHeader";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import "swiper/css";
import "swiper/css/pagination";
import table from "../../public/imgs/table.png";

import banner from "../../public/imgs/background23.png";
import { MacroEconomy } from "../../components/Why Vietnam/MacroEconomy";
import { CapitalMarket } from "../../components/Why Vietnam/CapitalMarket";
import { getWhyVietNam } from "../../store/action/why-vietnam";
import { NextSeo } from "next-seo";
import MetaSEO from "../../components/Seo";
import generateMetaData from "../api/generateMetaData";
import { StockMarket } from "../../components/Why Vietnam/StockMarket";

SwiperCore.use([Autoplay, Pagination]);

export default function WhyVietnam(props) {
  const swiperRef = useRef(null);
  // console.log(swiperRef);

  gsap.registerPlugin(ScrollToPlugin);

  const {
    WhyVietnam: whyvietnam,
    HeroSection: herosection,
    MacroEconomy: macroEconomy,
    CapitalMarket: capitalMarket,
    StockMarket: stockMarket,
  } = props;
                  
  const slides = whyvietnam.slideImages || [];

  const tabs = useRef([]);
  const pagination = {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };

  const onSelectHanle = (index) => {
    const tabs = document.querySelectorAll(
      `.tab-area-why-vietnam .react-tabs .react-tabs__tab-panel`
    );
  
    if (!tabs || tabs.length === 0 || !tabs[index]) {
      console.error("Tab không tồn tại hoặc index không hợp lệ!");
      return;
    }
  
    gsap.to(window, {
      duration: 0.6,
      scrollTo: {
        y: tabs[index],
        offsetY: 140,
      },
    });
  };

  useEffect(() => {
    var divTab = document.querySelector(".react-tabs");
    var tabNavigation = document.querySelector(".react-tabs__tab-list");
    window.addEventListener("scroll", function () {
      var topOffset = divTab.offsetTop;

      if (this.scrollY > topOffset - 100) {
        if (!tabNavigation.classList.contains("sticky-bar")) {
          tabNavigation.classList.add("sticky-bar");
        }
      }

      if (this.scrollY < topOffset - 100) {
        tabNavigation.classList.remove("sticky-bar");
      }
    });

    return () => {
      window.removeEventListener("scroll", function () {});
    };
  });

  // useEffect(() => {
  //   var maxHeight = 0;
  //   var imageItems = document.querySelectorAll(".slide-image-vietnam");
  //   imageItems.forEach((element, index) => {
  //     if ((element.clientWidth / 585) * 361 > maxHeight) {
  //       maxHeight = (element.clientWidth / 585) * 361;
  //     }
  //   });

  //   document.querySelector(
  //     ".slider-area-why-vietnam .swiper-wrapper"
  //   ).style.maxHeight = `${maxHeight}px`;
  //   const mediaQuery = window.matchMedia("(max-width: 768px)");
  //   // Check if the media query is true
  //   if (mediaQuery.matches) {
  //     document.querySelector(
  //       ".slider-area-why-vietnam .swiper-wrapper"
  //     ).style.maxHeight = `${maxHeight + 20}px`;
  //   }
  // });
  console.log(stockMarket);
  return (
    <>
      {/* <MetaSEO dataSEO={props?.dataSEO} slug={props.slug} /> */}
      {/* <Header/> */}
      <HeroSection
        title={herosection.title}
        // image={herosection.image.sourceUrl}
      />

      <SmallTitle className={"why-vietnam"}>
        {whyvietnam.smallSubText}
      </SmallTitle>

      {/* <div className="slider-area-why-vietnam">
        <div
          className="container"
          onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
          onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >
          <Swiper
            ref={swiperRef}
            modules={[Pagination, Autoplay]}
            pagination={pagination}
            autoplay={{
              delay: 6000,
              disableOnInteraction: true,
            }}
            // autoHeight= {true}
            // calculateHeight={true}
            loop={true}
            speed={1500}
            spaceBetween={0}
            slidesPerView={1}
            className="bannerTable"
          >
            {slides.map((value, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="image image-container slide-image-vietnam ">
                    <Image
                      src={value.sourceUrl}
                      alt="table_image"
                      layout="fill"
                      placeholder="blur"
                      blurDataURL="https://cms.okhub.vn/wp-content/uploads/2023/01/1x1-0b25777f.png"
                      className="image-item"
                    />
                    <div className="source">
                      {index == 0 ? "GSO, TIM" : "Bloomberg, VSD, MOF, TIM"}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="swiper-pagination custom-pagination"></div>
        </div>
      </div> */}

      <div className="tab-area-why-vietnam">
        <div className="container">
          <Tabs onSelect={onSelectHanle}>
            <TabList>
              <Tab>{macroEconomy.titleTab}</Tab>
              <Tab>{capitalMarket.tabTitle}</Tab>
            </TabList>

            <TabPanel>
              <MacroEconomy data={macroEconomy} />
            </TabPanel>
            <TabPanel>
            <StockMarket data={stockMarket} />
            </TabPanel>
          </Tabs>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export async function getStaticProps({ params }) {
  const WhyVietnam = await getWhyVietNam();
  const dataSEO = await generateMetaData("/why-vietnam/");
  return {
    props: {
      HeroSection: WhyVietnam.data.data.page.HeroSection,
      WhyVietnam: WhyVietnam.data.data.page.WhyVietnam,
      CapitalMarket: WhyVietnam.data.data.page.capitalMarket,
      StockMarket: WhyVietnam.data.data.page.stockMarketDemo,
      MacroEconomy: WhyVietnam.data.data.page.macroEconomy,
      dataSEO: JSON.parse(JSON.stringify(dataSEO?.json || null)),
      slug: "why-vietnam",
    },
    revalidate: 1,
  };
}
