import { HeroSection } from "../../components/layouts/HeroSection";
import { SmallTitle } from "../../components/layouts/SmallTitle";
import defaultImage from "../../public/imgs/default.png";
import mandateIcon from "../../public/imgs/mandateicon.svg";
import otherproduct from "../../public/imgs/otherproduct.svg";
import otherproductImage from "../../public/imgs/otherproduct.png";
import downloadbutton from "../../public/imgs/downloadbutton.svg";
import asset1 from "../../public/imgs/asset1.png";
import asset2 from "../../public/imgs/asset2.png";
import border from "../../public/imgs/border.png";
import delegate from "../../public/imgs/delegate.svg";
import realTime from "../../public/imgs/realTime.svg";
import personalization from "../../public/imgs/personalization.svg";
import access from "../../public/imgs/access.svg";
import Link from "next/link";

import management from "../../public/imgs/management.svg";
import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
import { getSolutions } from "../../store/action/product/solutions";

import arrow_down from "../../public/imgs/arrow_down.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NextSeo } from "next-seo";
import generateMetaData from "../api/generateMetaData";
import MetaSEO from "../../components/Seo";

function Solutions(props) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(ScrollToPlugin);

  const {
    documents,
    heroSection,
    firstSection,
    mandates,
    assetManagement,
    otherProducts,
  } = props;

  // console.log(assetManagement.table.body);

  useEffect(() => {
    // Create a media condition that targets viewports at least 768px wide
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    // Check if the media query is true
    if (mediaQuery.matches) {
      document.querySelector(
        ".property-solution"
      ).style.gridTemplateColumns = `repeat(${
        document.querySelectorAll(".property-solution li").length
      },1fr)`;
    }
  });

  const handleClick = (id) => {
    gsap.to(window, {
      scrollTo: {
        y: `#${id}`,
        offsetY: 500,
      },
    });
  };

  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <div>
        <HeroSection
          title={heroSection.title}
          //  image={heroSection.image.mediaItemUrl}
        />

        <SmallTitle className={"solution-hero-text"}>
          {firstSection.description}
        </SmallTitle>

        <Tabs defaultIndex={1}>
          <TabList className="property-solution container">
            {firstSection.property.map((value, index) => {
              return (
                <>
                  {value.visibility == "visible" && (
                    <Tab key={index}>
                      <div
                        style={{ cursor: "pointer" }}
                        className="property-item"
                        key={index}
                        onClick={() => {
                          handleClick(value.link);
                        }}
                      >
                        <div className="image-container">
                          <Image
                            layout="fill"
                            src={value.icon.mediaItemUrl}
                            className="image-item"
                            alt="img"
                          />
                        </div>
                        <div className="title">{value.title}</div>
                      </div>
                    </Tab>
                  )}
                </>
              );
            })}
          </TabList>
          <TabPanel>
            <div id="mandates">
              <SmallTitle
                className={"solution-mandate-text"}
                title={"Active Advisory"}
              >
                {mandates.description}
              </SmallTitle>
            </div>
            <div className="mandate-property container">
              {mandates.propertyItem.map((value, index) => {
                return (
                  <div className="mandate-property-item" key={index}>
                    <div className="image-container">
                      <Image
                        layout="fill"
                        src={value.icon.mediaItemUrl}
                        className="image-item"
                        alt="img"
                      />
                    </div>
                    <div className="content-wrapper">
                      <div className="title">{value.title}</div>
                      <div className="description">{value.description}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="asset-management container" id="asset">
              <div className="title">{assetManagement.title}</div>

              <div className="asset-wrapper">
                {/* <div className="asset-item">
                  <div className="image-container animation-item">
                    <Image layout="fill" src={assetManagement.image1.mediaItemUrl} className="image-item" alt="img" />
                  </div>

                  <div className="text-container animation-item">
                    <div className="title-heading"><span className="color1">Prim</span><span className="color2">algo</span></div>
                    <div className="text-area" dangerouslySetInnerHTML={{ __html: assetManagement.textArea1 }}>


                    </div>

                  </div>

                </div> */}
                <div className="asset-item">
                  <div className="text-container animation-item">
                    <div className="title-heading">TIMVT</div>
                    <div
                      className="text-area"
                      dangerouslySetInnerHTML={{
                        __html: assetManagement.textArea2,
                      }}
                    ></div>
                    <Link href={"/products/factsheets"}>
                      <div className="button-download factsheet">
                        <div className="text">{documents.title1}</div>
                        <div className="icon">
                          <Image src={arrow_down} alt="downloadfile" />
                        </div>
                      </div>
                    </Link>
                    {/* <a download='Factsheet' target={'_blank'} rel="noreferrer" href={documents.file1.mediaItemUrl} className="button-download factsheet">
                                        <div className="text">{documents.title1}</div>
                                        <div className="icon"><Image src={arrow_down} alt="downloadfile" /></div>
                                    </a> */}

                    {/* <div className="border image-container">
                                        <Image layout="fill" src={border} className="image-item"  />
                                    </div> */}
                  </div>

                  <div className="image-container image-container-table  animation-item">
                    {/* <Image layout="fill" src={assetManagement.image2.mediaItemUrl} className="image-item" alt="img" /> */}
                    <table className="table-Solutions">
                      <thead>
                        <tr>
                          {assetManagement.table.header.map((value, id) => {
                            return <th key={id}>{value}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {assetManagement.table.body &&
                          assetManagement.table.body.map((item, id) => {
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
                </div>
              </div>

              {/* <div className="grid-button">
                        <div className="container">
                            <a download='Factsheet' target={'_blank'} rel="noreferrer" href={documents.file1.mediaItemUrl} className="button-download factsheet">
                            <div className="text">{documents.title1}</div>
                            <div className="icon"><Image src={downloadbutton} alt="downloadfile" /></div>
                            </a>
                            <a download='Termsheet' target={'_blank'} rel="noreferrer" href={documents.file2.mediaItemUrl} className="button-download termsheet">
                            <div className="text">{documents.title2}</div>
                            <div className="icon"><Image src={downloadbutton} alt="downloadfile" /></div>
                            </a>
                        </div>
                    </div> */}
            </div>
          </TabPanel>
          {firstSection.property[2].visibility == "visible" && (
            <TabPanel>
              <div className="other-product-wrapper" id="other">
                <SmallTitle
                  className={"solution-other-prouct"}
                  title={otherProducts.title}
                >
                  {otherProducts.description}
                </SmallTitle>

                <div className="image-other-product image-container container">
                  <Image
                    layout="fill"
                    src={otherProducts.image.mediaItemUrl}
                    className="image-item"
                    alt="img"
                  />
                </div>
              </div>
            </TabPanel>
          )}
        </Tabs>
      </div>
    </>
  );
}

export default Solutions;

export async function getStaticProps({ params }) {
  const [results, res] = await Promise.all([getSolutions()]);
  const dataSEO = await generateMetaData("/solutions/");
  return {
    props: {
      heroSection: results.data.data.page.HeroSection,
      firstSection: results.data.data.page.Solutions.firstSection,
      mandates: results.data.data.page.Solutions.mandates,
      assetManagement: results.data.data.page.Solutions.assetManagement,
      otherProducts: results.data.data.page.Solutions.otherProducts,
      documents: results.data.data.page.Solutions.documents,
      dataSEO: dataSEO?.json,
      slug: "products",
    },
    revalidate: 1,
  };
}
