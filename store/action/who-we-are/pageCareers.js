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


export const getAllCareers = () => {
  const query = `
  query NewQuery {
    page(id: "careers", idType: URI) {
      HeroSection {
        title
        image {
          sourceUrl
        }
      }
      careers {
        careers {
          titlecareers {
            content
            highlightTextTitle
            mailTo
          }
          contentemail {
            status
            highlightTextContent
            conntent
          }
            note
          content1 {
            status
            title
            description {
              desContent
            }
          }
          content2 {
            title
            status
            description {
              desContent
            }
          }
          content3 {
            status
            title
            description {
              desContent
            }
          }
          content4 {
            status
            title
            description {
              desContent
            }
          }
        }
      }
    }
  }
  `
  return Grapql(query);
}
