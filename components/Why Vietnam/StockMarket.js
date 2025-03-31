import React from "react";
import { SmallTitle } from "../layouts/SmallTitle";
import Image from "next/image";
import vietnam from "../../public/imgs/vietnam-map.png";
import vietnamincome from "../../public/imgs/vietnamincome.png";
import gdp from "../../public/imgs/gdp.png";
import chart1 from "../../public/imgs/chart1.png";
import { TradeChart } from "../Charts/TradeChart";
import vietnamCircle from "../../public/imgs/vnWhy.png";
import { IconBoxTag } from "../layouts/iconBoxTag";

import shield from "../../public/imgs/stability.svg";
import cost from "../../public/imgs/cost.svg";
import trade from "../../public/imgs/trade.svg";
import integration from "../../public/imgs/integration.svg";
import { ChartImage } from "../layouts/ChartImage";

import growth from "../../public/imgs/growth.png";
import populationChart from "../../public/imgs/population-chart.png";

import dynamic from "next/dynamic";
import social from "../../public/imgs/social.svg";
import internet from "../../public/imgs/internet.svg";
import human from "../../public/imgs/human.svg";
import chartinvest from "../../public/imgs/chartinvest.png";
import chartmerchandise from "../../public/imgs/chartmerchandise.png";
import sharechart from "../../public/imgs/sharechart.png";
import exportchart from "../../public/imgs/exportchart.png";
import manufacturingchart from "../../public/imgs/manufacturingchart.png";
import whyMobile from "../../public/imgs/whyMobile.png";

// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
// import Map from "../../components/Map.js";
const Map = dynamic(() => import("../../components/Map.js"), { ssr: false });

export const StockMarket = ({ data }) => {
  const {
    risingFromTheAshesStock,
    toOneOfTheMostGlobalizedPopulousCountriesStock: populousCountries,
    andTheRoarOfANewTigerStock: tigerSection,
  } = data;
  const { map: mapData } = populousCountries;
  // console.log(populousCountries.tradeChart)

  return (
    <>
      <SmallTitle
        title={risingFromTheAshesStock.title}
        className={"rising-from-ashes"}
      >
        {risingFromTheAshesStock.description}
      </SmallTitle>
      <SmallTitle
        title={populousCountries.title}
        className={"rising-from-ashes"}
      >
        {populousCountries.description}
      </SmallTitle>
      <SmallTitle
        title={tigerSection.title}
        className={"rising-from-ashes"}
      >
        {tigerSection.description}
      </SmallTitle>
    </>
  );
};
