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

export const getOngttNews = () => {
  const query = `
    query MyQuery2 {
      posts(first: 1000, where: {status: PUBLISH}) {
        nodes {
          date
          excerpt(format: RENDERED)
          featuredImage {
            node {
              sourceUrl
            }
          }
          slug
          title(format: RENDERED)
          categories {
            nodes {
              name
              slug
            }
          }
        }
        pageInfo {
          offsetPagination {
            total
          }
        }
      }
    }
  `;
  return Grapql(query);
};

export const getAllNews = (size = 10000) => {
  var offset = 0;
  if (size == null) {
    size = 1000000000;
  }

  const query = `
  query AllPosts {
    posts(
      where: {status: PUBLISH,
        taxQuery: {taxArray: {taxonomy: CATEGORY, terms: "uncategorized", field: SLUG, operator: NOT_IN}},
      ,offsetPagination: {offset: ${offset}, size: ${size}} orderby: {field: DATE, order: DESC}}
    ) {
      nodes {
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        title(format: RENDERED)
        categories {
          nodes {
            name
            slug
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
  `;

  return Grapql(query);
};

export const getFilterNews = (
  categoryId = "",
  year = "",
  size = 9,
  offset = 0,
  first = 10000,
  searchKey = ""
) => {
  if (size == null) {
    size = 100000;
  }
  // if (categoryId == null){categoryId = ''}
  // if (year == null){year = ''}
  const query = `
  query MyQuery {
    posts(first: ${first},
      where: {
        taxQuery: {taxArray: {taxonomy: CATEGORY, terms: "uncategorized", field: SLUG, operator: NOT_IN}},
        search:"${searchKey}", 
        orderby: {field: DATE, order: DESC}, status: PUBLISH, 
        categoryId: ${categoryId}, dateQuery: {year: ${year}}, 
        offsetPagination: {offset: ${offset}, size: ${size}}}) 
         {
      nodes {
        categories {
          nodes {
            name
            slug
          }
        }
        title(format: RENDERED)
        date
        slug
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
  `;
  return Grapql(query);
};

export const getAllCat = () => {
  const query = `
    query getAllCat {
      categories (where: {exclude: "1"}){  
        
        nodes {
          id
          slug
          name
          databaseId
        }
      }
    }
  `;
  return Grapql(query);
};

export const show = (slug) => {
  const query = `
    query show {
      post(id: "${slug}", idType: SLUG) {
        title(format: RENDERED)
        slug
        date
        excerpt
        content(format: RENDERED)
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    `;
  return Grapql(query);
};
export const getPagination = (index) => {
  const query = `
    query show {
      post(id: "${slug}", idType: SLUG) {
        title(format: RENDERED)
        slug
        date
        content(format: RENDERED)
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    `;
  return Grapql(query);
};

export const getSearchResult = (
  size1 = 6,
  size2 = 4,
  offset1 = 0,
  offset2 = 0,
  first = 10,
  searchKey = ""
) => {
  if (size1 == null) {
    size1 = 100000;
  }
  if (size2 == null) {
    size2 = 100000;
  }
  // if (categoryId == null){categoryId = ''}
  // if (year == null){year = ''}
  const query = `
  query MyQuery {
    posts(first: ${first},where: {search:"${searchKey}", orderby: {field: DATE, order: DESC}, status: PUBLISH, offsetPagination: {offset: ${offset1}, size: ${size1}}}) {
      nodes {
        categories {
          nodes {
            name
            slug
          }
        }
        title(format: RENDERED)
        date
        slug
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
    documents (where: {search:"${searchKey}",, orderby: {field: DATE, order: DESC}, status: PUBLISH, offsetPagination: {offset: ${offset2}, size: ${size2}} }) {
      nodes {
        title
        file {
          name
          
          image {
            sourceUrl
          }
          file {
            sourceUrl
            mediaItemUrl
          }
        }
      }
      pageInfo {
        offsetPagination {
          total
        }
      }
    }
  }
  `;
  return Grapql(query);
};

export const getRelatedNews = (size = 3, categories) => {
  if (size == null) {
    size = 3;
  }

  const results = "[" + categories.map((value) => '"' + value + '"') + "]";



  const query = `
  query AllPosts {
    posts(first: ${size},where: {taxQuery: {taxArray: {taxonomy: CATEGORY, field: SLUG, operator: IN, terms: ${results}}}, orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
      nodes {
        date
        excerpt(format: RENDERED)
        featuredImage {
          node {
            sourceUrl
          }
        }
        slug
        title(format: RENDERED)
        categories {
          nodes {
            name
            slug
          }
        }
      }
      
    }
  }
  `;

  return Grapql(query);
};
