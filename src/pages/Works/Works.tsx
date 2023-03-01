import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import { WorkList } from "../../constants";
import Footer from "../../components/Footer";
import HighlightTitle from "../../components/HighlightTitle";

interface Work {
  id: number;
  url: string;
  title: string;
  src: string;
  content: string;
}

const WorkContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;

  .title {
    display: inline-block;
    font-weight: 650;
    font-size: 1.35rem;
    margin-top: 24px;
    position: relative;

    .lineTwo {
      position: absolute;
      display: none;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: #b23d43;
      animation-duration: 1000ms;
      animation-name: main-flash;
      animation-fill-mode: forwards;
      transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    }
  }
`;

const WorkTitle = styled.div`
  :hover .lineTwo {
    width: 100%;
    display: block;
  }
  :hover .title {
    color: #b23d43;
  }
`;

const Works: React.FC = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Call me 𝓑𝓲𝓷𝓱 - All my works</title>
      </Helmet>
      <div className="md:py-10 py-6 lg:px-[8%] md:px-[4%] px-[8%]">
        <div className="md:mb-16 mb-8">
          <HighlightTitle title="All Works" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
          >
            made with passion.
          </motion.div>
        </div>
        <div className="flex flex-wrap 2xl:gap-[3rem] lg:gap-[5rem] gap-[2rem]">
          {WorkList.map((item: Work, index: number) => {
            return (
              <WorkContainer
                key={index}
                className="2xl:w-[23%] lg:w-[45%] md:w-[47%] w-full"
              >
                <WorkTitle>
                  <Link to={`/works/${item.url}`}>
                    <img
                      className="w-full md:h-[400px] h-[350px]"
                      src={item.src}
                      alt={item.title}
                    />
                    <TitleContainer>
                      <div className="title text-[#333] dark:text-[#fff]">
                        {item.title}
                        <div className="lineTwo"></div>
                      </div>
                    </TitleContainer>
                  </Link>
                  <div className="text-[#888] text-center mt-3 leading-7 px-4 pb-4">
                    {item.content}
                  </div>
                </WorkTitle>
              </WorkContainer>
            );
          })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Works;
