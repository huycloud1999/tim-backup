import React from 'react'
import { PrivacyPolicy1 } from "../store/action/PrivacyPolicy"

export default function PrivacyPolicy(props) {

  // console.log(props);
  return (
    <div className="privacy_policy container">
      <div className="privacy_policy_title">Privacy Policy</div>
      <div className="content_privacy_policy" dangerouslySetInnerHTML={{ __html: props.privacy.content }}></div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const [resNew, res] = await Promise.all([PrivacyPolicy1()]);

  return {
    props: {
      privacy: resNew.data.data.page
    },
    revalidate: 1,
  };
}