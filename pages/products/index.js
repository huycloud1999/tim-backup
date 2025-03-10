"use client";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import arrow_down from "../../public/imgs/arrow_down.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NextSeo } from "next-seo";
import generateMetaData from "../api/generateMetaData";
import MetaSEO from "../../components/Seo";
import FactSheets from "./factsheets";

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

  const splitTableData = (tableData, maxRows) => {
    return [tableData.slice(0, maxRows), tableData.slice(maxRows)];
  };

  const [firstTable, secondTable] = splitTableData(
    assetManagement.table.body,
    7
  );

  const TableComponent = ({ data, header }) => (
    <table className="table-Solutions">
      <thead>
        <tr>
          {header.map((value, id) => (
            <th key={id}>{value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, id) => (
          <tr key={id}>
            {row.map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  //chart

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Dữ liệu từ assetManagement.tableChart
  const tableData = assetManagement.tableChart.body;
  const years = assetManagement.tableChart.header;
  const tableData2 = mandates.tableChart.body;
  const years2 = mandates.tableChart.header;
  const chartData = [];
  const chartData2 = [];
  tableData.forEach((yearData) => {
    const year = yearData[0]; // Cột đầu tiên là năm

    // Kiểm tra nếu year hợp lệ (tránh các giá trị lỗi như "0.92023", "2.22024")
    if (!/^[0-9]{4}$/.test(year)) return;

    months.forEach((month, index) => {
      const value = parseFloat(yearData[index + 1]); // Lấy giá trị của từng tháng

      if (!isNaN(value)) {
        chartData.push({
          date: `${month} ${year}`,
          year: year,
          value: value,
        });
      }
    });
  });
  tableData2.forEach((yearData2, rowIndex) => {
    const year = String(yearData2[0]).trim(); // Chuyển về string và loại bỏ khoảng trắng

    if (!/^[0-9]{4}$/.test(year)) {
      console.warn(
        `Bỏ qua dòng ${rowIndex} do giá trị year không hợp lệ:`,
        year
      );
      return;
    }

    months.forEach((month, index) => {
      const value = parseFloat(yearData2[index + 1]);

      if (!isNaN(value)) {
        chartData2.push({
          date: `${month} ${year}`,
          year: year,
          value: value,
        });
      } else {
        console.warn(
          `Bỏ qua giá trị không hợp lệ tại ${month} ${year}:`,
          yearData2[index + 1]
        );
      }
    });
  });
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
              className="asset-management"
            >
              <LineChart width={1200} height={400} data={chartData2}>
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis
                  dataKey="date" // Dùng "date" để vẽ tất cả các tháng
                  tickFormatter={(value) => {
                    // Chỉ hiển thị năm khi là tháng 1 (Jan) hoặc điểm đầu tiên của năm
                    const [month, year] = value.split(" ");
                    return month === "Jan" ? year : "";
                  }}
                  interval={0} // Hiển thị tất cả các tick, nhưng chỉ nhãn năm ở Jan
                  label={{
                    value: "Time",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Value",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    props.payload.date,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0b2677"
                  strokeWidth={3}
                  dot={false} // Không hiển thị điểm ở mỗi tháng để tránh lộn xộn
                  connectNulls={true} // Nối qua các giá trị null
                />
              </LineChart>
            </div>
            <div className="asset-management table_chart">
              <TableComponent
                data={mandates?.tableChart.body}
                header={assetManagement.tableChart.header}
              />
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
                    {/* <div className="title-heading">TIMVT</div> */}
                    <div
                      className="text-area"
                      dangerouslySetInnerHTML={{
                        __html: assetManagement.textArea2,
                      }}
                    ></div>
                    {/* <Link href={"/products/factsheets"}>
                      aaaa
                    </Link> */}
                    {/* <a download='Factsheet' target={'_blank'} rel="noreferrer" href={documents.file1.mediaItemUrl} className="button-download factsheet">
                                        <div className="text">{documents.title1}</div>
                                        <div className="icon"><Image src={arrow_down} alt="downloadfile" /></div>
                                    </a> */}

                    {/* <div className="border image-container">
                                        <Image layout="fill" src={border} className="image-item"  />
                                    </div> */}
                  </div>

                  <div className="image-container image-container-table animation-item">
                    <TableComponent
                      data={firstTable}
                      header={assetManagement.table.header}
                    />
                    {secondTable.length > 0 && (
                      <TableComponent
                        data={secondTable}
                        header={assetManagement.table.header}
                      />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "50px",
                    }}
                    className="asset-management"
                  >
                    <LineChart width={1200} height={400} data={chartData}>
                      <CartesianGrid strokeDasharray="1 1" />
                      <XAxis
                        dataKey="date" // Dùng "date" để vẽ tất cả các tháng
                        tickFormatter={(value) => {
                          // Chỉ hiển thị năm khi là tháng 1 (Jan) hoặc điểm đầu tiên của năm
                          const [month, year] = value.split(" ");
                          return month === "Jan" ? year : "";
                        }}
                        interval={0} // Hiển thị tất cả các tick, nhưng chỉ nhãn năm ở Jan
                        label={{
                          value: "Time",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Value",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value, name, props) => [
                          value,
                          props.payload.date,
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0b2677"
                        strokeWidth={3}
                        dot={false} // Không hiển thị điểm ở mỗi tháng để tránh lộn xộn
                        connectNulls={true} // Nối qua các giá trị null
                      />
                    </LineChart>
                  </div>
                  <div className="asset-management table_chart">
                    <TableComponent
                      data={assetManagement.tableChart.body}
                      header={assetManagement.tableChart.header}
                    />
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
            <FactSheets />
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
