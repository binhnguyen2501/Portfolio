import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import MobileHeader from "../components/MobileHeader";
import HamburgerMenu from "../components/HamburgerMenu";
import { CustomCursorContext } from "../contexts/CustomCursorContext";
import { CheckRouteWorkContext } from "../contexts/CheckRouteWorkContext";

const IS_MOBILE_STORAGE_STATE = "IS_MOBILE_STORAGE_STATE";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isHiddenCursor, setHiddenCursor] = useState<boolean>(false);
  const { setType } = useContext(CustomCursorContext);
  const { isRoute } = useContext(CheckRouteWorkContext);

  useEffect(() => {
    const storageIsMobile: any = localStorage.getItem(IS_MOBILE_STORAGE_STATE);
    if (storageIsMobile) {
      setHiddenCursor(JSON.parse(storageIsMobile));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      IS_MOBILE_STORAGE_STATE,
      JSON.stringify(isHiddenCursor)
    );
  }, [isHiddenCursor]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 850) {
      setHiddenCursor(true);
    } else {
      setHiddenCursor(false);
    }
  };

  return (
    <React.Fragment>
      {!isRoute && (
        <div className="relative flex items-center justify-between lg:px-[8%] md:px-[4%] px-[8%] h-[100px] bg-white">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-[#333] text-lg"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Nguyen <span className="font-bold">Binh</span>
            </Link>
          </div>
          <div className="text-[#333] lg:gap-11 md:gap-6 lg:flex lg:items-center hidden">
            <Link
              to="about"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              About
            </Link>
            <Link
              to="works"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Projects
            </Link>
            <a
              href="./CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Developer.pdf"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Resume
            </a>
          </div>
          <HamburgerMenu
            active={isOpen}
            isHiddenCursor={isHiddenCursor}
            toggle={() => setOpen(!isOpen)}
          />
          {isOpen && (
            <MobileHeader active={isOpen} toggle={() => setOpen(!isOpen)} />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
