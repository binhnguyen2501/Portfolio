import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
import { motion } from "framer-motion";
// Components
import Footer from "../components/Footer";
import SlideItem from "../components/SlideItem";
import HighlightTitle from "../components/HighlightTitle";
// Styled Components
import ButtonStyled from "../components/styledComponents/Button";
import InputRange from "../components/styledComponents/InputRange";
import NextArrow from "../components/styledComponents/NextArrow";
import PrevArrow from "../components/styledComponents/PrevArrow";

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

  const items = [
    {
      id: 1,
      url: "CoranoJewelry",
      title: "Corano Jewelry",
      src: require("../assets/images/Corano.png"),
      content:
        "Corano Jewelry website created by HTML CSS and Vanilla JavaScript.",
    },
    {
      id: 2,
      url: "Kyyeudreamers",
      title: "Kyyeudreamers",
      src: require("../assets/images/Kyyeudreammer.png"),
      content:
        "Landing-Page created by HTML utility-first CSS framework and Javascript Framework.",
    },
    {
      id: 3,
      url: "IronFitness",
      title: "Iron Fitness",
      src: require("../assets/images/IronFitness.png"),
      content:
        "This is the first fitness Landing-Page created by HTML CSS and Vanilla JavaScript.",
    },
  ];

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
    <>
      <div className="md:py-10 py-6 overflow-x-hidden">
        <div className="lg:px-[8%] md:px-[4%] px-[8%]">
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
            <Link to="/Works">
              <ButtonStyled text="See all works" isForm={false}></ButtonStyled>
            </Link>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="md:text-2xl text-xl font-semibold">
              <span className="text-[#b23d43] md:text-3xl text-2xl">
                {slideIndex + 1}
              </span>{" "}
              - {items.length}
            </div>
            <InputRange
              value={((slideIndex + 1) * 100) / items.length + 1}
              readOnly
              type="range"
              min={0}
              max={items.length - 1}
            />
          </div>
          <div className="xl:hidden flex gap-4 mt-4">
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
        <div className="h-full mt-6 relative">
          <Slider ref={sliderRef} {...settings}>
            {items.map((item, index) => {
              return <SlideItem item={item} key={index} />;
            })}
          </Slider>
          <div className="xl:block hidden">
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
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
