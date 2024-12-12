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

export const getAllHomeInfo = () => {
  const query = `
  query NewQuery {
    page(id: "turicum-investment-management-ag", idType: URI) {
      Home {
        whatWeDo {
          blackText
          gradientText
        }
        textAnimationSection {
          paragraph
          author
        }
        countdownSection {
          sectionTitle
          sectionDescription
          countdown {
            countdownItem {
              number
              description
              symbolVisible
            }
          }
        }
        videoSection {
          poster {
            sourceUrl
          }
          video {
            url
          }
        }
        monthlyHighlight {
          monthlyHighlight {
            ... on Post {
              id
              title
              excerpt
              slug
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
      bannerSection {
        bannerItem {
          title
          description
          image {
            mediaItemUrl
          }
          link {
            url
          }
        }
      }
    }
    posts(
    where: {orderby: {field: DATE, order: DESC}, taxQuery: {taxArray: {taxonomy: CATEGORY, terms: "monthly-highlights", operator: IN, field: SLUG}}}
    first: 1
  ) {
    edges {
      node {
        id
        title
        excerpt
        slug
        featuredImage {
          node {
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
