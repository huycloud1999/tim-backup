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
  ReferenceLine,
} from "recharts";
import arrow_down from "../../public/imgs/arrow_down.svg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { NextSeo } from "next-seo";
import generateMetaData from "../api/generateMetaData";
import MetaSEO from "../../components/Seo";
import FactSheets from "./factsheets";
import { Legend } from "chart.js";

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
  const tableData = assetManagement.tableMultiChart.body;
  const years = assetManagement.tableChart.header;
  const tableData2 = mandates.tableMultiChart.body; // Đã sửa
  const years2 = mandates.tableChart.header;
  const chartData = [];
  const chartData2 = [];

  tableData.forEach((rowData) => {
    const dateStr = rowData[0]; // e.g., "14/07/2017"

    // Validate date string
    if (!dateStr || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) return;

    // Process the three index values (TIMVT, VN Index TR, FTSE VN TR)
    const indices = [
      {
        name: "TIMVT",
        value: parseFloat(rowData[1].replace("%", "").replace(",", ".")),
      },
      {
        name: "VN Index TR",
        value: parseFloat(rowData[2].replace("%", "").replace(",", ".")),
      },
      {
        name: "FTSE VN TR",
        value: parseFloat(rowData[3].replace("%", "").replace(",", ".")),
      },
    ];

    indices.forEach((index) => {
      if (!isNaN(index.value)) {
        chartData.push({
          date: dateStr, // Keep as "DD/MM/YYYY"
          index: index.name,
          value: index.value,
        });
      }
    });
  });
  const fillMissingMonths = (rawData) => {
    const filled = {};
    const result = [];

    // Sắp xếp rawData theo ngày để đảm bảo thứ tự
    rawData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Tìm năm lớn nhất
    const years = rawData.map((d) => {
      const [, , year] = d.date.split("/").map(Number);
      return year;
    });
    const maxYear = Math.max(...years);

    // Nhóm dữ liệu theo năm và tháng
    rawData.forEach((d) => {
      const [day, month, year] = d.date.split("/").map(Number);
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!filled[year]) filled[year] = {};
      filled[year][month] = d;
    });

    // Tạo danh sách tất cả các tháng
    Object.keys(filled).forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        const monthStr = String(month).padStart(2, "0");
        const dateStr = `01/${monthStr}/${year}`;

        if (filled[year][month]) {
          result.push(filled[year][month]);
        } else {
          // Kiểm tra nếu là năm cuối cùng
          if (parseInt(year) === maxYear) {
            // Gán null cho các tháng thiếu trong năm cuối
            result.push({
              date: dateStr,
              TIMVT: null,
              "VN Index TR": null,
              "FTSE VN TR": null,
            });
          } else {
            // Lấy giá trị từ bản ghi trước cho các năm khác
            const lastEntry = result[result.length - 1];
            result.push({
              date: dateStr,
              TIMVT: lastEntry ? lastEntry.TIMVT : 0,
              "VN Index TR": lastEntry ? lastEntry["VN Index TR"] : 0,
              "FTSE VN TR": lastEntry ? lastEntry["FTSE VN TR"] : 0,
            });
          }
        }
      }
    });

    return result;
  };
  const fillMissingMonths2 = (rawData) => {
    const filled = {};
    const result = [];

    // Sắp xếp rawData theo ngày để đảm bảo thứ tự
    rawData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Tìm năm lớn nhất
    const years = rawData.map((d) => {
      const [, , year] = d.date.split("/").map(Number);
      return year;
    });
    const maxYear = Math.max(...years);

    // Nhóm dữ liệu theo năm và tháng
    rawData.forEach((d) => {
      const [day, month, year] = d.date.split("/").map(Number);
      const key = `${year}-${String(month).padStart(2, "0")}`;

      if (!filled[year]) filled[year] = {};
      filled[year][month] = d;
    });

    // Tạo danh sách tất cả các tháng
    Object.keys(filled).forEach((year) => {
      for (let month = 1; month <= 12; month++) {
        const monthStr = String(month).padStart(2, "0");
        const dateStr = `01/${monthStr}/${year}`;

        if (filled[year][month]) {
          result.push(filled[year][month]);
        } else {
          // Kiểm tra nếu là năm cuối cùng
          if (parseInt(year) === maxYear) {
            // Gán null cho các tháng thiếu trong năm cuối
            result.push({
              date: dateStr,
              TIMVT: null,
              "VN Index TR": null,
              "FTSE VN TR": null,
            });
          } else {
            // Lấy giá trị từ bản ghi trước cho các năm khác
            const lastEntry = result[result.length - 1];
            result.push({
              date: dateStr,
              "Master PortfolioT": lastEntry
                ? lastEntry["Master PortfolioT"]
                : 0,
              "VN Index TR": lastEntry ? lastEntry["VN Index TR"] : 0,
              "FTSE VN TR": lastEntry ? lastEntry["FTSE VN TR"] : 0,
            });
          }
        }
      }
    });

    return result;
  };
  const transformData = (chartData) => {
    return chartData.reduce((acc, cur) => {
      let existingEntry = acc.find((item) => item.date === cur.date);
      if (!existingEntry) {
        existingEntry = { date: cur.date };
        acc.push(existingEntry);
      }
      existingEntry[cur.index] = Number(cur.value.toFixed(1));
      return acc;
    }, []);
  };

  const transformedData = transformData(chartData);
  const lastDatesByYear = {};
  transformedData.forEach((d) => {
    const [day, month, year] = d.date.split("/").map(Number);
    const currentDate = new Date(year, month - 1, day).getTime();
    if (
      !lastDatesByYear[year] ||
      currentDate <
        new Date(lastDatesByYear[year].split("/").reverse().join("-")).getTime()
    ) {
      lastDatesByYear[year] = d.date;
    }
  });
  const yearEndDates = Object.values(lastDatesByYear);

  tableData2.forEach((rowData) => {
    const dateStr = rowData[0]; // e.g., "07/14/2017"

    // Validate date string
    if (!dateStr || !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateStr)) return;

    const [month, day, year] = dateStr.split("/").map(Number);
    const formattedDate = `${day}/${month}/${year}`; // Chuyển thành DD/MM/YYYY

    const indices = [
      {
        name: "Master PortfolioT",
        value: parseFloat(rowData[1].replace("%", "").replace(",", ".")),
      },
      {
        name: "VN Index TR",
        value: parseFloat(rowData[2].replace("%", "").replace(",", ".")),
      },
      {
        name: "FTSE VN TR",
        value: parseFloat(rowData[3].replace("%", "").replace(",", ".")),
      },
    ];

    indices.forEach((index) => {
      if (!isNaN(index.value)) {
        chartData2.push({
          date: formattedDate,
          index: index.name,
          value: index.value,
        });
      }
    });
  });

  const transformedData2 = transformData(chartData2);
  console.log(transformedData2);
  const lastDatesByYear2 = {};
  transformedData2.forEach((d) => {
    const [day, month, year] = d.date.split("/").map(Number);
    const currentDate = new Date(year, month - 1, day).getTime();
    if (
      !lastDatesByYear2[year] ||
      currentDate <
        new Date(
          lastDatesByYear2[year].split("/").reverse().join("-")
        ).getTime()
    ) {
      lastDatesByYear2[year] = d.date;
    }
  });

  const yearEndDates2 = Object.values(lastDatesByYear2);
  return (
    <>
      {/* <MetaSEO dataSEO={props.dataSEO} slug={props.slug} /> */}
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
            <div className="asset-management">
              <div className="container">
                <div className="title-sub">Performance since inception</div>
                <div className="list-description">
                  <div>
                    <div className="line line-tim"></div>
                    <div className="text">Master Portfolio</div>
                  </div>
                  <div>
                    <div className="line line-vnindex"></div>
                    <div className="text">VN-Index TR</div>
                  </div>
                  <div>
                    <div className="line line-FTSE"></div>
                    <div className="text">FTSE Vietnam TR</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
                className="asset-management active-adv"
              >
                <LineChart
                  width={1300}
                  height={650}
                  data={transformedData2}
                  margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                >
                  <XAxis
                    dataKey="date"
                    ticks={yearEndDates2}
                    interval={0}
                    tickFormatter={(value) => {
                      if (!value || !yearEndDates2.includes(value)) return "";
                      const [, , year] = value.split("/").map(Number);
                      return year;
                    }}
                    axisLine={false}
                    tickLine={true}
                    tick={{ dy: 15, fontSize: 16, fill: "#000" }}
                  />
                  <YAxis
                    domain={[-100, 1000]}
                    ticks={[-100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
                    tickFormatter={(value) => `${value}`}
                    label={{
                      value: "%",
                      angle: -90,
                      position: "insideLeft",
                      offset: 10,
                      style: { textAnchor: "middle" },
                    }}
                  />
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Master PortfolioT"
                    name="Master Portfolio"
                    stroke="#000080"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="VN Index TR"
                    name="VN-Index TR"
                    stroke="#B5B4A9"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="FTSE VN TR"
                    name="FTSE Vietnam TR"
                    stroke="#2F6CE9"
                    strokeWidth={2}
                    dot={false}
                  />
                  <ReferenceLine y={0} stroke="black" strokeWidth={1} />
                </LineChart>
              </div>

              <div className="container">
                <div className="title-sub">MONTHLY PERFORMANCE</div>
                <div className="asset-management table_chart">
                  <TableComponent
                    data={mandates?.tableChart.body}
                    header={[...assetManagement.tableChart.header]} // Thêm "YTD" vào cuối header
                  />
                </div>
              </div>
              <div className="container">
                <h2 className="title-sub">Disclaimer</h2>
                <div
                  className="disclaimer"
                  dangerouslySetInnerHTML={{ __html: mandates.disclaimer }}
                ></div>
              </div>
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
                    {/* <div className="title-heading">Master Portfolio</div> */}
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
                  <div className="title-sub">Performance since inception</div>
                  <div className="list-description">
                    <div>
                      <div className="line line-tim"></div>
                      <div className="text">TIMVT</div>
                    </div>
                    <div>
                      <div className="line line-vnindex"></div>
                      <div className="text">VN-Index TR</div>
                    </div>
                    <div>
                      <div className="line line-FTSE"></div>
                      <div className="text">FTSE Vietnam TR</div>
                    </div>
                  </div>
                  {/* assets */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                    className="asset-management"
                  >
                    <LineChart width={1200} height={420} data={transformedData}>
                      <XAxis
                        dataKey="date"
                        type="category"
                        ticks={yearEndDates}
                        tickFormatter={(value) => {
                          if (!value || !yearEndDates.includes(value))
                            return "";
                          const [, , year] = value.split("/").map(Number);
                          return year;
                        }}
                        interval={0}
                        minTickGap={20}
                        axisLine={false} // Ẩn đường trục X
                        tickLine={true} // Ẩn dấu tick
                        tick={{ dy: 15, fontSize: 16, fill: "#000" }} // Dịch nhãn xuống dưới
                      />
                      <YAxis
                        domain={[-30, 150]}
                        ticks={[-30, 0, 30, 60, 90, 120, 150]}
                        tickFormatter={(value) => `${value}`}
                        label={{
                          value: "%",
                          angle: 0,
                          position: "insideLeft",
                        }}
                      />
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="TIMVT"
                        name="TIMVT"
                        stroke="#000080"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="VN Index TR"
                        name="VN-Index TR"
                        stroke="#B5B4A9"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="FTSE VN TR"
                        name="FTSE Vietnam TR"
                        stroke="#2F6CE9"
                        strokeWidth={2}
                        dot={false}
                      />
                      <ReferenceLine y={0} stroke="black" strokeWidth={1} />
                    </LineChart>
                  </div>
                  <div className="title-sub">MONTHLY PERFORMANCE</div>
                  <div className="asset-management table_chart">
                    <TableComponent
                      data={assetManagement.tableChart.body}
                      header={assetManagement.tableChart.header}
                    />
                  </div>
                  <h2 className="title-sub">Disclaimer</h2>
                  <div
                    className="disclaimer"
                    dangerouslySetInnerHTML={{
                      __html: assetManagement?.disclaimer || "",
                    }}
                  ></div>
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
