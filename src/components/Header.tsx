import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";

import MobileHeader from "../components/MobileHeader";
import HamburgerMenu from "../components/HamburgerMenu";
import { CustomCursorContext } from "../contexts/CustomCursorContext";
import { CheckRouteWorkContext } from "../contexts/CheckRouteWorkContext";
import SoundBar from "../components/SoundBar";
import DarkModeToggle from "../components/DarkModeToggle";

const IS_MOBILE_STORAGE_STATE = "IS_MOBILE_STORAGE_STATE";

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isScroll, setScroll] = useState<boolean>(false);
  const [isHiddenCursor, setHiddenCursor] = useState<boolean>(false);
  const headerHeight = useRef<HTMLDivElement>(null);
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
    if (!isHiddenCursor) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHiddenCursor]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleScroll() {
    if (headerHeight && headerHeight.current) {
      if (window.scrollY >= headerHeight.current.clientHeight) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
  }

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
        <div
          ref={headerHeight}
          className="relative flex items-center justify-between lg:px-[8%] md:px-[4%] px-[8%] h-[100px] bg-white dark:bg-[#333]"
        >
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-[#333] dark:text-[#fff] text-lg"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Nguyen <span className="font-bold">Binh</span>
            </Link>
            <SoundBar />
          </div>
          <div className="text-[#333] lg:gap-11 md:gap-6 lg:flex lg:items-center hidden">
            <Link
              to="about"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333] dark:text-[#fff] dark:hover:text-[#b23d43]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              About
            </Link>
            <Link
              to="works"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333] dark:text-[#fff] dark:hover:text-[#b23d43]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Works
            </Link>
            <Link
              to="contact"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333] dark:text-[#fff] dark:hover:text-[#b23d43]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Contact
            </Link>
            <a
              href="./CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Developer.pdf"
              className="font-bold text-lg hover:text-[#b23d43] transition-all text-[#333] dark:text-[#fff] dark:hover:text-[#b23d43]"
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
              onClick={() => setType("default")}
            >
              Resume
            </a>
            <DarkModeToggle />
          </div>
          <HamburgerMenu
            active={isOpen}
            scroll={isScroll}
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
