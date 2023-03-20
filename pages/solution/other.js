import Image from 'next/image'
import React from 'react'
import Footer from '../../components/layouts/footer'
import { Header } from '../../components/layouts/Header/MainHeader'
import { HeroSection } from '../../components/layouts/HeroSection'
import { SmallTitle } from '../../components/layouts/SmallTitle'
import { getAllOther } from "../../store/action/product/pageOther"
import other3 from "../../public/imgs/other1.png";
import backto from '../../public/imgs/backto.svg'

import Link from 'next/link'

export default function Otther(props) {
  // console.log(props.other);
  return (
    <>
      <HeroSection title={props.other.HeroSection.title} 
      // image={props.other.HeroSection.image.mediaItemUrl}
       />
      <div className="container">
        <h2 className="title_other">{props.other.other.titleOther.title}</h2>
        <p className="other_text">{props?.other?.other?.titleOther?.description}</p>
        <div className="other_content">
          <div className="content__o Content_damcEmergingMarket">
            <div className="image-container img_damcEmergingMarket ">
              <Image src={props?.other?.other?.titleOther?.content?.damcEmergingMarket?.img.sourceUrl} layout='fill' className="image-item" alt="Image" />
              {/* <Image alt="damcEmergingMarket" src={other3} /> */}
            </div>
            <div className="other_text">
              <h2>{props?.other?.other?.titleOther?.content?.damcEmergingMarket?.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: props?.other?.other?.titleOther?.content?.damcEmergingMarket?.content }}></div>
            </div>
          </div>

          <div className="content__o content__tow Content_timVision">
            <div className="other_text content__tow_text">
              <h2>{props?.other?.other?.titleOther?.content?.timVision?.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: props?.other?.other?.titleOther?.content?.timVision?.content }}></div>
            </div>
            <div className="image-container img_damcEmergingMarket">
              {/* <Image alt="damcEmergingMarket" src={other3} /> */}
              <Image src={props?.other?.other?.titleOther?.content?.timVision?.img.sourceUrl} layout='fill' className="image-item" alt="Image" />

            </div>
          </div>

          <div className="content__o Content_timCrypto">
            <div className="image-container img_damcEmergingMarket">
              <Image src={props?.other?.other?.titleOther?.content?.timCrypto?.img.sourceUrl} layout='fill' className="image-item" alt="Image" />
              {/* <Image alt="damcEmergingMarket" src={other3} /> */}
            </div>
            <div className="other_text">
              <h2>{props?.other?.other?.titleOther?.content?.timCrypto?.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: props?.other?.other?.titleOther?.content?.timCrypto?.content }}></div>
            </div>
          </div>
        </div>

      </div>
      <div className="back_new back_new_TIMVT container">
        <Link href="/solution/certificate-offering">
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
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([getAllOther()]);

  return {
    props: {
      other: resNew?.data?.data?.page
    },
    revalidate: 1,
  };
}