import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { CustomCursorContext } from "../contexts/CustomCursorContext";

interface Props {
  item: {
    id: number;
    url: string;
    title: string;
    src: string;
    content: string;
  };
}

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 600px;
  border-radius: 8%;
  box-shadow: -15px -15px 15px rgba(255, 255, 255, 0.2),
    15px 15px 15px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 600px;
    border-radius: 8%;
  }

  :hover .sliderContent {
    display: block;
  }

  .sliderContent {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    height: 600px;
    width: 100%;

    .img-mask {
      position: absolute;
      z-index: 2;
      background: #b23d43;
    }

    .lt {
      left: 0;
      top: 0;
      width: 25%;
      height: 50.5%;
      opacity: 0;
      transition: all 200ms cubic-bezier(0.77, 0, 0.175, 1);
      border-radius: 16% 0 0 0;
    }

    :hover .lt {
      width: 50%;
      opacity: 1;
    }

    .rt {
      right: 0;
      top: 0;
      width: 50.5%;
      height: 25%;
      opacity: 0;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
      border-radius: 0 16% 0 0;
    }

    :hover .rt {
      height: 50%;
      opacity: 1;
    }

    .lb {
      left: 0;
      bottom: 0;
      width: 50.5%;
      height: 25%;
      opacity: 0;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
      border-radius: 0 0 0 16%;
    }

    :hover .lb {
      height: 50%;
      opacity: 1;
    }

    .rb {
      right: 0;
      bottom: 0;
      width: 25%;
      height: 50.5%;
      opacity: 0;
      transition: all 400ms cubic-bezier(0.77, 0, 0.175, 1);
      border-radius: 0 0 16% 0;
    }

    :hover .rb {
      width: 50%;
      opacity: 1;
    }

    :hover .mainTitle,
    :hover .descriptionTitle,
    :hover .moreBtn {
      opacity: 1;
    }

    .mainTitle {
      position: absolute;
      font-weight: 700;
      color: #fff;
      padding-left: 8%;
      padding-right: 8%;
      z-index: 3;
      left: 0;
      top: 12%;
      opacity: 0;
      animation-duration: 1000ms;
      animation-name: slide-in-up, fade-in;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }

    .descriptionTitle {
      position: absolute;
      width: 100%;
      color: #fff;
      padding-left: 8%;
      padding-right: 8%;
      z-index: 3;
      left: 0;
      bottom: 30%;
      font-weight: 600;
      opacity: 0;
      animation-duration: 1000ms;
      animation-name: slide-in-down, fade-in;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }

    .moreBtn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 8%;
      padding-top: 1%;
      padding-bottom: 1%;
      z-index: 3;
      left: 0;
      bottom: 10%;
      opacity: 0;
      font-weight: 600;
      text-decoration: none;
      color: #fff;
      cursor: pointer;

      :hover polygon,
      :hover path {
        transition: all 1s ease;
      }

      :hover .arrow {
        animation: arrow-anim 2.5s ease infinite;
      }

      :hover .arrow-fixed {
        animation: arrow-fixed-anim 2.5s ease infinite;
      }

      .arrowLink {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.5rem;

        svg {
          fill: #fff;
          overflow: visible;

          polygon,
          path {
            transition: all 0.5s ease;
          }
        }
      }
    }
  }

  @media screen and (max-width: 900px) {
    height: 500px;
    img {
      height: 500px;
    }
    .sliderContent {
      height: 500px;
    }
  }

  @media screen and (max-width: 700px) {
    height: 400px;
    img {
      height: 400px;
    }
    .sliderContent {
      height: 400px;
    }
  }
`;

const SlideItem = ({ item }: Props) => {
  const { setType } = useContext(CustomCursorContext);

  const handleOnMouseUp = () => {
    setType("default");
  };

  const handleOnMouseDown = () => {
    setType("slider-drag");
  };

  return (
    <React.Fragment>
      <Container
        className="sliderAll"
        onMouseUp={handleOnMouseUp}
        onMouseDown={handleOnMouseDown}
      >
        <img src={item.src} alt={item.title} />
        <div className="sliderContent">
          <span className="img-mask lt"></span>
          <span className="img-mask rt"></span>
          <span className="img-mask lb"></span>
          <span className="img-mask rb"></span>
          <p className="mainTitle md:text-4xl text-2xl">{item.title}</p>
          <p className="descriptionTitle md:text-2xl text-xl">{item.content}</p>
          <Link
            to={`/works/${item.url}`}
            className="moreBtn md:text-2xl text-xl"
          >
            <div>More</div>
            <div className="arrowLink">
              <svg
                width="18px"
                height="17px"
                viewBox="-1 0 18 17"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <polygon
                  className="arrow"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <polygon
                  className="arrow-fixed"
                  points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"
                ></polygon>
                <path d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
              </svg>
            </div>
          </Link>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default SlideItem;
