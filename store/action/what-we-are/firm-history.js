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

export const getFirmHistoryInfo = () => {
  const query = `
 query NewQuery {
  page(id: "firm-history", idType: URI) {
    HeroSection {
      title
      image {
        sourceUrl
      }
    }
    FirmHistory {
      timeline {
        year
        image {
          sourceUrl
        }
        description
      }
      subTextSection {
        title
        description
      }
    }
  }
}
  `;
  
  return Grapql(query);
};
