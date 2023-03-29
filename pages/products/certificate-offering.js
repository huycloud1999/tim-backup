import React, { useEffect, useState } from "react";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import Arrow_1 from "../../public/imgs/Arrow_1.svg";
import TIM_vecto from "../../public/imgs/TIM_vecto.svg";
import Vector_mobile2 from "../../public/imgs/Vector_mobile2.svg";
import Image from "next/image";
import Link from "next/link";
import { getAllCertificateOfering } from "../../store/action/product/pageCertificate-offering";

export default function CertificateOfferingPage(props) {
  const { HeroSection: session } = props.certificateOfering;
  const { certificateOffering: cf } = props.certificateOfering;
  // console.log(cf);

  useEffect(() => {
    var mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      var divTab = document.querySelector(".CertificateOffering_table");
      var tabNavigation = document.querySelector(".CertificateOffering_Link");
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
    }
  });

  return (
    <>
      <HeroSection title={session.title} 
      // image={session.image.sourceUrl} 

      />
      <SmallTitle
        title={cf.certificate.content.title}
        className={"certoffering Certificate__Offering"}
      >
        {cf.certificate.content.des}
      </SmallTitle>
      {/* <div className="CertificateOffering container">
        <div className="CertificateOffering_TIM_VN CertificateOffering_TIM_VN_mobile container">
          <h3>{cf.certificate.contentImagePc.titleTim}</h3>
          <div className="TIM_content_mobile">
            <div className="TIM_content__mobile_1">
              <Image src={Vector_mobile2} alt="Image" />
              <div className="title_TIM_content_mobile">
                {cf.certificate.contentImageMobile.content1.map((item, id) => {
                  return (
                    <div className="description_TIM_content_mobile" key={id}>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                      <div className=" image-container TIM_content_1_Image_mobile">
                        <Image
                          src={item.img.sourceUrl}
                          alt="image"
                          layout="fill"
                          className="image-item"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="TIM_content__mobile_1">
              <Image src={Vector_mobile2} alt="Image" />
              <div className="title_TIM_content_mobile">
                {cf.certificate.contentImageMobile.content2.map((item, id) => {
                  return (
                    <div className="description_TIM_content_mobile" key={id}>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                      <div className=" image-container TIM_content_1_Image_mobile">
                        <Image
                          src={item.img.sourceUrl}
                          alt="image"
                          layout="fill"
                          className="image-item"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="TIM_content">
            <div className="TIM_content_1">
              <div className="TIM_content_Image">
                <Image src={TIM_vecto} alt="iamge" />
              </div>
              <div className="title_TIM_content">
                {cf.certificate.contentImagePc.content.map((item, id) => {
                  return (
                    <div className="description_TIM_content" key={id}>
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                      <div className=" image-container TIM_content_1_Image">
                        <Image
                          src={item.img.sourceUrl}
                          alt="image"
                          layout="fill"
                          className="image-item"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="CertificateOffering_table ">
        <div className="CertificateOffering_Link container">
          <Link href="/product/TIMVT">
            <div className="link_Timvt">
              <a className="CertificateOffering_image_link">
                {cf.certificate.link.name1}
                <div className="CertificateOffering_image">
                  <Image src={Arrow_1} alt="Image" />
                </div>
              </a>
            </div>
          </Link>
          <Link href="/product/other">
            <div className="link_other">
              <a className="CertificateOffering_image_link">
                {cf.certificate.link.name2}
                <div className="CertificateOffering_image">
                  <Image src={Arrow_1} alt="Image" />
                </div>
              </a>
            </div>
          </Link>
        </div>
        {/* <h3> {cf.certificate.tables.titleTables}</h3>
        <div className="mandates_tow certificateOffering_table_Tab container">
          <div className="mandates_tow_content CertificateOffering__tow_content container">
            <table className="table table_mandate table__Certificate">
              <thead>
                <tr>
                  {cf.certificate.tables.contentTable.header.map((item, id) => {
                    return <th key={id}>{item}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {cf.certificate.tables.contentTable.body.map((item, id) => {
                  return (
                    <tr key={id}>
                      {item.map((value, id) => {
                        return <td key={id}>{value}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </>
  );
}

export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([getAllCertificateOfering()]);

  return {
    props: {
      certificateOfering: resNew.data.data.page,
    },
    revalidate: 1,
  };
}
