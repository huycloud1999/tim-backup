import React from "react";
import { ChartImage } from "../layouts/ChartImage";
import { SmallTitle } from "../layouts/SmallTitle";
import Image from "next/image";
import why_img2 from '../../public/imgs/why_img2.png'


import vnindex from '../../public/imgs/vnindex.png'
import { SecurityChart } from "../Charts/SecurityChart";
import { CorporateBondChart } from "../Charts/CorporateBondChart";
export const CapitalMarket = ({ data: CapitalMarketData }) => {

    const { aFrontierClassificationForAnEmergingMarket: emergingMarket } = CapitalMarketData;

    return (
        <>

            <SmallTitle className={'frontier'} title={emergingMarket.title}>{emergingMarket.description}</SmallTitle>

            <ChartImage image={CapitalMarketData.vnIndexChart.image.sourceUrl} title={CapitalMarketData.vnIndexChart.title} className={'vnindex'} source={'Bloomberg'} />

           {/* <div className="securityChart border-blue">
                <div className="text">{CapitalMarketData.totalSecuritiesAcountsChart.caption}</div>
                <div className="the-chart">
                    <SecurityChart data={CapitalMarketData.totalSecuritiesAcountsChart} />

                </div>
                <div className="source">MOF</div>
            </div>

           

             <div className="securityChart Capitalization  border-blue">
                <div className="text">{CapitalMarketData.corporateBondMarketChart.caption}</div>
                <div className="the-chart">

                <CorporateBondChart data={CapitalMarketData.corporateBondMarketChart}/>
                <div className="legend">
                        <div className="legend-item">
                            <span className="label"></span>
                            <div className="title">{CapitalMarketData.corporateBondMarketChart.header[1]}</div>
                        </div>
                        <div className="legend-item">
                            <span className="label"></span>
                            <div className="title">{CapitalMarketData.corporateBondMarketChart.header[2]}</div>
                        </div>
                    </div>
                </div>
                <div className="source">MOF</div>
            </div> 
             */}

        </>
    )
}
