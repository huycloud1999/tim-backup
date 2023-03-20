import React from "react";
import { SmallTitle } from "../layouts/SmallTitle";
import Image from "next/image";
import vietnam from "../../public/imgs/vietnam-map.png"
import vietnamincome from "../../public/imgs/vietnamincome.png"
import gdp from "../../public/imgs/gdp.png"
import chart1 from "../../public/imgs/chart1.png"
import { TradeChart } from "../Charts/TradeChart";
import vietnamCircle from "../../public/imgs/vnWhy.png"
import { IconBoxTag } from "../layouts/iconBoxTag";


import shield from "../../public/imgs/stability.svg"
import cost from "../../public/imgs/cost.svg"
import trade from "../../public/imgs/trade.svg"
import integration from "../../public/imgs/integration.svg"
import { ChartImage } from "../layouts/ChartImage";

import growth from "../../public/imgs/growth.png"
import populationChart from "../../public/imgs/population-chart.png"

import dynamic from 'next/dynamic'
import social from "../../public/imgs/social.svg"
import internet from "../../public/imgs/internet.svg"
import human from "../../public/imgs/human.svg"
import chartinvest from "../../public/imgs/chartinvest.png"
import chartmerchandise from "../../public/imgs/chartmerchandise.png"
import sharechart from "../../public/imgs/sharechart.png"
import exportchart from "../../public/imgs/exportchart.png"
import manufacturingchart from "../../public/imgs/manufacturingchart.png"
import whyMobile from "../../public/imgs/whyMobile.png"


// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import Map from "../../components/Map.js";
const Map = dynamic(() => import("../../components/Map.js"), { ssr: false });

export const MacroEconomy = ({ data }) => {

  const { risingFromTheAshes, toOneOfTheMostGlobalizedPopulousCountries: populousCountries, andTheRoarOfANewTiger: tigerSection } = data
  const { map: mapData } = populousCountries
  // console.log(populousCountries.tradeChart)

  return (
    <>

      <SmallTitle title={risingFromTheAshes.title} className={'rising-from-ashes'}>
        {risingFromTheAshes.description}


      </SmallTitle>



      <div className="major-city">
        {risingFromTheAshes.subText}
      </div>
      <div className="major-city-charts">
        <div className="chart-area-major-city">
          {/* <Image src={vietnam} alt="chart-area-major-city"/> */}
          <div className="map">
            <Map data={mapData} />

          </div>
        </div>
        <div className="image-chart vietnamese-income image-container">
          <div className="text">{risingFromTheAshes.chartArea.chartItem[0].title}</div>
          <Image src={risingFromTheAshes.chartArea.chartItem[0].chartImage.sourceUrl} layout="fill" className="image-item" alt="vietnamese-income" />
          <div className="source">GSO and World Bank</div>
        </div>
        <div className="image-chart GDP image-container">
          <div className="text">{risingFromTheAshes.chartArea.chartItem[1].title}</div>
          <Image src={risingFromTheAshes.chartArea.chartItem[1].chartImage.sourceUrl} layout="fill" className="image-item" alt="GDP" />
          <div className="source">GSO</div>
        </div>
      </div>



      <div className="populous-countries">
        <SmallTitle className="text__Populous_Countries" title={populousCountries.title}>{populousCountries.description}</SmallTitle>

        <div className="images-area">
          {populousCountries.chartArea.chartItem.map((value, index) => {
            var visible = value.visible == 'true' ? true : false;
            // console.log(value)
            return (
              <>
                {visible && <ChartImage key={index} image={value.chartImage.sourceUrl} title={value.title} source={value.source} />}

              </>

            )
          })}

        </div>

        <div className="trade-chart">
          <div className="text">{populousCountries.tradeChart.caption}</div>
          <div className="chart-trade">
            <TradeChart data={populousCountries.tradeChart} />
          </div>
          <div className="legend">
            <div className="legend-item">
              <span className="label"></span>
              <div className="title">{populousCountries.tradeChart.header[1]}</div>
            </div>
            <div className="legend-item">
              <span className="label"></span>
              <div className="title">{populousCountries.tradeChart.header[2]}</div>
            </div>
          </div>
          <div className="source">GSO</div>
        </div>

        <SmallTitle title={tigerSection.title}>{tigerSection.description}</SmallTitle>

        <div className="favorable-destination">
          <div className="source">TIM</div>
          <div className="text small-title ">{tigerSection.vietnamCircleChart.title}</div>

          <div className="content-area">
            <div className="image">
              <Image src={vietnamCircle} alt="vietnamCircle" />
            </div>
            {
              tigerSection.vietnamCircleChart.iconTagBoxItem.map((value, index) => {
                return (

                  <IconBoxTag key={index} icon={value.icon.sourceUrl} title={value.title} content={value.content} border={value.borderColor} color={value.textColor} />
                )
              })

            }


          </div>
        </div>
        <div className="growth-engine border-blue">
          <div className="source">GSO, Grant Thornton</div>
          <div className="image-container growth-image growth-image-PC">
            <Image src={tigerSection.vietNamGrowthEngine.fullCoverImage.sourceUrl} alt='growth' className="image-item" layout="fill" />
          </div>

          <div className="image-container growth-image growth-image-Mobile">
            <Image src={tigerSection.vietNamGrowthEngine.fullCoverImageMobile.sourceUrl} alt='growth' className="image-item" layout="fill" />
          </div>

          <div className="population">
            <div className="column-1">
              <div className="text">
                Population of Vietnam
              </div>
              <div className="image-container image">
                <Image src={tigerSection.vietNamGrowthEngine.populationChart.image.sourceUrl} className="image-item" alt='populationChart' layout="fill" />
              </div>
            </div>

            <div className="column-2">
              {
                tigerSection.vietNamGrowthEngine.statistics.map((value, index) => {
                  return (
                    <div key={index} className="icon-box">
                      <div className="image-container icon">
                        <Image src={value.icon.sourceUrl} alt='human' layout="fill" className="image-item" />
                      </div>
                      <div className="title">{value.title}</div>
                    </div>

                  )
                })
              }

            </div>
          </div>

        </div>
        <div className="grid-2">

          {
            tigerSection.chartArea.map((value, index) => {
              return (
                <ChartImage key={index} image={value.image.sourceUrl} title={value.title} source={value.source} />

              )
            })
          }


        </div>



      </div>

    </>
  )
}