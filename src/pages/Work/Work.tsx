import { useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import styled, { keyframes } from "styled-components";
import { CustomCursorContext } from "@/contexts/CustomCursorContext";
import { CheckRouteWorkContext } from "@/contexts/CheckRouteWorkContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { WorkDetailList } from "@/constants";
import TextAnimation from "@/components/styledComponents/TextAnimation";
import Seo from "@/components/Seo";
import { getProjectJsonLd, getProjectSeo } from "@/seo";

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

const Title = styled.h1`
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

const TechTag = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #666;
  background: #f7f7f7;
  border: 1px solid #ececec;
  border-radius: 9999px;
  padding: 0.4rem 0.8rem;
  line-height: 1;
  transition: all 200ms ease;

  &:hover {
    color: #b23d43;
    border-color: #b23d43;
    background: rgba(178, 61, 67, 0.06);
  }
`;

interface Item {
  id: number;
  url: string;
  title: string;
  bgColor: string;
  src: string[];
  video: string;
  content: string;
  techStack: string[];
}

const EMPTY_WORK: Item = {
  id: -1,
  url: "",
  title: "",
  bgColor: "",
  src: [],
  video: "",
  content: "",
  techStack: [],
};

const Work = () => {
  const { workName } = useParams();
  const { toggleRoute } = useContext(CheckRouteWorkContext);
  const { setType } = useContext(CustomCursorContext);
  const work =
    WorkDetailList.find((item) => item.url === workName) ?? EMPTY_WORK;

  useEffect(() => {
    toggleRoute(true);
    return () => toggleRoute(false);
  }, [toggleRoute]);

  const handleClickLogo = () => {
    toggleRoute(false);
    setType("default");
  };

  const projectSeo = workName ? getProjectSeo(workName) : null;
  const projectJsonLd = workName ? getProjectJsonLd(workName) : null;

  return (
    <div className="overflow-hidden">
      {projectSeo && (
        <Seo
          title={projectSeo.title}
          description={projectSeo.description}
          path={projectSeo.path}
          type="article"
          keywords={projectSeo.keywords}
          jsonLd={projectJsonLd || undefined}
        />
      )}
      <HeaderWork
        color={work.bgColor}
        className="relative flex items-center justify-between lg:px-[8%] md:px-[4%] px-[8%] h-[100px]"
      >
        <div className="flex items-center">
          <Link
            to="/"
            className="text-[#333] text-lg"
            onMouseEnter={() => setType("hover-item")}
            onMouseLeave={() => setType("default")}
            onClick={handleClickLogo}
          >
            Nguyen <span className="font-bold">Binh</span>
          </Link>
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
          <div className="mt-8 flex flex-col gap-6">
            <div>
              <div className="text-2xl text-[#333] font-bold mb-2">
                Description
              </div>
              <div className="w-12 h-1 bg-[#b23d43] rounded-full mb-4" />
              <p className="text-[#888] font-semibold leading-7">
                {work.content}
              </p>
            </div>
            <div>
              <div className="text-2xl text-[#333] font-bold mb-2">
                Tech Stack
              </div>
              <div className="w-12 h-1 bg-[#b23d43] rounded-full mb-4" />
              <div className="flex flex-wrap gap-2">
                {work.techStack.map((tech, index) => (
                  <TechTag key={index}>{tech}</TechTag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:mt-[380px] lg:mt-[680px] md:mt-[580px] mt-[500px] xl:w-[70%] w-[90%] my-0 mx-auto relative mb-[8rem]">
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
                    alt={`${work.title} project screenshot ${index + 1}`}
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
