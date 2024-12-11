import Image from "next/image";
import React, { useMemo, useState } from "react";
import imgOutTeam from "../../public/imgs/img_outTeam.png";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import { Header } from "../../components/layouts/Header/MainHeader";
import Footer from "../../components/layouts/footer";
import { getAllCareers } from "../../store/action/who-we-are/pageCareers";
import LinkTab from "../../components/LinkTab";
import { useEffect } from "react";
import generateMetaData from "../api/generateMetaData";
import MetaSEO from "../../components/Seo";

export default function Careers(props) {
  const showText = useMemo(() => {
    const careers = props?.careers?.careers?.careers;

    return {
      text1: careers?.content1?.status !== "Hidden",
      text2: careers?.content2?.status !== "Hidden",
      text3: careers?.content3?.status !== "Hidden",
      text4: careers?.contentemail.status !== "Hidden",
      text5: careers?.content4.status !== "Hidden",
    };
  }, [props.careers.careers.careers]);

  const isShowBox = useMemo(
    () => Object.values(showText).some((item) => item),
    [showText]
  );

  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <HeroSection
        title={props.careers?.HeroSection?.title}
        // image={props.careers.HeroSection.image.sourceUrl}
      />
      <div className="container">
        <div
          className="CertificateOffering_des Careers_content_description "
          dangerouslySetInnerHTML={{
            __html:
              props.careers.careers.careers.titlecareers.content +
              '<span> <a href="mailto:' +
              props.careers.careers.careers.titlecareers.mailTo +
              '">' +
              props.careers.careers.careers.titlecareers.highlightTextTitle +
              "</a></span>",
          }}
        ></div>
      </div>
      <div className="container Careers">
        <div className="Careers_content">
          <div className="careers_content_two">
            {isShowBox && (
              <div className="careers_contai">
                <div className="content_Equity">
                  <h3>
                    {showText?.text1 &&
                      props.careers?.careers?.careers?.content1?.title}
                  </h3>
                  <ul className="content_Equity_ul">
                    {showText?.text1 &&
                      props.careers.careers.careers.content1.description &&
                      props.careers.careers.careers.content1.description.map(
                        (item, id) => (
                          <div key={id}>
                            <li>{item.desContent}</li>
                          </div>
                        )
                      )}
                  </ul>
                </div>
                <div className="content_work">
                  <h3 className="content_work_title">
                    {showText?.text2 &&
                      props.careers.careers.careers.content2.title}
                  </h3>
                  <ul className="content_Equity_ul">
                    {showText?.text2 &&
                      props.careers.careers.careers.content2.description &&
                      props.careers.careers.careers.content2.description.map(
                        (item, id) => (
                          <div key={id}>
                            <li>{item.desContent}</li>
                          </div>
                        )
                      )}
                  </ul>
                </div>
                <div className="content_Investment">
                  <h3 className="content_work_title">
                    {showText?.text3 &&
                      props.careers.careers.careers.content3.title}
                  </h3>
                  <ul className="content_Equity_ul">
                    {showText?.text3 &&
                      props.careers.careers.careers.content3.description &&
                      props.careers.careers.careers.content3.description.map(
                        (item, id) => (
                          <div key={id}>
                            <li>{item.desContent}</li>
                          </div>
                        )
                      )}
                  </ul>
                </div>
                <div className="content_benefits">
                  <h3 className="content_work_title">
                    {showText?.text4 &&
                      props.careers.careers.careers.content4.title}
                  </h3>
                  <ul className="content_Equity_ul">
                    {showText?.text4 &&
                      props.careers.careers.careers.content4.description &&
                      props.careers.careers.careers.content4.description.map(
                        (item, id) => (
                          <div key={id}>
                            <li>{item.desContent}</li>
                          </div>
                        )
                      )}
                  </ul>
                </div>
                <div className="content_bottom">
                  {showText?.text5 &&
                    props.careers.careers.careers.contentemail.conntent}
                  <span>
                    {showText?.text5 &&
                      props.careers.careers.careers.contentemail
                        .highlightTextContent}
                  </span>
                  <p>{props.careers.careers.careers.note}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <LinkTab /> */}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const [resNew, res] = await Promise.all([getAllCareers()]);
  const dataSEO = await generateMetaData("/careers/");
  return {
    props: {
      careers: resNew.data.data.page,
      dataSEO: dataSEO.json,
      slug: "who-we-are/careers",
    },
    revalidate: 60,
  };
}
