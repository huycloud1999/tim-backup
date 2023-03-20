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

export const getAllGetInTouch = () => {
  const query = `
  query NewQuery {
    page(id: "options", idType: URI) {
      getInTouch {
        title
        img {
          sourceUrl
        }
        contactInfo {
          title
          managementAg {
            title
            email {
              emailContent
              img {
                sourceUrl
              }
            }
            location {
              locationContent
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
            nation
          }
          timVnJsc {
            title
            nation
            email {
              emailContent
              img {
                sourceUrl
              }
            }
            locationContent {
              locationContent
              img {
                sourceUrl
              }
            }
            sdt {
              sdtContent
              img {
                sourceUrl
              }
            }
          }
          
        }
      }
    }
  }
  `;

  return Grapql(query);
};
