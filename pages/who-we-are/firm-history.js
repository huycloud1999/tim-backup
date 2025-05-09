import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import imgOutTeam from "../../public/imgs/img_outTeam.png";

import panelImage1 from "../../public/imgs/histoty.png";
import gsap from "gsap";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Footer from "../../components/layouts/footer";
import { Header } from "../../components/layouts/Header/MainHeader";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import { getFirmHistoryInfo } from "../../store/action/what-we-are/firm-history";
import LinkTab from "../../components/LinkTab";
import MetaSEO from "../../components/Seo";
import generateMetaData from "../api/generateMetaData";

export default function FirmHistory(props) {
  gsap.registerPlugin(ScrollToPlugin);
  const tabs = useRef([]);
  const currentSelect = useRef(0);
  const [tabIndex, setTabIndex] = useState(0);
  const myInterval = useRef(setTimeout(function () {}, 0));

  const { FirmHistory: firmhistory, HeroSection: herosection } = props.AllInfo;
  // console.log(herosection.title);

  const data = firmhistory.timeline.map((value, index) => {
    return {
      id: index,
      year: value?.year,
      description: value?.description,
      img: value?.image?.sourceUrl,
    };
  });

  const tabList = useRef("");
  const display = useRef(5);

  useEffect(() => {
    var mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      // Then trigger an alert
      display.current = 3;
    }
    var length = document.querySelectorAll(`.tab_firm li`).length;
    var greenLine = document.querySelector(".line");

    greenLine.style.width = (length / display.current) * 100 + "%";

    tabList.current = tabs.current[0].parentNode.parentNode;
    onHandleSelect(0);
  }, []);

  useEffect(() => {
    myInterval.current = setTimeout(myTimer, 5000);
    // onHandleSelect(currentSelect.current)

    return () => {
      clearTimeout(myInterval.current);
    };
  });

  function stopSlide() {
    clearTimeout(myInterval.current);
  }
  function continueSlide() {
    clearTimeout(myInterval.current);
    myInterval.current = setTimeout(myTimer, 2500);
  }

  function myTimer() {
    if (currentSelect.current < data.length - 1) {
      currentSelect.current += 1;
      onHandleSelect(currentSelect.current);
    } else {
      currentSelect.current = 0;
      onHandleSelect(currentSelect.current);
    }
  }

  function onHandleSelect(index) {
    currentSelect.current = index;
    var length = document.querySelectorAll(`.tab_firm li`).length;
    var elementToScroll = document.querySelector(
      `.tab_firm li:nth-child(${index + 1})`
    );

    gsap.to(tabList.current, {
      duration: 1,
      scrollTo: {
        x: elementToScroll,
        offsetX: (tabList.current.clientWidth / display.current) * 1,
      },
      ease: "power2.out",
    });
    var greenLine = document.querySelector(".progress");
    var boxGreen = document.querySelector(".box_history");

    greenLine.style.width =
      ((index + 1) / length) * 100 -
      100 / display.current / 2 / (length / display.current) +
      "%";
    boxGreen.style.left =
      ((index + 1) / length) * 100 -
      100 / display.current / 2 / (length / display.current) +
      "%";

    setTabIndex(index);
  }

  return (
    <>
      {/* <MetaSEO dataSEO={props?.dataSEO} slug={props.slug} /> */}
      <HeroSection
        title={herosection.title}
        // image={herosection.image.sourceUrl}
      />
      <SmallTitle
        title={firmhistory.subTextSection.title}
        className={"certoffering firmHistory_title"}
      >
        {firmhistory.subTextSection.description}
      </SmallTitle>
      <div className="firm_history">
        <div className="container">
          <div className="firm_history_text"></div>
          <div
            className="firm_history_tab"
            onMouseOver={stopSlide}
            onMouseOut={continueSlide}
          >
            <Tabs
              focusTabOnClick={false}
              className="tab_firm"
              selectedIndex={tabIndex}
              onSelect={onHandleSelect}
            >
              <TabList className="tabList_firm">
                {data.map((item, i) => (
                  <Tab key={i}>
                    <div
                      className="text"
                      ref={(el) => {
                        tabs.current.push(el);
                      }}
                    >
                      {item?.year}
                    </div>
                  </Tab>
                ))}

                <div className="line">
                  <div className="progress"></div>
                  <div className="box_history"></div>
                </div>
              </TabList>

              {data.map((value, index) => {
                return (
                  <TabPanel key={index}>
                    <div className="tab">
                      <div className="tab_panel">
                        <div className="image-container panel_img ">
                          <Image
                            src={value?.img}
                            alt="image model"
                            layout="fill"
                            className="image-item"
                          />
                        </div>
                        <div className="panel_text">
                          <h3>{value?.year}</h3>
                          <p>{value?.description}</p>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                );
              })}
            </Tabs>
          </div>
          {/* <LinkTab /> */}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [allFirmHistoryInfo, res1] = await Promise.all([getFirmHistoryInfo()]);
  const dataSEO = await generateMetaData("/firm-history/");
  return {
    props: {
      AllInfo: allFirmHistoryInfo.data.data.page,
      dataSEO: JSON.parse(JSON.stringify(dataSEO?.json || null)),
      slug: "who-we-are/firm-history",
    },
    revalidate: 60,
  };
}
