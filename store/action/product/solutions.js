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


export const getSolutions = () => {
  const query = `
  query NewQuery {
    page(id: "solutions", idType: URI) {
      HeroSection {
        title
        image {
          mediaItemUrl
        }
      }
      Solutions {
        firstSection {
          description
          property {
            title
            icon {
              mediaItemUrl
            }
            link
            visibility
          }
        }
        mandates {
          description
          propertyItem {
            title
            description
            icon {
              mediaItemUrl
            }
          }
        }
        otherProducts {
          title
          description
          image {
            mediaItemUrl
          }
        }
        assetManagement {
          title
          textArea1
          textArea2
          image1 {
            mediaItemUrl
          }
          image2 {
            mediaItemUrl
          }
          table {
            caption
            body
            header
          }
        }
        documents {
          title1
          title2
          file1 {
            mediaItemUrl
          }
          file2 {
            mediaItemUrl
          }
        }
      }
    }
  }
  `
  return Grapql(query);
}




