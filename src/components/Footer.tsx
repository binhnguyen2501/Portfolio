import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { CustomCursorContext } from "@/contexts/CustomCursorContext";

interface FooterProps {
  className?: string;
  iconClassName?: string;
  emailLabel?: string;
  phoneLabel?: string;
  labelClassName?: string;
}

const Footer: React.FC<FooterProps> = ({
  className = "",
  iconClassName = "text-4xl",
  emailLabel = "My mail contact",
  phoneLabel = "My phone number",
  labelClassName = "font-light text-gray-500",
}) => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <footer
      className={`flex md:flex-row flex-col gap-6 md:items-center justify-between md:h-[114px] h-full py-6 md:py-0 page-gutter ${className}`}
    >
      <div className="flex md:flex-row flex-col lg:gap-10 gap-6">
        <div className="flex flex-col">
          <div className={labelClassName}>{emailLabel}</div>
          <a
            href="mailto:binhnnt.98@gmail.com"
            className="font-bold text-lg hover:text-[color:var(--ink,#b23d43)] transition-all"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
          >
            binhnnt.98@gmail.com
          </a>
        </div>
        <div className="flex flex-col">
          <div className={labelClassName}>{phoneLabel}</div>
          <a
            href="tel:+84397665660"
            className="font-bold text-lg hover:text-[color:var(--ink,#b23d43)] transition-all"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
          >
            +84 39 766 56 60
          </a>
        </div>
      </div>
      <div className="flex gap-12">
        <a
          className={`text-[#333] hover:text-[#0e76a8] transition-all ${iconClassName}`}
          aria-label="LinkedIn (opens in a new tab)"
          href="https://www.linkedin.com/in/binh-nguyen-7295b1225"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedinIn as IconProp} />
        </a>
        <a
          className={`text-[#333] hover:text-[#171515] transition-all ${iconClassName}`}
          aria-label="GitHub (opens in a new tab)"
          href="https://github.com/binhnguyen2501"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faGithub as IconProp} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
