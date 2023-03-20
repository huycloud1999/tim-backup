import axios from "axios";
var API_URL = process.env.NEXT_PUBLIC_HOSTNAMEA;
const Grapql = (query, token = "", session = "") => {
  let headers = {};
  if (token !== "") {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
  if (session !== "") {
    headers = {
      ...headers,
      "woocommerce-session": `Session ${session}`,
    };
  }
  return axios({
    method: "POST",
    url: `${API_URL}/graphql`,
    data: {
      query: query,
    },
    headers: headers,
    timeout: 90000,
  }).catch((e) => console.log("e", process.env.NEXT_PUBLIC_HOSTNAMEA));
};

export const getWhyVietNam = () => {
  const query = `
  query NewQuery {
    page(id: "why-vietnam", idType: URI) {
      HeroSection {
        title
        image {
          sourceUrl
        }
      }
      WhyVietnam {
        smallSubText
        slideImages {
          sourceUrl
        }
      }
      macroEconomy {
        titleTab
        risingFromTheAshes {
          title
          description
          subText
          chartArea {
            chartItem {
              title
              chartImage {
                sourceUrl
              }
            }
          }
        }
        toOneOfTheMostGlobalizedPopulousCountries {
          title
          description
          chartArea {
            chartItem {
              title
              chartImage {
                sourceUrl
              }
              visible
              source
            }
          }
          tradeChart {
            body
            caption
            header
          }
          map {
            sweden {
              name
              longtitude
              lattitude
            }
            vietnam {
              name
              longtitude
              lattitude
              population
            }
            vietnamLocationIcon {
              mediaItemUrl
            }
            swedenLocationIcon {
              mediaItemUrl
            }
          }
        }
        andTheRoarOfANewTiger {
          title
          description
          vietnamCircleChart {
            title
            iconTagBoxItem {
              title
              content
              borderColor
              textColor
              icon {
                sourceUrl
              }
            }
          }
          chartArea {
            title
            image {
              sourceUrl
            }
            source
          }
          vietNamGrowthEngine {
            fullCoverImage {
              sourceUrl
            }
            fullCoverImageMobile {
              sourceUrl
            }
            populationChart {
              title
              image {
                sourceUrl
              }
            }
            statistics {
              title
              icon {
                sourceUrl
              }
            }
          }
        }
      }
      capitalMarket {
        tabTitle
        aFrontierClassificationForAnEmergingMarket {
          title
          description
        }
        vnIndexChart {
          title
          image {
            sourceUrl
          }
        }
        totalSecuritiesAcountsChart {
          body
          caption
          header
        }
        corporateBondMarketChart {
          body
          caption
          header
        }
        corporateBondMarketChartImg {
          sourceUrl
        }
      }
    }
  }
  `;

  return Grapql(query);
};
