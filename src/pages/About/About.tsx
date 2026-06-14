import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { CustomCursorContext } from "../../contexts/CustomCursorContext";

import { SkillCategories, ExperienceList } from "../../constants";
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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

const SkillCard = styled.div`
  border: 1px solid #e8e8e8;
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  background: #fff;
  position: relative;
  overflow: hidden;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #b23d43;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  &:hover {
    border-color: rgba(178, 61, 67, 0.35);
    box-shadow: 0 10px 28px rgba(178, 61, 67, 0.08);
    transform: translateY(-2px);
  }

  &:hover::before {
    transform: scaleY(1);
  }
`;

const SkillCategory = styled.div`
  font-weight: 700;
  color: #333;
  margin-bottom: 0.875rem;
  font-size: 1rem;
  line-height: 1.4;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
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

interface Experience {
  timeline: string;
  position: string;
  company: string;
}

const About: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <React.Fragment>
      <Helmet>
        <title>Call me 𝓑𝓲𝓷𝓱 - All about me</title>
      </Helmet>
      <div className="md:py-10 py-6 lg:px-[8%] md:px-[4%] px-[8%]">
        <div className="md:mb-16 mb-8">
          <HighlightTitle title="Building Thoughtful," />
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
          >
            User-Centric Products.
          </motion.div>
        </div>
        <div className="flex flex-col lg:gap-12 md:gap-8 gap-14">
          <div className="flex flex-col md:flex-row lg:gap-10 gap-5">
            <div className="text-[#888] font-semibold leading-7 flex-1">
              <div className="h-full 2xl:text-lg text-base">
                <AboutName>
                  My name is{" "}
                  <span className="text-[#333]">Nguyen Ngoc Thanh Binh</span>{" "}
                  <span className="hand-shake">👋</span>
                </AboutName>
                <div>
                  <span className="font-bold text-[#333]">
                    Front-end Developer with five years of experience
                  </span>{" "}
                  building financial portfolio management applications and
                  integrating blockchain technologies.
                </div>
                <div className="mt-4">
                  Proficient across the front-end tech stack with a strong
                  foundation in UI/UX principles. Skilled at leveraging AI tools
                  such as Cursor IDE, Claude CLI, and Model Context Protocol
                  (MCP) to improve development efficiency. Brings solid back-end
                  fundamentals and a clear ambition to grow into a full-stack
                  engineer.
                </div>
                <div className="mt-4">
                  Collaborates closely with designers, business analysts, and
                  back-end teams to deliver user-centric products grounded in
                  practical, well-defined business logic.
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
                    src={require("../../assets/images/me.png")}
                    alt="Me"
                  />
                </div>
                <div className="bg-img absolute -z-10 2xl:right-[140px] 2xl:bottom-[-40px] lg:right-[50px] lg:bottom-[-40px] right-[-20px] bottom-[-40px] 2xl:w-[60%] w-[70%] h-[70%]"></div>
              </MeImg>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="container-About--content1 text-[#888] font-semibold leading-7 flex-1">
              <div className="text-2xl text-[#333] font-bold mb-2">
                Work Experience
              </div>
              <div className="w-12 h-1 bg-[#b23d43] rounded-full mb-8" />
              <ul className="list-disc flex flex-col gap-4">
                {ExperienceList.map((item: Experience, index: number) => {
                  return (
                    <li key={index}>
                      <div>{item.timeline}</div>
                      <div className="text-[#333] font-bold">
                        {item.position}
                      </div>
                      <div>At: {item.company}</div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="md:w-[45%] w-full text-[#888] font-semibold leading-7">
              <div className="text-2xl text-[#333] font-bold mb-2">
                Education
              </div>
              <div className="w-12 h-1 bg-[#b23d43] rounded-full mb-8" />
              <div className="md:pl-0 md:pr-0 pl-2 pr-5">
                <TimelineStudy>
                  <ul>
                    <li className="date" date-date="2020-2023">
                      <div className="title">Bach Khoa University</div>
                      <div>
                        Control Engineering and Automation - In-service
                        Education
                      </div>
                    </li>
                    <li className="date" date-date="2016-2019">
                      <div className="title">Cao Thang Technical College</div>
                      <div>
                        Control Engineering and Automation - Formal Education
                      </div>
                    </li>
                  </ul>
                </TimelineStudy>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:mt-0 -mt-6">
            <div className="text-2xl text-[#333] font-bold">Skills</div>
            <div className="w-12 h-1 bg-[#b23d43] rounded-full mb-8" />
            <SkillsGrid>
              {SkillCategories.map((skill, index) => (
                <SkillCard
                  key={index}
                  onMouseEnter={() => setType("hover-item")}
                  onMouseLeave={() => setType("default")}
                >
                  <SkillCategory>{skill.category}</SkillCategory>
                  <SkillTags>
                    {skill.items.map((item, itemIndex) => (
                      <SkillTag key={itemIndex}>{item}</SkillTag>
                    ))}
                  </SkillTags>
                </SkillCard>
              ))}
            </SkillsGrid>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
