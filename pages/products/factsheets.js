import { SmallTitle } from "../../components/layouts/SmallTitle";
import { HeroSection } from "../../components/layouts/HeroSection";
import {
  getResearchMaterials,
  getFactSheets,
  getLatestFactSheets,
  getFilterReportByYear,
} from "../../store/action/who-we-are/ourApproach";
import Image from "next/image";
import Link from "next/link";
import download from "../../public/imgs/download.svg";
import down from "../../public/imgs/down-load-more.svg";
import { useEffect, useState, useRef } from "react";
import { DocumentLoop } from "../../components/DocumentLoop";
import { DocumentListLoop } from "../../components/DocumentListLoop";

function FactSheets(props) {
  const [docData, setDocData] = useState(props.Reports || []);
  const [latest, setLatest] = useState(props.latest || null);
  const [yearList, setYearList] = useState(props.yearList || []);
  const [isLoading, setLoading] = useState(false);
  const [activeYear, setYear] = useState(1);

  const number = useRef(9);

  // Client-side data fetching if props are not provided
  useEffect(() => {
    async function fetchInitialData() {
      if (!props.Reports || !props.latest || !props.yearList) {
        setLoading(true);
        try {
          // Fetch latest factsheet
          const latestResponse = await getLatestFactSheets("factsheets");
          const fetchedLatest =
            latestResponse?.data?.data?.documents?.edges[0]?.node;
          setLatest(fetchedLatest);

          // Fetch all reports for year list
          const allReportsResponse = await getFilterReportByYear("null");
          const allReports =
            allReportsResponse?.data?.data?.documents?.nodes || [];
          const fetchedYearList = allReports
            .map((value) => new Date(value.date).getFullYear())
            .filter((value, index, arr) => arr.indexOf(value) === index)
            .sort((a, b) => b - a);
          setYearList(fetchedYearList);

          // Fetch initial reports
          let filterReportsResponse = await getFilterReportByYear(
            fetchedYearList[0]
          );
          let fetchedReports =
            filterReportsResponse?.data?.data?.documents?.nodes || [];
          fetchedReports = fetchedReports.filter(
            (value) => value.id !== fetchedLatest?.id
          );

          if (fetchedReports.length === 0 && fetchedYearList.length > 1) {
            filterReportsResponse = await getFilterReportByYear(
              fetchedYearList[1]
            );
            fetchedReports =
              filterReportsResponse?.data?.data?.documents?.nodes || [];
            fetchedYearList.shift();
            setYearList(fetchedYearList);
          }
          setDocData(fetchedReports);
        } catch (error) {
          console.error("Error fetching initial data:", error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchInitialData();
  }, [props.Reports, props.latest, props.yearList]);

  // Logic for rendering month and year of latest factsheet
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(latest?.date);
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Pagination logic
  const reportPagination = [];
  for (let index = 0; index < yearList?.length; index++) {
    const active = index === activeYear - 1 ? " active-page" : "";
    if (
      index > 3 &&
      index < yearList.length - 3 &&
      index !== activeYear - 1 &&
      (index < activeYear - 3 || index > activeYear + 2)
    ) {
      reportPagination.push("...");
    } else {
      reportPagination.push(
        <div
          key={index}
          className={"pagination-item" + active}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            handleYearPagination(index);
          }}
        >
          {yearList[index]}
        </div>
      );
    }
  }

  // Handle year pagination and fetch data
  async function SearchResultsByYear(index) {
    setLoading(true);
    try {
      const results = await getFilterReportByYear(yearList[index]);
      setDocData(results?.data?.data?.documents?.nodes || []);
      setYear(index + 1);
      // scrollTo(0, 700);
    } catch (error) {
      console.error("Error fetching reports by year:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleYearPagination = (index) => {
    SearchResultsByYear(index);
  };

  return (
    <div>
      {/* <HeroSection title={"FACTSHEETs"} className="factsheets-page" /> */}
      <div className="container page-wrapper factsheets-page">
        {/* {latest && (
          <div className="latest results-area">
            <div className="title-heading">
              {"Monthly factsheet - " + monthName + " " + year}
            </div>
            <div className="approach_materials_content documents-container custom-1">
              <DocumentLoop
                file={latest?.file.file.mediaItemUrl}
                title={latest?.title || latest?.file.name}
                image={
                  latest?.file.file.sourceUrl || latest?.file.image.sourceUrl
                }
              />
            </div>
          </div>
        )} */}

        <div
          className={
            "previous results-area " + (isLoading ? "isLoadingSlow" : "")
          }
        >
          <div className="title-heading">Factsheets</div>
          <div className="pagination-navigation">{reportPagination}</div>
          <div className="custom">
            {docData?.map(
              (value, id) =>
                value.id !== latest?.id && (
                  <DocumentListLoop
                    key={id}
                    file={value.file.file.mediaItemUrl}
                    title={value.title || value.file.name}
                    image={
                      value.file.file.sourceUrl || value.file.image.sourceUrl
                    }
                    date={value.date}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Static props for page-level data fetching
export async function getStaticProps({ params }) {
  try {
    // Fetch the latest factsheet
    const latestResponse = await getLatestFactSheets("factsheets");
    const latest = latestResponse?.data?.data?.documents?.edges[0]?.node;

    // Fetch all reports to generate year list
    const allReportsResponse = await getFilterReportByYear("null");
    const allReports = allReportsResponse?.data?.data?.documents?.nodes || [];

    // Extract unique years from all reports
    const yearList = allReports
      .map((value) => new Date(value.date).getFullYear())
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .sort((a, b) => b - a);

    // Fetch filtered reports for the latest year
    let filterReportsResponse = await getFilterReportByYear(yearList[0]);
    let filterReports =
      filterReportsResponse?.data?.data?.documents?.nodes || [];

    // Exclude the latest report from the filtered list
    filterReports = filterReports.filter((value) => value.id !== latest?.id);

    // Fallback to the next year if no reports remain after filtering
    if (filterReports.length === 0 && yearList.length > 1) {
      filterReportsResponse = await getFilterReportByYear(yearList[1]);
      filterReports = filterReportsResponse?.data?.data?.documents?.nodes || [];
      yearList.shift();
    }

    return {
      props: {
        Reports: filterReports || [],
        total:
          allReportsResponse?.data?.data?.documents?.pageInfo?.offsetPagination
            ?.total || 0,
        latest: latest || null,
        yearList: yearList || [],
      },
      revalidate: 1, // Revalidate every second (adjust as needed)
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    return {
      props: {
        Reports: [],
        total: 0,
        latest: null,
        yearList: [],
      },
      revalidate: 1,
    };
  }
}

export default FactSheets;
