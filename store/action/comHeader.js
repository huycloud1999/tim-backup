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


export const getAllHeader = () => {
  const query = `
  query NewQuery {
    page(id: "options", idType: URI) {
      header {
        contactInfoHeader {
          email
          fieldGroupName
          information
          sdt
        }
        investmentManagement
        menu {
          getInTouch
          home
          newInsights
          whyVietnam
          product {
            titleProduct
            product {
              titleCertificateOffering
              mandates
              certificateOffering {
                timvt
                other
              }
            }
          }
          whoWeAre {
            titleWhoWeAre
            whoWeAre {
              aboutUs
              careers
              firmHistory
              ourApproach
              ourTeam
            }
          }
        }
      }
    }
  }
  `
  return Grapql(query);
}