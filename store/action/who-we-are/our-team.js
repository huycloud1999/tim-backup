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


export const getOurTeam = (categoryPositionSlug) => {
  const query = `
  query NewQuery {
    ourTeams(
      where: {status: PUBLISH,orderby: {field: MENU_ORDER, order: ASC}, taxQuery: {taxArray: {field: SLUG, taxonomy: POSITIONCATEGORY, operator: IN, terms: "${categoryPositionSlug}"}, relation: OR}}
    ) {
      nodes {
        id
        title
        content
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        humanProperties {
          position
          des
          transparentImage {
            altText
            mediaItemUrl
          }
          hoverImage{
            altText
            mediaItemUrl
          }
        }
        positionCategory {
          nodes {
            name
          }
        }
      }
    }
    page(id: "our-team", idType: URI) {
      HeroSection {
        title
        image {
          altText
          sourceUrl
        }
      }
      content
    }
  }
  `
  return Grapql(query);
}