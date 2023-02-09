import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { CustomCursorContext } from "../contexts/CustomCursorContext";

const Footer: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <div className="flex md:flex-row flex-col gap-6 md:items-center justify-between md:h-[114px] h-full py-6 md:py-0 lg:px-[8%] md:px-[4%] px-[8%]">
      <div className="flex md:flex-row flex-col lg:gap-10 gap-6">
        <div className="flex flex-col">
          <div className="font-light text-gray-500">My mail contact</div>
          <a
            href="mailto:binhnnt.98@gmail.com"
            className="font-bold text-lg hover:text-[#b23d43] transition-all"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
          >
            binhnnt.98@gmail.com
          </a>
        </div>
        <div className="flex flex-col">
          <div className="font-light text-gray-500">My phone number</div>
          <a
            href="tel:039 766 56 60"
            className="font-bold text-lg hover:text-[#b23d43] transition-all"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
          >
            +84 39 766 56 60
          </a>
        </div>
      </div>
      <div className="flex gap-12">
        <a
          className="text-[#333] dark:text-[#fff] hover:text-[#3b5998] dark:hover:text-[#3b5998] transition-all text-4xl"
          href="https://www.facebook.com/thanhbinh2501"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook as IconProp} />
        </a>
        <a
          className="text-[#333] dark:text-[#fff] hover:text-[#bc2a8d] dark:hover:text-[#bc2a8d] transition-all text-4xl"
          href="https://www.instagram.com/thanhbinh98_/?hl=vi"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-instagram"></i>
          <FontAwesomeIcon icon={faInstagram as IconProp} />
        </a>
        <a
          className="text-[#333] dark:text-[#fff] hover:text-[#0e76a8] dark:hover:text-[#0e76a8] transition-all text-4xl"
          href="https://www.linkedin.com/in/binh-nguyen-7295b1225"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn as IconProp} />
        </a>
        <a
          className="text-[#333] dark:text-[#fff] hover:text-[#171515] dark:hover:text-[#171515] transition-all text-4xl"
          href="https://github.com/binhnguyen2501"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub as IconProp} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
