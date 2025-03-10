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

export const getAllComfooter = () => {
  const query = `
  query NewQuery {
    page(id: "options", idType: URI) {
      footer {
        colums1 {
          title
          img {
            sourceUrl
          }
        }
        columsContact {
          turicumInvestmentManagementAg
          title
          email {
            email
            img {
              sourceUrl
            }
          }
          linkedin {
            linkedin
            img {
              sourceUrl
            }
          }
          location {
            location
            img {
              sourceUrl
            }
          }
          sdt {
            sdt
            img {
              sourceUrl
            }
          }
        }
        timVietnamJsc {
          timVietnamJsc
          email {
            email
            img {
              sourceUrl
            }
          }
          location {
            img {
              sourceUrl
            }
            location
          }
          sdt {
            img {
              sourceUrl
            }
            sdt
          }
        }
        turicumInvestment {
          turicumInvestment
          finsaPolicy
          finsapolicyfile {
            link
          }
          linkedin
          privacyPolicy
          privacyPolicyFile {
            link
          }
          termOfUse
          termOfUseFile {
            link
          }
        }
      }
    }
  }
  `;

  return Grapql(query);
};
