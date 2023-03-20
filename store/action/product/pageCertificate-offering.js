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

export const getAllCertificateOfering = () => {
  const query =
    `query NewQuery {
      page(id: "certificate-offering", idType: URI) {
        HeroSection {
          title
          image {
            sourceUrl
          }
        }
        certificateOffering {
          certificate {
            content {
              des
              title
            }
            link {
              name1
              name2
            }
            tables {
              contentTable {
                header
                body
              }
              titleTables
            }
            contentImageMobile {
              content1 {
                description
                title
                img {
                  sourceUrl
                }
              }
              content2 {
                description
                title
                img {
                  sourceUrl
                }
              }
            }
            contentImagePc {
              titleTim
              content {
                title
                description
                img {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    `
  return Grapql(query);

}