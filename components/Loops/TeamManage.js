import React, { useState, useEffect } from "react";
import tim_outTeam from "../../public/imgs/background1.png";
import outTeamUser from "../../public/imgs/outTeamUser.png";
import outHoverUser from "../../public/imgs/hover_user.png";
import modelManage from "../../public/imgs/model_outTeam.png";

import Image from "next/image";
import exit from "../../public/imgs/exit.png";
import ModelTIM from "./ModelTIM";



function TeamManage({ data, clickModel }) {
  // console.log(data);
  return (
    <>
      <div className="team_manage_container" >
        <div className="team_manage_content" >
          <div className="bg_img">
            <Image src={tim_outTeam} alt="TIM_outTeam" className="img_team" />
          </div>
          <div className="user_img_manage" onClick={() => { clickModel(data) }}>
            <div className="image-container user__image_manage disabled" >
              <Image src={data.humanProperties.transparentImage.mediaItemUrl} alt="user" layout="fill" className="image-item" />
            </div>
            <div className="image-container hover_User disabled">
              <Image src={data.humanProperties.hoverImage?.mediaItemUrl} alt="user" layout="fill" className="image-item" />
            </div>
          </div>
        </div>
        <div className="team_manage_content__des">
          <h3 className="team_manage_name">{data.title}</h3>
          <p className="team_manage_des">{data.humanProperties.position}</p>
          <h5 className="team_manage_des_manage">{data.humanProperties.des}</h5>
        </div>
      </div>

    </>
  );
}

export default TeamManage;
