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


export const getOurApproach = () => {
  const query = `
  query NewQuery {
    page(id: "our-approach", idType: URI) {
      HeroSection {
        title
        image {
          sourceUrl
        }
      }
      ourApproach {
        disciplinedBottomUpApproach {
          title
          description
        }
        monitoringTheMarket {
          title
          description
          cardItem {
            content
          }
        }
        researchmaterialstitle {
          title
        }
      }
    }
  }
  `
  return Grapql(query);
}


export const getResearchMaterials = (
  searchKey='',
  offset=0,
  size= 100000,
  cat
) => {
  const query = `
  query NewQuery {
    documents (where: {taxQuery: {taxArray: {taxonomy: DOCUMENTTYPE, terms: "${cat}", operator: IN, field: SLUG}},search:"${searchKey}", orderby: {field: DATE, order: DESC}, status: PUBLISH, offsetPagination: {offset: ${offset}, size: ${size}},  }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        date
        title
        file {
          name
          image {
            sourceUrl
          }
          file {
            mediaItemUrl
            sourceUrl

          }
        }
      }
    }
  }
  `
  return Grapql(query);
}
export const getFactSheets = (
  
  offset=0,
  size= 100000,
  cat
) => {

  if (offset == null){
    offset=0;
  }
  if (size == null){
    size=100000;
  }
  
  const query = `
  query NewQuery {
    documents (where: {taxQuery: {taxArray: {taxonomy: DOCUMENTTYPE, terms: "${cat}", operator: IN, field: SLUG}}, orderby: {field: DATE, order: DESC}, status: PUBLISH, offsetPagination: {offset: ${offset}, size: ${size}},  }) {
      pageInfo {
        offsetPagination {
          total
        }
      }
      nodes {
        date
        title
        file {
          name
          image {
            sourceUrl
          }
          file {
            mediaItemUrl
            sourceUrl

          }
        }
      }
    }
  }
  `
  return Grapql(query);
}
export const getLatestFactSheets = (
  cat
 
) => {

 
  
  const query = `
  query show {
    documents(where: {taxQuery: {taxArray: {taxonomy: DOCUMENTTYPE, terms: "${cat}", operator: IN, field: SLUG}}, orderby: {field: DATE, order: DESC}}, first: 1) {
      edges {
        node {
          date
        title
        id
        file {
          name
          image {
            sourceUrl
          }
          file {
            mediaItemUrl
            sourceUrl

          }
        }
        }
      }
    }
  }
  `
  return Grapql(query);
}
export const getFilterReportByYear = (
year = null
 
) => {

 
  
  const query = `
  query NewQuery {
    documents(
      where: {taxQuery: {taxArray: {taxonomy: DOCUMENTTYPE, terms: "factsheets", operator: IN, field: SLUG}}, dateQuery: {year: ${year}}}
      first: 10000000
    ) {
      nodes {
        
          date
        title
        id
        file {
          name
          image {
            sourceUrl
          }
          file {
            mediaItemUrl
            sourceUrl

          }
        }
        }
      }
    }
  
  `
  return Grapql(query);
}
