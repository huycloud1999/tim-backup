import { NextSeo } from "next-seo";
import React from "react";

const MetaSEO = ({ dataSEO, slug }) => {
  return (
    <NextSeo
      title={dataSEO?.title}
      description={dataSEO?.description}
      canonical={`${process.env.NEXT_PUBLIC_SITE_URL}${slug}`}
      openGraph={{
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${slug}`,
        title: dataSEO?.title,
        description: dataSEO?.description,
        images: [
          {
            url: dataSEO?.og_image?.[0]?.url,
            width: 800,
            height: 600,
          },
        ],
        siteName: "TIM",
      }}
    />
  );
};

export default MetaSEO;
