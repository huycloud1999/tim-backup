import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import Image from "next/image";
import "react-dropdown/style.css";
import { useRouter } from "next/router";

import { PostLoop } from "../../components/layouts/Post Grid/PostLoop";
import { Header } from "../../components/layouts/Header/MainHeader";
import Footer from "../../components/layouts/footer";
import image1 from "/public/imgs/Mask group.png";
import image2 from "/public/imgs/Mask group (1).png";
import image3 from "/public/imgs/cover.png";
import arrowDown from "/public/imgs/arrow-down.png";
import { PostLoop1 } from "../../components/layouts/Post Grid/PostLoop1";
import {
  getFilterNews,
  getAllCat,
  getAllNews,
  getRelatedNews,
} from "../../store/action/new";
import generateMetaData from "../api/generateMetaData";
import { NextSeo } from "next-seo";
import MetaSEO from "../../components/Seo";

export default function NewsPage(props) {
  const [dataNews, setDataNews] = useState(props.AllNewPagination);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(null);
  const [category, setCategory] = useState({ value: null, label: null });
  const [length, setLength] = useState(props.totalPost);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const { Categories } = props;
  const postsPerPage = props.AllNewPagination.length;
  const pageCount = Math.ceil(length / postsPerPage);
  var yearString = "";

  var pagination = [];

  if (pageCount > 1) {
    for (let index = 0; index < pageCount; index++) {
      var active = index == page - 1 ? " active-page" : "";
      if (
        index > 3 &&
        index < pageCount - 3 &&
        index != page - 1 &&
        (index < page - 3 || index > page + 2)
      ) {
        pagination.push("...");
      } else {
        pagination.push(
          <div
            key={index}
            className={"pagination-item" + active}
            onClick={() => handlePagination(index)}
          >
            {index + 1}
          </div>
        );
      }
    }

    const first = pagination.indexOf("...");
    const last = pagination.lastIndexOf("...");
    var maintain = [first, last];

    pagination = pagination.filter(
      (value, index, arr) =>
        (value == "..." && maintain.includes(index)) || value != "..."
    );
  }
  var startPoint = 2012;
  var endPoint = new Date().getFullYear();
  var yearArr = [];
  for (let index = endPoint; index >= startPoint; index--) {
    yearArr.push(index);
  }
  var optionsYear = yearArr.map((value, index) => {
    return {
      value: value,
      label: value,
    };
  });

  optionsYear = [{ value: null, label: "Year" }, ...optionsYear];

  const defaultOptionYear = optionsYear[0];
  var dataCat = [{ value: null, label: "CATEGORIES" }];

  props.Categories.map((cat) => {
    var row = {};
    row["value"] = cat.databaseId;
    row["label"] = cat.name;
    dataCat.push(row);
  });

  const defaultOptionCategory = dataCat[0];

  useEffect(() => {
    setLoading(true);
    async function getListNews() {
      var size = parseInt(router.query.page);

      const res = await getFilterNews(
        router.query.category || null,
        router.query.year || null,
        postsPerPage,
        (size - 1) * postsPerPage || 0,
        1000,
        ""
      );

      const data = res;

      setDataNews(data?.data?.data?.posts?.nodes || null);
      setLength(data?.data?.data?.posts?.pageInfo?.offsetPagination?.total);
      setLoading(false);
      // setCategory({value:, label:router.query.category })
      var dataCatClone = dataCat.map((item) => item.value);
      var yearClone = optionsYear.map((item) => item.value);
      var indexCat = dataCatClone.indexOf(
        parseInt(router.query.category || null)
      );
      var indexYear = yearClone.indexOf(parseInt(router.query.year || null));

      setYear(
        (optionsYear[indexYear] && optionsYear[indexYear].value) ||
          optionsYear[0].value
      );
      setCategory(dataCat[indexCat] || dataCat[0]);
      setPage(size || 1);
    }
    getListNews();
  }, [router.query.category, router.query.year, router.query.page]);

  const onSelectYear = ({ value }) => {
    setLoading(true);

    router.push({
      pathname: "/news",
      query: {
        year: value,
        category: category.value,
        page: 1,
      },
    });
  };

  const onCatSelect = (cat) => {
    setLoading(true);

    router.push({
      pathname: "/news",
      query: {
        year: year,
        category: cat.value,
        page: 1,
      },
    });
  };
  const scrollTop = () => {
    window.scroll({
      top: 550,
      left: 0,
      behavior: "smooth",
    });
  };

  const paginate = (page) => {
    setLoading(true);

    router.push({
      pathname: "/news",
      query: {
        year: year,
        category: category.value,
        page: page + 1,
      },
    });

    scrollTop();
  };

  const handlePagination = (index) => {
    paginate(index);
  };

  if (year) {
    yearString = year.toString();
  } else yearString = year;
  return (
    <>
      <MetaSEO dataSEO={props.dataSEO} slug={props.slug} />
      <div className="post-grid-filter">
        <div className="container">
          <div className="heading-section">NEWS & INSIGHTS</div>
          <div className="dropdown-filter-area">
            <Dropdown
              className="filter-post year-filter-dropdown"
              options={optionsYear}
              onChange={(e) => onSelectYear(e)}
              value={yearString || defaultOptionYear}
              placeholder="YEAR"
              arrowClosed={
                <span className="arrow-closed">
                  <Image src={arrowDown} alt="arrow_down" />
                </span>
              }
              arrowOpen={
                <span className="arrow-open">
                  <Image src={arrowDown} alt="arrow_down" />
                </span>
              }
            />

            <Dropdown
              className="filter-post category-filter-dropdown"
              options={dataCat}
              onChange={(e) => onCatSelect(e)}
              value={category.label || defaultOptionCategory}
              placeholder="CATEGORY"
              arrowClosed={
                <span className="arrow-closed">
                  <Image src={arrowDown} alt="arrow_down" />
                </span>
              }
              arrowOpen={
                <span className="arrow-open">
                  <Image src={arrowDown} alt="arrow_down" />
                </span>
              }
            />
          </div>
          <div className={"filter-results" + (isLoading ? " isLoading" : "")}>
            {dataNews.length > 0 && (
              <PostLoop1
                image={dataNews[0].featuredImage?.node?.sourceUrl}
                title={dataNews[0].title}
                category={dataNews[0].categories?.nodes}
                date={dataNews[0].date}
                description={dataNews[0].excerpt}
                slug={dataNews[0].slug}
              />
            )}
            {dataNews.length > 0 &&
              dataNews.map((ct, key) => {
                if (key == 0) {
                  return;
                } else
                  return (
                    <PostLoop
                      key={ct.slug}
                      image={ct.featuredImage?.node?.sourceUrl}
                      title={ct.title}
                      date={ct.date}
                      description={ct.excerpt}
                      slug={ct.slug}
                      category={ct.categories?.nodes}
                    />
                  );
              })}
          </div>

          <div className="pagination-navigation">{pagination}</div>
        </div>
      </div>

      {/* <Footer/> */}
    </>
  );
}

export async function getStaticProps({ params }) {
  const [catNew, res1] = await Promise.all([getAllCat()]);

  const [allNew2, res3] = await Promise.all([getAllNews(6)]);
  const dataSEO = await generateMetaData("/news/");

  return {
    props: {
      Categories: catNew?.data?.data?.categories?.nodes || null,
      AllNewPagination: allNew2?.data?.data?.posts?.nodes || null,
      totalPost: allNew2?.data?.data?.posts?.pageInfo?.offsetPagination?.total,
      dataSEO: dataSEO?.json,
      slug: "news",
    },
    revalidate: 60,
  };
}
