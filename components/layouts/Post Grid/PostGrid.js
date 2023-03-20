import React from "react";
import { PostLoop } from "./PostLoop";
import Image from "next/image";
import image1 from "../../../public/imgs/Mask group.png";
import image2 from "../../../public/imgs/Mask group (1).png";
import arrow from "../../../public/imgs/Arrow_footer.png";
import { Button } from "../Button";

export const PostGrid = ({ heading, data }) => {
  return (
    <div className="post-grid">
      <div className="container">
        <div className="heading">
          <div className="section-title">{heading || "News & Insights"}</div>
          <Button className={"hideOnMobile find-out-more"} link={"/news"} />
        </div>
        <div className="content-area">
          {data &&
            data.map((value, index) => {
              return (
                <PostLoop
                  key={index}
                  image={
                    (value.featuredImage &&
                      value.featuredImage.node.sourceUrl) ||
                    ""
                  }
                  title={value.title}
                  category={value.categories.nodes}
                  date={value.date}
                  description={value.excerpt}
                  slug={value.slug}
                />
              );
            })}
        </div>
        <Button className={"hideOnDesktop find-out-more"} link={"/news"} />
      </div>
    </div>
  );
};
