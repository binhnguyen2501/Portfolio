import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { WorkList } from "../../constants";
import Footer from "../../components/Footer";
import HighlightTitle from "../../components/HighlightTitle";
import Seo from "../../components/Seo";
import { PAGE_SEO } from "../../seo";
import { CustomCursorContext } from "../../contexts/CustomCursorContext";

interface Project {
  id: number;
  url: string;
  title: string;
  src: string;
  content: string;
  techStack: string[];
}

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
`;

const ProjectCard = styled.article`
  border: 1px solid #e8e8e8;
  border-radius: 1rem;
  overflow: hidden;
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
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
    z-index: 1;
  }

  &:hover {
    border-color: rgba(178, 61, 67, 0.35);
    box-shadow: 0 14px 32px rgba(178, 61, 67, 0.1);
    transform: translateY(-4px);
  }

  &:hover::before {
    transform: scaleY(1);
  }

  &:hover .project-image img {
    transform: scale(1.05);
  }

  &:hover .view-link {
    color: #b23d43;
    gap: 0.75rem;
  }
`;

const ImageWrap = styled.div`
  background: #f7f7f7;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 75%;
    height: 75%;
    object-fit: contain;
    transition: transform 300ms cubic-bezier(0.77, 0, 0.175, 1);
  }

  @media (min-width: 768px) {
    height: 320px;
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const CardBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  color: #333;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #888;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  background: #f7f7f7;
  border: 1px solid #ececec;
  border-radius: 9999px;
  padding: 0.35rem 0.7rem;
  line-height: 1;
`;

const ViewLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #333;
  transition: all 200ms ease;
`;

const Works: React.FC = () => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <React.Fragment>
      <Seo
        title={PAGE_SEO.works.title}
        description={PAGE_SEO.works.description}
        path={PAGE_SEO.works.path}
      />
      <div className="md:py-10 py-6 lg:px-[8%] md:px-[4%] px-[8%]">
        <div className="md:mb-16 mb-8">
          <HighlightTitle title="Selected Projects," />
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="lg:text-7xl md:text-6xl text-3xl font-bold mt-3"
          >
            Crafted with Purpose.
          </motion.h1>
        </div>
        <ProjectGrid>
          {WorkList.map((item: Project) => (
            <ProjectCard
              key={item.id}
              onMouseEnter={() => setType("hover-item")}
              onMouseLeave={() => setType("default")}
            >
              <CardLink to={`/works/${item.url}`}>
                <ImageWrap className="project-image">
                  <img src={item.src} alt={`${item.title} project preview`} />
                </ImageWrap>
                <CardBody>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.content}</CardDescription>
                  <TechTags>
                    {item.techStack.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </TechTags>
                  <ViewLink className="view-link">
                    View Project
                    <span aria-hidden="true">→</span>
                  </ViewLink>
                </CardBody>
              </CardLink>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Works;
