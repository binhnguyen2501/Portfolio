import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { CustomCursorContext } from "../../contexts/CustomCursorContext";

import { skills, experiences } from "../../constant/constants";
import Footer from "../../components/Footer";
import HighlightTitle from "../../components/HighlightTitle";

const animation = keyframes`
  0% { transform: rotate( 0.0deg) };
  10% { transform: rotate(14.0deg) }; 
  20% { transform: rotate(-8.0deg) };
  30% { transform: rotate(14.0deg) };
  40% { transform: rotate(-4.0deg) };
  50% { transform: rotate(10.0deg) };
  60% { transform: rotate( 0.0deg) }; 
  100% { transform: rotate( 0.0deg) };
`;

const AboutName = styled.div`
  margin-bottom: 1rem;

  .hand-shake {
    animation-name: ${animation};
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    transform-origin: 70% 70%;
    display: inline-block;
  }

  span {
    font-weight: 700;
  }
`;

const MeImg = styled.div`
  width: 100%;
  position: relative;

  .me {
    width: 100%;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    :hover {
      transform: scale(1.1) translateZ(0);
    }
  }

  .bg-img {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TimelineStudy = styled.div`
  border-left: 4px solid #b23d43;
  border-radius: 0.8rem;
  margin: 1rem auto;
  margin-bottom: 2rem;
  position: relative;
  padding: 1.5rem 2rem 0.5rem 2rem;
  list-style: none;
  text-align: left;
  width: 100%;

  ul {
    .date {
      .title {
        font-weight: 650;
      }

      border-bottom: 1px solid #888888;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      position: relative;
      list-style: none;

      ::after,
      ::before {
        position: absolute;
        display: block;
        top: 15%;
        transform: translateY(-50%);
      }

      ::after {
        content: "";
        box-shadow: 0 0 0 4px #333;
        border-radius: 100%;
        left: -2.5rem;
        height: 0.8rem;
        width: 0.8rem;
        background-color: #fff;
      }

      ::before {
        content: attr(date-date);
        left: -15.5rem;
        text-align: right;
        min-width: 12rem;
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 43.75em) {
    padding: 1.5rem 0.8rem 0.5rem 0.8rem;
    width: 100%;
    font-size: 0.9rem;
    ul {
      .date {
        ::before {
          font-size: 1rem;
          right: -2rem;
        }
        ::after {
          left: -1.3rem;
        }
      }
    }
  }
`;

const Skills = styled.div`
.skill {
  :hover {
    color: #fff;
    background: #b23d43;
    box-shadow: 0 0 50px #b23d43;
    transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
    transition-delay: 0.1s;
  }

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-top: 2px solid #b23d43;
    border-left: 2px solid #b23d43;
    transition: 0.5s;
  }

  :hover::before {
    width: 100%;
    height: 100%;
  }

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-bottom: 2px solid #b23d43;
    border-right: 2px solid #b23d43;
    transition: 0.5s;
  }

  :hover::after {
    width: 100%;
    height: 100%;
  }

  ::after {
    content: "";
    display: block;
    clear: both;
  }
`;

interface Experience {
  timeline: string;
  position: string;
  company: string;
}

const About: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <>
      <div className="md:py-10 py-6 w-[90%] max-w-[1400px] my-0 mx-auto">
        <div className="md:mb-16 mb-8">
          <HighlightTitle title="Living Young," />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
          >
            Wild and Free.
          </motion.div>
        </div>

        <div className="flex flex-col lg:gap-12 md:gap-8 gap-14">
          <div className="flex flex-col md:flex-row lg:gap-10 gap-5">
            <div className="text-[#888] font-semibold leading-7 flex-1">
              <div className="h-full 2xl:text-lg text-base">
                <AboutName>
                  My name is{" "}
                  <span className="text-[#333] dark:text-[#fff]">
                    Nguyen Ngoc Thanh Binh
                  </span>{" "}
                  <span className="hand-shake">👋</span>
                </AboutName>
                <div>
                  And I am a Front-end Developer in Vietnam interested in
                  designing a website with a comprehensive design process
                  centered on user interaction and experience to create perfect
                  web pages. I am a fan of digital and technology, design and
                  always have a focus on simplicity and care for everyone's
                  experience.
                </div>
                <div className="mt-4">
                  As a Front-end Developer with a passion for website design, my
                  aspiration is to live and work in a creative and dynamic
                  environment, together with people who have the same passion to
                  create high quality websites. human for human life !!
                </div>
              </div>
            </div>
            <div className="md:w-[45%] w-full">
              <MeImg
                onMouseEnter={() => setType("hover-item")}
                onMouseLeave={() => setType("default")}
              >
                <div className="2xl:w-[70%] lg:w-[80%] w-[100%] overflow-hidden">
                  <img
                    className="me"
                    src={require("../../assets/images/me.jpg")}
                    alt="Me"
                  />
                </div>
                <div className="bg-img absolute -z-10 2xl:right-[140px] 2xl:bottom-[-40px] lg:right-[50px] lg:bottom-[-40px] right-[-20px] bottom-[-40px] 2xl:w-[60%] w-[70%] h-[70%]"></div>
              </MeImg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:gap-10 gap-5">
            <div className="container-About--content1 text-[#888] font-semibold leading-7 flex-1">
              <div className="text-2xl text-[#333] dark:text-[#fff] font-bold">
                Work Experience
              </div>
              <ul className="list-disc flex flex-col gap-4 mt-4">
                {experiences.map((item: Experience, index: number) => {
                  return (
                    <li key={index}>
                      <div>{item.timeline}</div>
                      <div className="text-[#333] dark:text-[#fff] font-bold">
                        {item.position}
                      </div>
                      <div>At: {item.company}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="md:w-[45%] w-full text-[#888] font-semibold leading-7 flex flex-col gap-4">
              <div>
                <div className="text-2xl text-[#333] dark:text-[#fff] font-bold">
                  Education
                </div>
                <div className="md:pl-0 md:pr-0 pl-2 pr-5">
                  <TimelineStudy>
                    <ul>
                      <li className="date" date-date="2020-Present">
                        <div className="title">Bach Khoa University</div>
                        <div>
                          Control Engineering and Automation - The Degree of
                          Engineer (part-time)
                        </div>
                      </li>
                      <li className="date" date-date="2016-2019">
                        <div className="title">Cao Thang Technical College</div>
                        <div>
                          Control Engineering and Automation - College Degree
                        </div>
                      </li>
                    </ul>
                  </TimelineStudy>
                </div>
              </div>
              <div>
                <div className="text-2xl text-[#333] dark:text-[#fff] font-bold mb-6">
                  Skills
                </div>
                <Skills className="flex md:flex-row flex-col flex-wrap gap-6">
                  {skills.map((item: string, index: number) => {
                    return (
                      <div
                        className="skill md:text-base text-xl md:w-[40%] w-full block relative text-center font-semibold overflow-hidden py-[10px] px-[20px]"
                        key={index}
                      >
                        {item}
                      </div>
                    );
                  })}
                </Skills>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
