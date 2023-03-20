import React from 'react'
import {resetCookieConsentValue } from "react-cookie-consent";


export default function Cookies({content}) {

  return (
        <div className="cookies_description " dangerouslySetInnerHTML={{__html: content}} >
         
        </div>
  )
}


