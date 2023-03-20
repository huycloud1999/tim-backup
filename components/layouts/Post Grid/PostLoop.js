import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "../../../public/imgs/Arrow_footer.png";
import { useRef } from "react";

export const PostLoop = ({
  image,
  title,
  category,
  date,
  description,
  slug,
}) => {
  var property = useRef();
  var column2 = useRef();
  var newDate = new Date(date)

  const day = newDate.getDate()
  const month = newDate.toLocaleString('en-us', { month: 'long' })
  const year = newDate.getFullYear()
  // console.log(month);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    if (mediaQuery.matches) {
      column2.current.append(property.current);
    }
  });

  return (
    <div className="loop-post">
      <Link prefetch={false} href={`/news/${slug}`}>
        <a className="image image-container">
          <Image
            src={image}
            alt="news"
            layout="fill"
            objectFit="cover"
            className="image"
            placeholder="blur"
                      blurDataURL="https://cms.okhub.vn/wp-content/uploads/2023/01/1x1-0b25777f.png"
          />
        </a>
      </Link>

      <div className="column1">
        <Link prefetch={false} href={`/news/${slug}`} className="title">
          <a className="title">

            <div dangerouslySetInnerHTML={{ __html: title }}></div>
          </a>
        </Link>
        <div className="property" ref={property}>
          <div className="category">{
            category.map((value, index) => {
              return (
                <div key={index} className="category-item-name">
                  {value.name}
                  <br />
                </div>
              )
            })
          }</div>
          <div className="date" >
            {[month,' ' ,day,', ' , year].join('')}
          </div>
        </div>
      </div>

      <div className="column2" ref={column2}>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <Link prefetch={false} href={`/news/${slug}`}>
          <a className="read-more">
            Read News
            <Image src={arrow} alt="arrow" />
          </a>
        </Link>
      </div>
    </div>
  );
};
