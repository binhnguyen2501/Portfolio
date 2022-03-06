import { useContext } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { CustomCursorContext } from "../contexts/CustomCursorContext";
import DarkModeToggle from "../components/DarkModeToggle";

interface Props {
  active: boolean;
  toggle(): void;
}

interface IProps {
  open?: boolean;
}

const HeaderMobile = styled.button<IProps>`
  z-index: 99999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: none;

  .img-mask {
    position: absolute;
    z-index: 99999;
    background: #b23d43;
  }

  .lt {
    left: 0;
    top: 0;
    width: 25%;
    height: 50.5%;
    opacity: 0;
    transition: all 200ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .lt-active {
    animation-duration: 320ms;
    animation-name: lt-active;
    animation-fill-mode: forwards;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .rt {
    right: 0;
    top: 0;
    width: 50.5%;
    height: 25%;
    opacity: 0;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .rt-active {
    animation-duration: 300ms;
    animation-delay: 110ms;
    animation-name: rt-active;
    animation-fill-mode: forwards;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .lb {
    left: 0;
    bottom: 0;
    width: 50.5%;
    height: 25%;
    opacity: 0;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .lb-active {
    animation-duration: 200ms;
    animation-delay: 200ms;
    animation-name: lb-active;
    animation-fill-mode: forwards;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .rb {
    right: 0;
    bottom: 0;
    width: 25%;
    height: 50.5%;
    opacity: 0;
    transition: all 400ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .rb-active {
    animation-duration: 200ms;
    animation-delay: 170ms;
    animation-name: rb-active;
    animation-fill-mode: forwards;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  .nav-links--mobile {
    position: relative;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    list-style: none;

    li:nth-child(1) {
      animation-delay: 100ms;
    }

    li:nth-child(2) {
      animation-delay: 150ms;
    }

    li:nth-child(3) {
      animation-delay: 200ms;
    }

    li:nth-child(4) {
      animation-delay: 250ms;
    }

    .nav-links--mobile----link {
      font-size: 2.5rem;
      height: 64px;
      opacity: 0;
      padding-top: 64px;
      animation-duration: 400ms;
      animation-name: menu-mask-active;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);

      a {
        text-decoration: none;
        font-weight: 700;
      }

      :hover {
        transform: scale(1.5) translateZ(0);
      }
    }
  }

  ${(props) =>
    props.open &&
    css`
      display: block;
      z-index: 99998;
    `}
`;

const MobileHeader = ({ active, toggle }: Props) => {
  const { setType } = useContext(CustomCursorContext);

  const handleClickLink = () => {
    setType("default");
    toggle();
  };

  return (
    <HeaderMobile open={active}>
      <span className="img-mask lt lt-active"></span>
      <span className="img-mask rt rt-active"></span>
      <span className="img-mask lb lb-active"></span>
      <span className="img-mask rb rb-active"></span>

      <ul className="nav-links--mobile">
        <div className="absolute top-[1.9rem] left-[1rem]">
          <DarkModeToggle />
        </div>
        <li
          className="nav-links--mobile----link text-[#fff] dark:text-[#333]"
          onMouseEnter={() => setType("hover-item")}
          onMouseLeave={() => setType("default")}
        >
          <Link to="/About" onClick={handleClickLink}>
            About
          </Link>
        </li>
        <li
          className="nav-links--mobile----link text-[#fff] dark:text-[#333]"
          onMouseEnter={() => setType("hover-item")}
          onMouseLeave={() => setType("default")}
        >
          <Link to="/Works" onClick={handleClickLink}>
            Works
          </Link>
        </li>
        <li
          className="nav-links--mobile----link text-[#fff] dark:text-[#333]"
          onMouseEnter={() => setType("hover-item")}
          onMouseLeave={() => setType("default")}
        >
          <Link to="/Contact" onClick={handleClickLink}>
            Contact
          </Link>
        </li>
        <li
          className="nav-links--mobile----link text-[#fff] dark:text-[#333]"
          onMouseEnter={() => setType("hover-item")}
          onMouseLeave={() => setType("default")}
        >
          <a
            href="./CV_Nguyen_Ngoc_Thanh_Binh_Frontend_Developer.pdf"
            onClick={handleClickLink}
          >
            Resume
          </a>
        </li>
      </ul>
    </HeaderMobile>
  );
};

export default MobileHeader;
