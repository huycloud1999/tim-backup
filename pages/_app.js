import { Base } from "../components/layouts/Base";
import "../styles/globals.css";
import "../styles/footer.css";
import "../styles/header.css";
import "../styles/slider.css";
import "../styles/Post Grid/postGrid.css";
import "../styles/Post Grid/postLoop.css";
import "../styles/HomePage.css";
import "../styles/CountDown.css";

import "../styles/Video.css";
import "../styles/GetInTouch.css";
import "../styles/NEWS/NewsPage.css";
import "../styles/NEWS/SingleNews.css";

import "../styles/HeroSection.css";
import "../styles/Product/Mandate.css";

import "../styles/ourTeam.css";
import "../styles/TeamManage.css";
import "../styles/About.css";
import "../styles/ModelManage.css";
import "../styles/FirmHistory.css";
import "../styles/Careers.css";
import "../styles/OurApproach.css";
import "../styles/CertificateOffering.css";
import "../styles/other.css";

import "../styles/SmallTitle.css";
import "../styles/Product/CertificateOffering.css";

import "../styles/WhyVietnam.css";
import "../styles/iconBoxTag.css";
import "../styles/ChartImage.css";
import "../styles/Search.css";
import "../styles/Cookies.css";
import "../styles/PrivacyPolicy.css";
import "../styles/LinkTab.css";
import "../styles/PopUp.css";
import "../styles/Solutions.css";
import "../styles/NewHeader.css";

import "../styles/FactSheets.css";

import loadingImage from "../public/imgs/loading.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useEffect } from "react";

import { getAllComfooter } from "../store/action/comFooter";
import { getAllHeader } from "../store/action/comHeader";
import { getCookie } from "../store/action/Cookie";
import Image from "next/image";
import Script from "next/script";
const GA_TRACKING_ID = "G-5PDJ7VRW69";
function MyApp({ Component, pageProps, footerData, headerData, cookie }) {
  const Layout = Component.Layout ? Component.Layout : Base;
  const router = useRouter();
  const [loading, isLoading] = useState(false);
  const variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    // const handleRouteChange = (url) => {
    //   window.gtag("config", GA_TRACKING_ID, {
    //     page_path: url,
    //   });
    //   isLoading(false);
    // };
    router.events.on("routeChangeStart", (url, { shallow }) => {
      if (router.asPath != url) {
        isLoading(true);
      }
    });
    // router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeComplete", (url, { shallow }) => {
      isLoading(false);
    });

    // return () => {
    //   router.events.off("routeChangeComplete", handleRouteChange);
    // };
  }, []);

  return (
    <>
      {/* <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `,
        }}
      /> */}
      <Layout data={footerData} dataHeader={headerData} dataCookie={cookie}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={router.route}
            variants={variants} // Pass the variant object into Framer Motion
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit"
          >
            {loading && (
              <motion.div
                key={"loading-section"}
                className="loading-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                // onAnimationComplete={handleComplete}
              >
                <Image src={loadingImage} alt="" />
              </motion.div>
            )}

            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </>
  );
}

export default MyApp;
MyApp.getInitialProps = async (appContext) => {
  const [resNew, res] = await Promise.all([getAllComfooter()]);
  const [resNew1, res1] = await Promise.all([getAllHeader()]);
  const [resNew2, res2] = await Promise.all([getCookie()]);

  return {
    // ...appProps,
    footerData: resNew?.data?.data?.page?.footer,
    headerData: resNew1?.data?.data?.page?.header,
    cookie: resNew2?.data?.data?.page,
  };
};
