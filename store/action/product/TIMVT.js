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

export const getTIMVT = () => {
  const query = `
  query NewQuery {
    page(id: "product-timvt", idType: URI) {
      HeroSection {
        title
        image {
          sourceUrl
        }
      }
      timVt {
        timVietnam {
          title
          description
        }
        whyInvest {
          title
          description
        }
        performanceSinceInception {
          chart {
            body
            caption
            header
          }
        }
        sectorAllocation {
          chart {
            body
            caption
            header
          }
        }
        buttonDownloadFileGroup {
          factsheet {
            title
            downloadFile {
              mediaItemUrl
            }
          }
          termsheet {
            title
            downloadFile {
              mediaItemUrl
            }
          }
        }
      }
    }
  }
  `;
  
  return Grapql(query);
};

