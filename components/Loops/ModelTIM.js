import React, { useState, useEffect } from "react";
import tim_outTeam from "../../public/imgs/Component_Img.png";
import outTeamUser from "../../public/imgs/outTeamUser.png";
import outHoverUser from "../../public/imgs/hover_user.png";
import modelManage from "../../public/imgs/model_outTeam.png";

import Image from "next/image";
import exit from "../../public/imgs/exit.png";

function TeamManage({ data, showModal }) {
  // console.log(setDataTim);
  return (
    <>
      <div className="overlay " onClick={() => showModal(false)}>
        <div className="modelManage ">
          <div className="model" onClick={(e) => { e.stopPropagation() }}>
            <div className="image-container modal_img">
              <Image src={data.humanProperties.transparentImage.mediaItemUrl} layout='fill' className="image-item" alt="image model" />
            </div>
            <div className="model_text">
              <h3>{data.title}</h3>
              <p>{data.humanProperties.position}</p>
              <span dangerouslySetInnerHTML={{ __html: data.content }}>
              </span>
            </div>
            <div className="exit " onClick={() => showModal(false)}>
              <Image src={exit} alt="exit" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeamManage;
