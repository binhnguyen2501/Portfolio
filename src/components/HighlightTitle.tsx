import styled from "styled-components";

interface Props {
  title: string;
}

const ContainerTitle = styled.div`
  position: relative;
  z-index: 99;
  opacity: 0;
  animation-duration: 1000ms;
  animation-name: fade-in-text;
  animation-fill-mode: forwards;
  transition: all 1500ms cubic-bezier(0.77, 0, 0.175, 1);
`;

const LineOne = styled.span`
  position: absolute;
  left: -10px;
  background: #dddddd;
  height: 8px;
  width: auto;
  z-index: -1;
  border-radius: 2px;
  animation-duration: 500ms;
  animation-delay: 800ms;
  animation-name: grey-flash;
  animation-fill-mode: forwards;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
`;

const LineTwo = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #b23d43;
  animation-duration: 1000ms;
  animation-name: main-flash;
  animation-fill-mode: forwards;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);
`;

const Title = styled.span`
  position: relative;
  line-height: 1;
  font-weight: 700;
`;

const HighlightTitle = ({ title }: Props) => {
  return (
    <ContainerTitle>
      <Title className="md:text-[3.75rem] text-[32px]">
        {title}
        <LineTwo></LineTwo>
      </Title>
      <LineOne className="md:bottom-[5px] bottom-0"></LineOne>
    </ContainerTitle>
  );
};

export default HighlightTitle;
