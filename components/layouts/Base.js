import Cookies from "./Cookies";
import Footer from "./footer";
import { Header } from "./Header/MainHeader";
import CookisConsent from "react-cookie-consent";
import { resetCookieConsentValue } from "react-cookie-consent";
import Head from "next/head";
import { useEffect, useLayoutEffect, useState } from "react";

import { PopUp } from "./PopUp";
import { NewHeader } from "./Header/NewHeader";
import { useRouter } from "next/router";
import Script from "next/script";

export const Base = (props) => {
  const router = useRouter();
  const [isMobile, setMobile] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isShow, setShow] = useState(true);
  const [visibleCookie, setVisible] = useState(true);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=";
  }

  const handleClick = () => {
    setCookie("CookieConsent", !scrolling, 1);
    setShow(false);
    setScrolling(!scrolling);
    // resetCookieConsentValue()
    // sessionStorage.setItem('already', true);
    setVisible(false);
  };

  useLayoutEffect(() => {
    var cookie = getCookie("CookieConsent");
    if (Boolean(cookie) || router.asPath == "/PrivacyPolicy") {
      setShow(false);
      setVisible(false);
    } else {
      setShow(true);
      setVisible(true);
    }
    // if (router.asPath == '/PrivacyPolicy'){
    //   setShow(false)
    //   // setScrolling(!scrolling)
    //   // resetCookieConsentValue()
    //   // sessionStorage.setItem('already', true);
    //   setVisible(false)
    // }
  }, [router.asPath]);

  useEffect(() => {
    var cookie = getCookie("CookieConsent");

    if (Boolean(cookie) || router.asPath == "/PrivacyPolicy") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  });

  useEffect(() => {
    var mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
      setMobile(true);
    } else setMobile(false);
    window.addEventListener("resize", function () {
      if (mediaQuery.matches) {
        setMobile(true);
      } else setMobile(false);
    });
  }, []);

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="bxPZB9Ibym1G2ypnbsQaP_xTlMUxPX_CLmQhRHgRDkQ"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RTXB9CZ164"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RTXB9CZ164', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* <link rel="icon" href="/imgs/Group-1.png" /> */}
      </Head>

      {isMobile ? <Header data={props.dataHeader} /> : <NewHeader />}
      {props.children}
      <Footer data={props.data} />
      {isShow && (
        <PopUp
          setShow={setShow}
          content={props?.dataCookie?.cookie?.cookie?.contentcookie}
        />
      )}

      {!isShow && visibleCookie && (
        <CookisConsent
          // debug={true}
          overlay
          expires={1}
          buttonStyle={{
            fontFamily: "Roboto",
            background: "#000080",
            margin: "0px 5px 0px 0px",
            color: "rgb(255, 255, 255)",
            marginRight: "20px",
          }}
          buttonText="Accept All"
          onAccept={handleClick}
        >
          <Cookies
            content={props?.dataCookie?.cookie?.cookie?.cookieContentMain}
          />
        </CookisConsent>
      )}
    </>
  );
};
