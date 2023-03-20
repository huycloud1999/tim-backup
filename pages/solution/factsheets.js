import { SmallTitle } from "../../components/layouts/SmallTitle";
import { HeroSection } from '../../components/layouts/HeroSection'
import { getResearchMaterials } from "../../store/action/who-we-are/ourApproach";
import Image from "next/image";
import Link from "next/link";
import download from '../../public/imgs/download.svg'
import down from '../../public/imgs/down-load-more.svg'
import { useEffect, useState } from "react";
import { useRef } from "react";
import { DocumentLoop } from "../../components/DocumentLoop"
import { DocumentListLoop } from "../../components/DocumentListLoop"
import { getFactSheets } from "../../store/action/who-we-are/ourApproach";
import { getLatestFactSheets } from "../../store/action/who-we-are/ourApproach";
import { getFilterReportByYear } from "../../store/action/who-we-are/ourApproach";



function FactSheets(props) {


  const [docData, setDocData] = useState(props.Reports)

  const [isLoading, setLoading] = useState(false)

  const number = useRef(9)





  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  var date = new Date(props.latest.date);
  var monthName = monthNames[date.getMonth()];
  var year = date.getFullYear()
  var reportPagination = [];

  var yearList = props.yearList
  const [activeYear, setYear] = useState(1)


  // yearList = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008]
  for (let index = 0; index < yearList.length; index++) {
    var active = index == activeYear - 1 ? ' active-page' : '';
    if ((index > 3 && index < yearList.length - 3 && index != activeYear - 1) && (index < activeYear - 3 || index > activeYear + 2)) {
      reportPagination.push('...')
    } else {

      reportPagination.push(<div key={index} className={"pagination-item" + active} onClick={() => { handleYearPagination(index) }}>{yearList[index]}</div>)
    }

  }

  async function SearchResultsByYear(index) {

    const results = await getFilterReportByYear(yearList[index]);

    setDocData(results?.data?.data?.documents?.nodes || [])
    setLoading(false)


    setYear(index + 1)
    scrollTo(0, 700)
  }

  const handleYearPagination = (index) => {
    setLoading(true)
    SearchResultsByYear(index)
  }



  return (
    <div>
      <HeroSection title={'FACTSHEETs'} className='factsheets-page' />
      <div className="container page-wrapper">

        <div className="latest results-area">
          <div className="title-heading">{'Monthly factsheet - ' + monthName + ' ' + year}</div>
          <div className="approach_materials_content documents-container  custom-1">
            {
              <DocumentLoop
                file={props.latest.file.file.mediaItemUrl}
                title={props.latest.title || props.latest.file.name}
                image={props.latest.file.file.sourceUrl || props.latest.file.image.sourceUrl}
              />
            }
          </div>

        </div>

        <div className={"previous results-area "}>
          <div className="title-heading">Previous Factsheets</div>
          <div className={"custom " + (isLoading ? 'isLoadingSlow' : '')}>
            {
              docData.map((value, id) => {
                if (value.id != props.latest.id) {
                  return (
                    <DocumentListLoop
                      key={id}
                      file={value.file.file.mediaItemUrl}
                      title={value.title || value.file.name}
                      image={value.file.file.sourceUrl || value.file.image.sourceUrl}
                      date={value.date}
                    />

                    // <div className="approach_materials_content_document" key={id}>

                    // <div className="materials_content_document_image">
                    //     <div className="image-container">
                    //     <Image src={value.file.file.sourceUrl ||value.file.image.sourceUrl} alt="Rectangle" layout="fill" className="image-item" />
                    //     </div>
                    //     <div className="hover_approach_materials">
                    //     <a download={value.name} target='blank' href={value.file.file.mediaItemUrl} className="hover_approach_button">
                    //         <Image src={download} alt="image" />
                    //         <p>Click here download</p>
                    //     </a>
                    //     </div>
                    // </div>
                    // <div className="materials_content_document_text">
                    //     <p>{value.title || value.file.name}</p>
                    // </div>

                    // </div>
                  )

                }
              })
            }
          </div>
          {/* {
                        (number.current < props.total) && <>
                        <div className={"load-more-button "+(isLoading ? 'isLoading':'')} onClick={loadMore}>
                            Load more
                            <span className="svg">
                                <Image alt="" src={down} />
                            </span>
                        </div>
                        </>
                        
                        } */}
          <div className="pagination-navigation">{reportPagination}</div>

        </div>
      </div>

    </div>
  )
};

export default FactSheets



export async function getStaticProps ({ params }) {

  const latest = await getLatestFactSheets('factsheets');

  const allReports = await getFilterReportByYear('null')
  var yearList = allReports?.data?.data?.documents?.nodes
    .map((value, index) => {
      return (new Date(value.date)).getFullYear()
    })
    .filter((value, index, arr) => {
      return index == arr.indexOf(value)
    })
    .sort(function (a, b) { return b - a });

  var filterReports = await getFilterReportByYear(yearList[0])
  filterReports = filterReports?.data?.data?.documents?.nodes.filter((value) => value.id != latest?.data?.data?.documents?.edges[0]?.node.id)

  if (filterReports.length == 0) {
    filterReports = await getFilterReportByYear(yearList[1])
    filterReports = filterReports?.data?.data?.documents?.nodes
    // console.log('sfsdfd')
    yearList.shift()
  } else {
    // console.log('sfsdfd')

  }


  return {
    props: {
      Reports: filterReports || null,
      total: allReports?.data?.data?.documents?.pageInfo?.offsetPagination?.total || null,
      latest: latest?.data?.data?.documents?.edges[0]?.node,
      yearList: yearList

    },
    revalidate: 1,
  };
}
