import React from "react";
import "./style.css";
import {
  FaGithub,
  FaLinkedin, 
} from "react-icons/fa";
import { socialprofiles } from "../../content_option";

const ICON_MAPPING = {
  github: FaGithub,
  linkedin: FaLinkedin,
};

// eslint-disable-next-line no-unused-vars
export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {Object.entries(socialprofiles).map(([platform, url]) => {
          const IconComponent = ICON_MAPPING[platform] || ICON_MAPPING.default;
          return (
            <li key={platform}>
              <a href={url}>
                <IconComponent />
              </a>
            </li>
          );
        })}
      </ul>
      <p>Follow Me</p>
    </div>
  );
};
