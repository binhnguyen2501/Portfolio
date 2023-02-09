import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import styled, { keyframes } from "styled-components";
import { CustomCursorContext } from "../../contexts/CustomCursorContext";
import { CheckRouteWorkContext } from "../../contexts/CheckRouteWorkContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { WorkDetailList } from "../../constants";
import SoundBar from "../../components/SoundBar";
import TextAnimation from "../../components/styledComponents/TextAnimation";

const animation = keyframes`
  0% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
  }
`;

const Title = styled.div`
  opacity: 0;
  display: inline-block;
  animation-name: ${animation};
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
`;

const HeaderWork = styled.div`
  background: ${(props) => ` ${props.color}`};
  border: 1px solid ${(props) => ` ${props.color}`};
`;

const TitleWork = styled.div`
  background: ${(props) => ` ${props.color}`};
`;

const BgWork = styled.div`
  background: ${(props) => ` ${props.color}`};
`;

const VisitBtn = styled.div`
  margin-right: 2rem;
  transition: all 0.2s ease;
  a {
    font-weight: 650;
    text-decoration: none;
  }
  :hover {
    margin-right: 0rem;
  }
`;

interface Item {
  id: number;
  url: string;
  title: string;
  frontend: string;
  backend: string;
  year: string;
  bgColor: string;
  src: string[];
  video: string;
  link: string;
  content: string;
}

const Work = () => {
  const { workName } = useParams();
  const { toggleRoute } = useContext(CheckRouteWorkContext);
  const { setType } = useContext(CustomCursorContext);
  const [work, setWork] = useState<Item>({
    id: -1,
    url: "",
    title: "",
    frontend: "",
    backend: "",
    year: "",
    bgColor: "",
    src: [],
    video: "",
    link: "",
    content: "",
  });

  useEffect(() => {
    getWork();
  }, []);

  useEffect(() => {
    toggleRoute(true);
  }, []);

  const getWork = () => {
    WorkDetailList.map((item: Item) => {
      if (item.url === workName) {
        setWork(item);
      }
      return null;
    });
  };

  const handleClickLogo = () => {
    toggleRoute(false);
    setType("default");
  };

  return (
    <div className="overflow-hidden">
      <HeaderWork
        color={work.bgColor}
        className="relative flex items-center justify-between lg:px-[8%] md:px-[4%] px-[8%] h-[100px]"
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-[#333] text-lg"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
            onClick={handleClickLogo}
          >
            Nguyen <span className="font-bold">Binh</span>
          </Link>
          <SoundBar />
        </div>
        <div>
          <Link
            to="/works"
            className="text-[#333] text-lg"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
            onClick={handleClickLogo}
          >
            Back
            <span>
              <FontAwesomeIcon
                icon={faArrowRight as IconProp}
                className="arrowBack"
              />
            </span>
          </Link>
        </div>
      </HeaderWork>

      <div className="h-[calc(100vh_-_100px)] relative -mt-1">
        <TitleWork
          color={work.bgColor}
          className="xl:pt-[4rem] flex flex-col items-center xl:justify-start justify-center text-center h-full"
        >
          <Title className="lg:text-[7rem] md:text-[6rem] text-[3.1rem] font-semibold mb-[0.1rem]">
            {work.title}
          </Title>
          <TextAnimation />
        </TitleWork>
        <div className="xl:w-[70%] w-[90%] my-0 mx-auto absolute xl:top-[20rem] left-0 right-0">
          <div className="xl:h-[500px]">
            <video
              controls
              autoPlay
              className="w-full h-full focus:outline-hidden"
            >
              <source src={work.video} type="video/mp4" />
            </video>
          </div>
          <div className="flex justify-between mt-[1rem]">
            <div className="flex md:flex-row flex-col justify-start md:gap-[5rem] gap-[0.5rem]">
              <div className="text-[#717171] dark:text-[#fff]">
                <div>Front-End</div>
                <div className="uppercase text-lg font-bold text-[#333] dark:text-[#fff]">
                  {work.frontend}
                </div>
              </div>
              <div className="text-[#717171] dark:text-[#fff]">
                <div>Back-End</div>
                <div className="uppercase text-lg font-bold text-[#333] dark:text-[#fff]">
                  {work.backend}
                </div>
              </div>
              <div className="text-[#717171] dark:text-[#fff]">
                <div>Year</div>
                <div className="uppercase text-lg font-bold text-[#333] dark:text-[#fff]">
                  {work.year}
                </div>
              </div>
            </div>
            <VisitBtn className="flex md:items-center items-start">
              <a href={work.link} className="text-[#333] dark:text-[#fff]">
                Visit Website ❯
              </a>
            </VisitBtn>
          </div>
        </div>
      </div>

      <div className="xl:mt-[300px] lg:mt-[600px] md:mt-[500px] mt-[420px] xl:w-[70%] w-[90%] my-0 mx-auto relative mb-[8rem]">
        <div className="w-full flex flex-wrap items-center justify-center gap-9">
          {work.src.map((item: string, index: number) => {
            return (
              <div className="lg:w-[45%] md:w-[45%] w-[95%]" key={index}>
                <Tilt
                  tiltMaxAngleX={35}
                  tiltMaxAngleY={35}
                  perspective={900}
                  transitionSpeed={2000}
                  gyroscope={true}
                >
                  <img
                    className="w-full h-full"
                    src={item}
                    key={index}
                    alt={work.title}
                  />
                </Tilt>
              </div>
            );
          })}
        </div>
        <BgWork
          color={work.bgColor}
          className="absolute top-[9rem] left-0 right-0 mx-auto w-[100%] h-[75%] z-[-1]"
        ></BgWork>
      </div>
    </div>
  );
};

export default Work;
