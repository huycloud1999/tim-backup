import { Header } from "../components/layouts/Header/MainHeader"
import { PostLoop } from "../components/layouts/Post Grid/PostLoop"
import { DocumentLoop } from "../components/DocumentLoop"

import { getResearchMaterials } from "../store/action/who-we-are/ourApproach"

import { getFilterNews, getSearchResult } from "../store/action/new"

import { useRouter } from "next/router"
import { useEffect, useState, useLayoutEffect, useRef } from "react"



export default function Search(props) {

  const [PostIsLoading, setPostLoading] = useState(false)
  const [DocIsLoading, setDocLoading] = useState(false)
  const [newsData, setDataNews] = useState()
  const [docsData, setDataDocs] = useState()
  const [activePostPage, setActivePostPage] = useState(1);
  const [activeDocPage, setActiveDocPage] = useState(1);
  const router = useRouter();
  var keySearch = router.query.keyValue;

  const postPerPage = 6;
  const documentPerPage = 8;
  const total = useRef();

  const totalPostCount = useRef();
  const totalDocCount = useRef();
  const pagePostCount = Math.ceil(totalPostCount.current / postPerPage);
  const pageDocCount = Math.ceil(totalDocCount.current / documentPerPage);


  var postPagination = []
  useEffect(() => {
    var formSearch = document.querySelector('.form-search');
    formSearch?.classList.remove('isLoadingSlow');

  })

  if (pagePostCount > 1) {
    for (let index = 0; index < pagePostCount; index++) {
      var active = index == activePostPage - 1 ? ' active-page' : '';
      if ((index > 3 && index < pagePostCount - 3 && index != activePostPage - 1) && (index < activePostPage - 3 || index > activePostPage + 2)) {
        postPagination.push('...')
      } else {

        postPagination.push(<div key={index} className={"pagination-item" + active} onClick={() => handlePostPagination(index)}>{index + 1}</div>)
      }

    }

    const first = postPagination.indexOf('...')
    const last = postPagination.lastIndexOf('...')
    var maintain = [first, last];
    postPagination = postPagination.filter((value, index, arr) => ((value == '...' && maintain.includes(index)) || value != '...'))

  }

  var docPagination = []


  if (pageDocCount > 1) {
    for (let index = 0; index < pageDocCount; index++) {
      var active = index == activeDocPage - 1 ? ' active-page' : ''
      if ((index > 3 && index < pageDocCount - 3 && index != activeDocPage - 1) && (index < activeDocPage - 3 || index > activeDocPage + 2)) {
        docPagination.push('...')
      } else {

        docPagination.push(<div key={index} className={"pagination-item" + active} onClick={() => handleDocPagination(index)}>{index + 1}</div>)
      }
    }

    var first1 = docPagination.indexOf('...')
    var last1 = docPagination.lastIndexOf('...')
    var maintain1 = [first1, last1];
    docPagination = docPagination.filter((value, index, arr) => ((value == '...' && maintain1.includes(index)) || value != '...'))
  }

  function handlePostPagination(index) {
    setPostLoading(true)
    router.push({
      pathname: '/search',
      query: {
        keyValue: keySearch,
        post_page: index + 1,
        doc_page: activeDocPage
      }
    })
  }

  function handleDocPagination(index) {
    setDocLoading(true)

    router.push({
      pathname: '/search',
      query: {
        keyValue: keySearch,
        post_page: activePostPage,
        doc_page: index + 1
      }
    })
  }


  useEffect(() => {
    setDocLoading(true)
    setPostLoading(true)
    var doc_page = router.query.doc_page
    var post_page = router.query.post_page
    async function SearchResultsByKey(key) {
      const results = await getSearchResult(postPerPage, documentPerPage, (post_page - 1) * postPerPage || 0, (doc_page - 1) * documentPerPage || 0, 1000, key)
      setDataDocs(results.data.data.documents.nodes.slice(0, documentPerPage))
      setDataNews(results.data.data.posts.nodes.slice(0, postPerPage))
      var totalnewsResults = results.data.data.posts.pageInfo.offsetPagination.total
      var totaldocsResults = results.data.data.documents.pageInfo.offsetPagination.total
      totalDocCount.current = results.data.data.documents.pageInfo.offsetPagination.total;
      totalPostCount.current = results.data.data.posts.pageInfo.offsetPagination.total;
      total.current = (totaldocsResults + totalnewsResults) || 0
      setDocLoading(false)
      setPostLoading(false)
      setActivePostPage(parseInt(post_page) || 1)
      setActiveDocPage(parseInt(doc_page) || 1)
    }

    SearchResultsByKey(keySearch)
  }, [router.query.keyValue, router.query.post_page, router.query.doc_page])


  return (
    <div className="container">
      <div className="search-info">
        <div className="big-title heading-search">Results for {keySearch}</div>
        <div className="results-counter">( {(total.current != undefined && total.current + ' results found') || 'Searching...'} )</div>
        <div className="divider"></div>
      </div>
      <div className="results-area">
        {
          newsData && newsData.length > 0 &&
          <div className={"news-result" + (PostIsLoading ? ' isLoading' : '')}>
            <div className="heading-news">News & Insights</div>
            <div className="news-container">
              {
                newsData.map((ct, index) => {
                  var regEx = new RegExp(keySearch, "ig");
                  var replaceMask = "<span style='color:blue'>" + keySearch + "</span>";
                  var result = ct.title.replace(regEx, replaceMask);
                  return (
                    <PostLoop
                      key={ct.slug}
                      image={ct.featuredImage?.node?.sourceUrl}
                      title={result}
                      date={ct.date}
                      description={ct.excerpt}
                      slug={ct.slug}
                      category={ct.categories?.nodes}
                    />
                  );
                })
              }
            </div>
            <div className="pagination-navigation">{postPagination}</div>
          </div>
        }
        {
          docsData && docsData.length > 0 &&
          <div className={"documents-results" + (DocIsLoading ? ' isLoading' : '')}>
            <div className="heading-documents">Samples of Primary Research Materials</div>
            <div className="divider"></div>
            <div className="documents-container">
              {
                docsData.map((value, index) => {
                  return (
                    <DocumentLoop key={index} file={value.file.file.mediaItemUrl} title={value.title || value.file.name} image={value.file.file.sourceUrl || value.file.image.sourceUrl} />
                  );
                })
              }
            </div>
            <div className="pagination-navigation">{docPagination}</div>
          </div>
        }

      </div>
    </div>
  )
}
