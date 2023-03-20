import React from 'react'
import { contentImpressum } from "../store/action/Impressum"

export default function Impressum(props) {
    // console.log(props);
    return (
        <div className="privacy_policy container">
            <div className="privacy_policy_title">Impressum</div>
            <div className="content_privacy_policy" dangerouslySetInnerHTML={{ __html: props.Impressum.content }}></div>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const [resNew, res] = await Promise.all([contentImpressum()]);

    return {
        props: {
            Impressum: resNew.data.data.page
        },
        revalidate: 1,
    };
}