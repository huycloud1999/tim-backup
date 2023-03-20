import React from "react";
import Image from "next/image";
import Link from "next/link";
import downloadbutton from "../../public/imgs/downloadbutton.svg"
import { PerformanceChart } from "../../components/Charts/PerformanceChart";
// import { SectorChart } from "../../components/Charts/SectorChart";
import Footer from "../../components/layouts/footer";
import { Header } from "../../components/layouts/Header/MainHeader";
import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import backto from '../../public/imgs/backto.svg'
import Vector_mobile2 from "../../public/imgs/Vector_mobile2.svg";
import TIM_vecto from "../../public/imgs/TIM_vecto.svg";

import dynamic from "next/dynamic";
const SectorChart = dynamic(() => import("../../components/Charts/SectorChart"), { ssr: false });
import { getTIMVT } from "../../store/action/product/TIMVT";
import { getAllCertificateOfering } from "../../store/action/product/pageCertificate-offering";


export default function CertOfferingTIMVT(props) {
  const downloadHandle = () => { }
  const { certificateOffering: cf } = props.certificateOfering;

  const { HeroSection: herosection, TIMVietnam, WhyInvest, PerformanceChart: PerformanceChartData, sectorAllocation, files } = props;

  return (
    <>

      <HeroSection title={herosection.title} 
      // image={herosection.image.sourceUrl} 

      />

      <div className="main-page-current">

        <SmallTitle title={TIMVietnam.title} className={"certoffering"}>{TIMVietnam.description}</SmallTitle>
        <div className="CertificateOffering CertificateOffering_andTIMVT container">
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
        </div>
        <SmallTitle title={WhyInvest.title} className={"why-invest"}>{WhyInvest.description}</SmallTitle>
        <div className="grid-button">
          <div className="container">
            <a download='Factsheet' target={'_blank'} rel="noreferrer" href={files.factsheet.downloadFile.mediaItemUrl} className="button-download factsheet" onClick={downloadHandle}>
              <div className="text">Factsheet</div>
              <div className="icon"><Image src={downloadbutton} alt="downloadfile" /></div>
            </a>
            <a download='Termsheet' target={'_blank'} rel="noreferrer" href={files.termsheet.downloadFile.mediaItemUrl} className="button-download termsheet">
              <div className="text">Term sheet</div>
              <div className="icon"><Image src={downloadbutton} alt="downloadfile" /></div>
            </a>
          </div>
        </div>
        <div className="performance-chart">
          <SmallTitle title="Performance since inception" />
          <div className="chart-area">
            <div className="container">
              <div id="performance-chart">
                <PerformanceChart data={PerformanceChartData} />
              </div>
            </div>
          </div>
        </div>

        <div className="sector-allocation-chart">
          <SmallTitle title="Sector allocation" />
          <div className="chart-area">
            <div className="container">
              <div id="sector-allocation-chart">
                <SectorChart data={sectorAllocation} />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="back_new back_new_TIMVT container">
          <Link href="/product/certificate-offering">
            <a >
              <div className="back_new_TIMVT_content">
                <div className="chevrons_icon chevrons_icon_TIMVT">
                  <Image alt="chevrons" src={backto} />
                </div>
                <div>
                  <p>Back to Certificate offering</p>
                </div>
              </div>
            </a>
          </Link>
        </div> */}




      </div>


    </>
  )
}


export async function getStaticProps({ params }) {

  const [TIMVT, res] = await Promise.all([getTIMVT()]);
  const [resNew1, res1] = await Promise.all([getAllCertificateOfering()]);


  return {
    props: {
      certificateOfering: resNew1.data.data.page,
      HeroSection: TIMVT.data.data.page.HeroSection,
      TIMVietnam: TIMVT.data.data.page.timVt.timVietnam,
      WhyInvest: TIMVT.data.data.page.timVt.whyInvest,
      PerformanceChart: TIMVT.data.data.page.timVt.performanceSinceInception,
      sectorAllocation: TIMVT.data.data.page.timVt.sectorAllocation,
      files: TIMVT.data.data.page.timVt.buttonDownloadFileGroup
    },
    revalidate: 1,
  };
}
