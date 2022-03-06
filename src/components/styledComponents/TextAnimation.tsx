import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg);
    filter: blur(0px);
  }
`;

const Wrapper = styled.span`
  display: inline-block;
  span {
    opacity: 0;
    display: inline-block;
    animation-name: ${animation};
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  span:nth-child(7) {
    animation-delay: 0.7s;
  }
  span:nth-child(8) {
    animation-delay: 0.8s;
  }
`;

const TextAnimation = () => {
  const textArr = "Showcase".split("");

  return (
    <Wrapper className="uppercase md:text-[2rem] text-[1.5rem] tracking-[1rem]">
      {textArr.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </Wrapper>
  );
};

export default TextAnimation;
