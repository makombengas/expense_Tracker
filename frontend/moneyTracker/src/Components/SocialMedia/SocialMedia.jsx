import React from "react";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { TiSocialTwitterCircular } from "react-icons/ti";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineYoutube } from "react-icons/ai";
import "./socialMedia.css";
import SendMessage from "../SendMessage/SendMessage";

const SocialMedia = () => {
  return (
    <div>
      <div className="icon-bar messages">
        <div className="messageIcon">
          <SendMessage className="messageIcon" />
        </div>

        {/* <a href="#" className="twitter " target="_blank">
          <TiSocialTwitterCircular className="icon" />
        </a> */}
        <a
          href="https://github.com/makombengas"
          className="github"
          target="_blank"
        >
          <AiOutlineGithub className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/bernard-ngassa/"
          target="_blank"
          className="linkedin"
        >
          <TiSocialLinkedinCircular className="icon" />
        </a>
        <a
          href="https://www.youtube.com/@Gemeinzam/featured"
          target="_blank"
          className="youtube"
        >
          <AiOutlineYoutube className="icon" />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
