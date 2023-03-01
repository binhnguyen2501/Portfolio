import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

import { MainWorkList } from "../../constants";
import Footer from "../../components/Footer";
import SlideItem from "../../components/SlideItem";
import HighlightTitle from "../../components/HighlightTitle";

import ButtonStyled from "../../components/styledComponents/Button";
import InputRange from "../../components/styledComponents/InputRange";
import NextArrow from "../../components/styledComponents/NextArrow";
import PrevArrow from "../../components/styledComponents/PrevArrow";

const ContainerSlider = styled.div`
  height: 100%;
  position: relative;
  margin-top: 1.5rem;

  .slick-track {
    height: 620px;
  }

  .slick-arrow {
    display: none !important;
  }

  @media screen and (max-width: 900px) {
    .slick-track {
      height: 520px;
    }
  }

  @media screen and (max-width: 700px) {
    .slick-track {
      height: 420px;
    }
  }
`;

const AnimationBtn = styled.div`
  position: relative;

  :after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 0.2em;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  :active:after {
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.5);
    position: absolute;
    border-radius: 0.2em;
    left: 0;
    top: 0;
    opacity: 1;
    transition: 0s;
  }
`;

const Main: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: true,
    adaptiveHeight: true,
    cssEase: "linear",
    beforeChange: (current: number, next: number) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function handlePrevSlide() {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  }

  function handleNextSlide() {
    if (sliderRef && sliderRef.current) {
      sliderRef.current.slickNext();
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>Call me 𝓑𝓲𝓷𝓱</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          key="description"
          content="My name is Binh Nguyen. Welcome to my portfolio which contains all my personal information and personal projects I have worked on. Glad to know you"
        />
        <meta name="title" key="title" content="Call me 𝓑𝓲𝓷𝓱" />

        <meta property="og:title" key="og:title" content="Call me 𝓑𝓲𝓷𝓱" />
        <meta property="og:locale" key="og:locale" content="en_US" />
        <meta charSet="utf-8" />
        <meta property="og:type" key="og:type" content="website" />
        <meta
          property="og:description"
          key="og:description"
          content="My name is Binh Nguyen. Welcome to my portfolio which contains all my personal information and personal projects I have worked on. Glad to know you"
        />
        <meta
          property="og:image"
          key="og:image"
          content="https://photos.app.goo.gl/eowNZCgdoFR7XSDz7"
        />
      </Helmet>
      <div className="md:py-10 py-6 overflow-x-hidden">
        <div className="my-0 mx-auto lg:px-[8%] md:px-[4%] px-[8%]">
          <div className="mb-4">
            <HighlightTitle title="Hello!" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
            >
              I'm a creative
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
            >
              Front-end Developer
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
            >
              based in Vietnam.
            </motion.div>
          </div>
          <div className="md:w-[144px] w-full">
            <Link to="works">
              <ButtonStyled text="See all works" isForm={false}></ButtonStyled>
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="md:text-2xl text-xl font-semibold">
              <span className="text-[#b23d43] md:text-3xl text-2xl">
                {slideIndex + 1}
              </span>{" "}
              - {MainWorkList.length}
            </div>
            <InputRange
              value={((slideIndex + 1) * 100) / MainWorkList.length + 1}
              readOnly
              type="range"
              min={0}
              max={MainWorkList.length - 1}
            />
          </div>
          <div className="2xl:flex xl:hidden flex gap-4 mt-4">
            <AnimationBtn
              onClick={handlePrevSlide}
              className="border-2 rounded-lg py-2 px-6"
            >
              <i className="arrow left border-[#333] dark:border-[#fff]"></i>
            </AnimationBtn>
            <AnimationBtn
              onClick={handleNextSlide}
              className="border-2 rounded-lg py-2 px-6"
            >
              <i className="arrow right border-[#333] dark:border-[#fff]"></i>
            </AnimationBtn>
          </div>
        </div>
        <div className="2xl:w-[90%] 2xl:max-w-[1500px] 2xl:my-0 2xl:mx-auto">
          <ContainerSlider>
            <Slider ref={sliderRef} {...settings}>
              {MainWorkList.map((item, index) => {
                return <SlideItem item={item} key={index} />;
              })}
            </Slider>
            <div className="2xl:hidden xl:block hidden">
              <PrevArrow onClick={handlePrevSlide}>
                <div className="prev">
                  <span className="a"></span>
                  <span className="b"></span>
                </div>
              </PrevArrow>
              <NextArrow onClick={handleNextSlide}>
                <div className="next">
                  <span className="a"></span>
                  <span className="b"></span>
                </div>
              </NextArrow>
            </div>
          </ContainerSlider>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main;
