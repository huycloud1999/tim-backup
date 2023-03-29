import React, { useEffect, useState } from "react";
import { Header } from "../../components/layouts/Header/MainHeader";
import Footer from "../../components/layouts/footer";
import { HeroSection } from "../../components/layouts/HeroSection";
import Frame from "../../public/imgs/Frame.png";
import iconmandate from "../../public/imgs/iconmandate.png";
import iconmandate1 from "../../public/imgs/iconmandate1.png";
import iconmandate2 from "../../public/imgs/iconmandate2.png";
import iconmandate3 from "../../public/imgs/iconmandate3.png";
import iconmandate4 from "../../public/imgs/iconmandate4.png";
import { getAllMandates } from "../../store/action/product/pageMandates"

import manDate from "../../public/imgs/mandate.png";
import img1 from "../../public/imgs/default.png";
import Image from "next/image";

export default function Mandate(props) {
  // console.log(props.mandate.mandates);

  const [selectAccordion, setSelectAccordion] = useState(null);

  const toogleManDate = (id) => {
    if (selectAccordion === id) {
      return setSelectAccordion(null);
    }
    setSelectAccordion(id);
  };

  useEffect((id) => {
    setSelectAccordion(0)
  }, [])

  
  const { mandates: dt } = props.mandate

  return (
    <>
      {/* <Header /> */}
      <HeroSection title={props.mandate.HeroSection.title}
        // image={props.mandate.HeroSection.image.sourceUrl} 
        className="mandates"
      />
      <div className="mandates_total">
        <div className="mandates__">
          <div className="mandates__sup ">
            <div className="mandates_one container">
              <h2>{dt.titleMandates.title}</h2>
              <p>
                {dt.titleMandates.description}
              </p>
              <div className="mandates_one_content container">
                {
                  dt.information.content.map((item, id) => {
                    return (
                      <div className="mandates_one_content_block" key={id}>
                        <div className=" image-container image_mandate ">
                          <Image src={item.img.sourceUrl} alt="image" layout='fill' className="image-item" />
                        </div>
                        <div className="mandates_one_content_block_mobile">
                          <h4>{item.title} </h4>
                          <p>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className="mandates_tow container">
            <div className="mandates_tow_content container">
              <table   className="table table_mandate">
                <thead>
                  <tr>
                    {
                      dt.tables.header.map((item, id) => {
                        return (
                          <th key={id}>{item}</th>
                        )
                      })
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    dt.tables.body.map((item, id) => {
                      return (
                        <tr key={id}>
                          {
                            item.map((value, id) => {
                              return (
                                <td key={id}>{value}</td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="manDate_Investment_content">
          <div className="manDate_Investment container">
            <div className="manDate_text">
              <h3>{dt.investmentProcess.title}</h3>
              {dt.investmentProcess.content.map((item, id) => {
                // console.log(item.contentDescription)
                return (
                  <div className="accordion" key={id}>
                    <div className="contentBx " onClick={() => toogleManDate(id)}>
                      <div className={selectAccordion === id ? "accordion_id show" : "accordion_id "}
                      >
                        <p>{id + 1}</p>
                      </div>
                      <div className="content__accordion">
                        <div className={selectAccordion === id ? "label showlabel" : "label "}>
                          {item.title}
                        </div>
                        <div className={selectAccordion === id ? "content show label" : "content"} dangerouslySetInnerHTML={{ __html: item.contentDescription }} >
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </div>

            <div className="manDate_image image-container">
              <Image src={dt.investmentProcess.img.sourceUrl} alt="image" layout='fill' className="image-item" />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}


export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([getAllMandates()]);

  return {
    props: {
      mandate: resNew.data.data.page
    },
    revalidate: 1,
  };
}