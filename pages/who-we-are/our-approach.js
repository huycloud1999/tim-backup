import Image from "next/image";
import React from "react";
import imgOutTeam from "../../public/imgs/img_outTeam.png";
import market from "../../public/imgs/market.png";
import Rectangle from "../../public/imgs/Rectangle.png";
import Rectangle1 from "../../public/imgs/Rectangle1.png";
import Rectangle2 from "../../public/imgs/Rectangle2.png";
import download from "../../public/imgs/Download.png";
import { HeroSection } from "../../components/layouts/HeroSection";
import {
  getOurApproach,
  getResearchMaterials,
} from "../../store/action/who-we-are/ourApproach";
import LinkTab from "../../components/LinkTab";
import MetaSEO from "../../components/Seo";
import generateMetaData from "../api/generateMetaData";

function OurApproach(props) {
  const {
    disciplinedBottomUpApproach,
    monitoringTheMarket,
    researchmaterialstitle,
  } = props.OurApproach;
  // console.log(props.ResearchMaterial.documents);
  // console.log(props.OurApproach);

  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <HeroSection
        title={props.HeroSection.title}
        //  image={props.HeroSection.image.sourceUrl}
      />
      <div className="container ourApproach">
        <div className="description_approach">
          <div className="description_approach_title">
            <h3>{disciplinedBottomUpApproach.title}</h3>
          </div>
          <div
            className="description_approach_text"
            dangerouslySetInnerHTML={{
              __html: disciplinedBottomUpApproach.description,
            }}
          ></div>
        </div>
      </div>
      <div className="approach_market">
        <div className="image___market">
          <Image src={market} alt="Image" className="image_approach_market" />
        </div>
        <div className="container">
          <div className="approach_market_content">
            <h3>{monitoringTheMarket.title}</h3>
            <p className="approach__market_des">
              {monitoringTheMarket.description}
            </p>
            <div className="approach_market_content_block container">
              {monitoringTheMarket.cardItem &&
                monitoringTheMarket.cardItem.map((value, index) => {
                  return (
                    <div className="approach_market__block" key={index}>
                      <p>{value.content}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="approach_materials container">
        <h3>{researchmaterialstitle.title}</h3>
        <div className="approach_materials_content">
          {
            props.ResearchMaterial.documents.nodes.map((value, id) => {
              return (
                <div className="approach_materials_content_document" key={id}>

                  <div className="materials_content_document_image">
                    <div className="image-container">
                      <Image src={value.file.file.sourceUrl ||value.file.image.sourceUrl} alt="Rectangle" layout="fill" className="image-item" />
                    </div>
                    <div className="hover_approach_materials">
                      <a download={value.name} target='_blank' href={value.file.file.mediaItemUrl} className="hover_approach_button">
                        <Image src={download} alt="image" />
                        <p>Click here download</p>
                      </a>
                    </div>
                  </div>
                  <div className="materials_content_document_text">
                    <p>{value.file.name}</p>
                  </div>

                </div>
              )
            })
          }
        </div>

      
      </div> */}
    </>
  );
}

export default OurApproach;

export async function getStaticProps({ params }) {
  const [allData, res1] = await Promise.all([getOurApproach()]);
  const [allResearchMaterials, res2] = await Promise.all([
    getResearchMaterials("", 0, 4, "research-materials"),
  ]);
  const dataSEO = await generateMetaData("/our-approach/");

  return {
    props: {
      // AllNew: allNew?.data?.data?.posts?.nodes || null,
      HeroSection: allData.data.data.page.HeroSection,
      OurApproach: allData.data.data.page.ourApproach,
      ResearchMaterial: allResearchMaterials.data.data,
      dataSEO: dataSEO.json,
      slug: "who-we-are/our-approach",
    },
    revalidate: 60,
  };
}
