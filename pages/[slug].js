import React, { useEffect, useState } from "react";
import { Header } from "../components/layouts/Header/MainHeader";
import Footer from "../components/layouts/footer";
import { useRouter } from "next/router";
import Image from "next/image";
import twitter from "../public/imgs/twitter-icon.svg";
import mess from "../public/imgs/mess-icon.svg";
import facebook from "../public/imgs/facebook-icon.svg";
import chevrons from "../public/imgs/chevrons.svg";
import linkedin from '../public/imgs/linkedin.svg'
import { ArticleJsonLd } from 'next-seo';
import backto from "../public/imgs/backto.svg";
import { NextSeo } from 'next-seo';

import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton
} from "react-share";

import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} from "react-share";

import { PostGrid } from "../components/layouts/Post Grid/PostGrid";
import { getNews, show } from "../store/action/new";
import {
  getAllNews,
  getOngttNews,
  getRelatedNews,
} from "../store/action/new";
import Link from "next/link";

export default function SingleNew(props) {
  const [newDetail, setNewDetail] = useState(props.NewDetail);
  const [link, setLink] = useState('')

  var ROOT_URL = process.env.HOSTNAME_DEMO;

  useEffect(() => {
    setLink(window.location.href)
  })



  const convertDate = (date) => {
    if (date) {
      var newDate = new Date(date);
    } else {
      var newDate = new Date();
    }
    const day = newDate.getDate();
    const month = newDate.toLocaleString("en-us", { month: "long" });
    const year = newDate.getFullYear();
    return day + " " + month + ", " + year
  };

  const router = useRouter();

  return (
    <>
      {props.NewDetail &&
        <NextSeo
          title={props.NewDetail ? props.NewDetail.title : 'TIM'}
          description={props.NewDetail.slug || ''}
          openGraph={{
            url: link,
            title: props.NewDetail.title,
            description: props.NewDetail.excerpt,
            images: [
              {
                url: props.NewDetail.featuredImage.node.sourceUrl,
                width: 800,
                height: 600,

              },

            ],
            siteName: 'TIM',
          }}
        />
      }
      {props.NewDetail &&
        <ArticleJsonLd
          url={link}
          title={props.NewDetail.title}
          images={[
            props.NewDetail.featuredImage.node.sourceUrl
          ]}
          datePublished={props.NewDetail.date}


          description={props.NewDetail.slug}
          isAccessibleForFree={true}
        />
      }

      {props.NewDetail && (



        <div className="post-content-area">
          <div className="container">
            {/* <Link href="/news"> */}
            <div
              className="back_new"
              onClick={() => router.back()}
              style={{ cursor: "pointer" }}
            >
              <div className="chevrons_icon">
                <Image alt="chevrons" src={backto} />
              </div>
              <p>Back to Previous Page</p>
            </div>

            {/* </Link> */}
            <div className="title">{props.NewDetail.title}</div>
            <div
              className="content-post"
              dangerouslySetInnerHTML={{ __html: props.NewDetail.content }}
            ></div>

            <div className="content-footer">
              <div className="column1">
                <div className="category">
                  {props.NewDetail.categories?.nodes.map((value, index) => {
                    return (
                      <div key={index} className="category-item">
                        {value.name}
                      </div>
                    );
                  })}
                </div>
                <div className="date">{convertDate(props.NewDetail.date)}</div>
              </div>
              <div className="column2">
                Share On:
                <TwitterShareButton url={link}>
                  <div className="icon">
                    <Image src={twitter} alt="twitter_icon" />
                  </div>
                </TwitterShareButton>
                <LinkedinShareButton
                  url={link}
                >
                  <div className="icon">
                    <Image src={linkedin} alt="mess_icon" />
                  </div>
                </LinkedinShareButton>
                <FacebookShareButton
                  url={link}
                >
                  <div className="icon">
                    <Image src={facebook} alt="facebook_icon" />
                  </div>
                </FacebookShareButton>
              </div>
            </div>
          </div>
        </div>
      )}

      <PostGrid
        heading={
          <div>
            related News & Insights
          </div>
        }
        data={props.AllNew}
      />

    </>
  );
}
export async function getStaticPaths() {
  const res = await getOngttNews();
  const data = await res;
  const paths = data.data.data.posts.nodes.map((data) => ({
    params: { slug: data.slug },
  }));



  return {
    paths,
    fallback: 'blocking',
  };
}
export async function getStaticProps({ params }) {

  const res = await show(params.slug);
  const categories = res.data?.data.post.categories.nodes.map(
    (value) => value.slug
  );

  const [allNew4, res4] = await Promise.all([getRelatedNews(3, categories)]);
  return {
    props: {
      NewDetail: res.data?.data.post || null,
      AllNew: allNew4?.data?.data?.posts?.nodes || null,
    },
    revalidate: 1

  };
}
