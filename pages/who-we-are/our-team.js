import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import imgOutTeam from "../../public/imgs/img_outTeam.png";
import TeamManage from "../../components/Loops/TeamManage";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import Footer from "../../components/layouts/footer";
import { Header } from "../../components/layouts/Header/MainHeader";
import { getOurTeam } from "../../store/action/who-we-are/our-team";
import { getOurApproach } from "../../store/action/who-we-are/ourApproach";
import tim_outTeam from "../../public/imgs/Component_Img.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import ModelTIM from "../../components/Loops/ModelTIM";
import LinkTab from "../../components/LinkTab";
import vn from "../../public/imgs/vietnam.svg";
import thuysy from "../../public/imgs/zurich.svg";
import MetaSEO from "../../components/Seo";
import generateMetaData from "../api/generateMetaData";

// SwiperCore.use([Autoplay, Pagination])

export default function OurTeam(props) {
  const swiperRef = useRef(null);
  const { HeroSection: herosection, TIMJSC, TIMAG, content } = props;
  const [showModal, setShowModal] = useState(false);
  const [dataTim, setDataTim] = useState({});

  const clickModel = (data) => {
    setShowModal(true);
    setDataTim(data);
  };

  return (
    <>
      {/* <MetaSEO dataSEO={props?.dataSEO} slug={props.slug} /> */}
      <HeroSection
        title={herosection?.title}
        //  image={herosection.image.sourceUrl}
      />
      <SmallTitle className={"certoffering out_Team__image "}>
        {content}
      </SmallTitle>
      <div className="container">
        <div className="out_Team">
          <div className="out_Team_manage">
            <div className="title-imgNation">
              <p className="out_Team_manage_title out___Team_manage___title">
                {TIMAG[0].positionCategory.nodes[0].name} &nbsp;
                <Image src={thuysy} alt="img" className="imgourTeamnation" />
              </p>
            </div>
            <div className="out_Team_manage_content">
              {TIMAG.map((value, index) => {
                return (
                  <TeamManage
                    key={value.id}
                    data={value}
                    showModal={setShowModal}
                    clickModel={clickModel}
                  />
                );
              })}
            </div>
            <div className="out_Team_tim">
              <div className="title-imgNation2">
                <p className="out_Team_manage_title">
                  {TIMJSC[0].positionCategory.nodes[0].name} &nbsp;
                  <Image src={vn} alt="img" className="imgourTeamnation" />
                </p>
              </div>
              <div className="out_Team_manage_content">
                {/* {
                TIMJSC.map((value,index)=>{
                  return (
                    
                  <TeamManage key={index} data={value} />

                  )
                })
              } */}
              </div>
              <div
                onMouseEnter={() => swiperRef.current?.swiper?.autoplay.stop()}
                onMouseLeave={() => swiperRef.current?.swiper?.autoplay.start()}
              >
                <Swiper
                  ref={swiperRef}
                  loop={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 2,
                      spaceBetween: 29,
                    },
                    576: {
                      slidesPerView: 2,
                      spaceBetween: 29,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 29,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 29,
                    },
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="ourTeam"
                >
                  {TIMJSC &&
                    TIMJSC.map((value, id) => {
                      // console.log(value.id)
                      return (
                        <>
                          <SwiperSlide>
                            <TeamManage
                              key={value.id}
                              data={value}
                              showModal={setShowModal}
                              clickModel={clickModel}
                            />
                          </SwiperSlide>
                        </>
                      );
                    })}
                </Swiper>
              </div>

              {showModal && (
                <ModelTIM data={dataTim} showModal={setShowModal} />
              )}
            </div>
          </div>
        </div>

        {/* <LinkTab /> */}
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [allDataTIMAG, res] = await Promise.all([
    getOurTeam("turicum-investment-managment-ag"),
  ]);
  const [TIMJSC, res1] = await Promise.all([getOurTeam("tim-vn-jsc")]);
  const dataSEO = await generateMetaData("/our-team/");

  return {
    props: {
      TIMAG: allDataTIMAG.data.data.ourTeams.nodes,
      TIMJSC: TIMJSC.data.data.ourTeams.nodes,
      HeroSection: allDataTIMAG.data.data.page.HeroSection,
      content: allDataTIMAG.data.data.page.content,
      dataSEO: JSON.parse(JSON.stringify(dataSEO?.json || null)),
      slug: "who-we-are/our-team",
    },
    revalidate: 60,
  };
}
