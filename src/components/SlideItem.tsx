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
    techStack: string[];
  };
}

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 620px;
  border-radius: 1rem;
  border: 1px solid #e8e8e8;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);

  &:hover {
    border-color: rgba(178, 61, 67, 0.35);
    box-shadow: 0 14px 32px rgba(178, 61, 67, 0.12);
    transform: translateY(-4px);
  }

  :hover .sliderContent {
    display: block;
  }

  .imageArea {
    flex: 1;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f7f7;

    img {
      width: 72%;
      height: 72%;
      object-fit: contain;
      transition: transform 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }
  }

  &:hover .imageArea img {
    transform: scale(1.03);
  }

  .cardFooter {
    padding: 1rem 1.25rem 1.15rem;
    border-top: 1px solid #ececec;
    background: #fff;
  }

  .cardTitle {
    font-size: 1.05rem;
    font-weight: 700;
    color: #333;
    line-height: 1.3;
  }

  .sliderContent {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    height: 100%;
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
      border-radius: 1rem 0 0 0;
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
      border-radius: 0 1rem 0 0;
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
      border-radius: 0 0 0 1rem;
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
      border-radius: 0 0 1rem 0;
    }

    :hover .rb {
      width: 50%;
      opacity: 1;
    }

    :hover .mainTitle,
    :hover .descriptionTitle,
    :hover .techTags,
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
      top: 10%;
      opacity: 0;
      animation-duration: 1000ms;
      animation-name: slide-in-up, fade-in;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }

    .descriptionTitle {
      position: absolute;
      width: 100%;
      color: rgba(255, 255, 255, 0.92);
      padding-left: 8%;
      padding-right: 8%;
      z-index: 3;
      left: 0;
      top: 22%;
      font-weight: 600;
      line-height: 1.6;
      opacity: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      animation-duration: 1000ms;
      animation-name: slide-in-down, fade-in;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }

    .techTags {
      position: absolute;
      left: 8%;
      right: 8%;
      bottom: 18%;
      z-index: 3;
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      opacity: 0;
      animation-duration: 1000ms;
      animation-name: fade-in;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }

    .techTag {
      font-size: 0.7rem;
      font-weight: 600;
      color: #fff;
      background: rgba(255, 255, 255, 0.14);
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 9999px;
      padding: 0.3rem 0.65rem;
      line-height: 1;
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
      bottom: 8%;
      opacity: 0;
      font-weight: 700;
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
    height: 520px;
  }

  @media screen and (max-width: 700px) {
    height: 420px;

    .cardTitle {
      font-size: 0.95rem;
    }
  }
`;

const SlideItem = ({ item }: Props) => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <Container
      onMouseUp={() => setType("default")}
      onMouseDown={() => setType("slider-drag")}
    >
      <div className="imageArea">
        <img src={item.src} alt={`${item.title} project preview`} />
      </div>
      <div className="cardFooter">
        <div className="cardTitle">{item.title}</div>
      </div>
      <div className="sliderContent">
        <span className="img-mask lt"></span>
        <span className="img-mask rt"></span>
        <span className="img-mask lb"></span>
        <span className="img-mask rb"></span>
        <p className="mainTitle md:text-3xl text-2xl">{item.title}</p>
        <p className="descriptionTitle md:text-lg text-base">{item.content}</p>
        <div className="techTags">
          {item.techStack.map((tech) => (
            <span className="techTag" key={tech}>
              {tech}
            </span>
          ))}
        </div>
        <Link
          to={`/works/${item.url}`}
          className="moreBtn md:text-xl text-lg"
        >
          <div>View Project</div>
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
  );
};

export default SlideItem;
