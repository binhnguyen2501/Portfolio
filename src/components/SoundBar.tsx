import { useRef, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { CheckRouteWorkContext } from "../contexts/CheckRouteWorkContext";

const Box = styled.div`
  display: flex;
  z-index: 9999;
  gap: 0.1rem;
  cursor: pointer;

  & > *:nth-child(1) {
    border-radius: 8px;
    animation-delay: 0.2s;
  }
  & > *:nth-child(2) {
    border-radius: 8px;
    animation-delay: 0.3s;
  }
  & > *:nth-child(3) {
    border-radius: 8px;
    animation-delay: 0.4s;
  }
  & > *:nth-child(4) {
    border-radius: 8px;
    animation-delay: 0.5s;
  }
  & > *:nth-child(5) {
    border-radius: 8px;
    animation-delay: 0.6s;
  }
  & > *:nth-child(6) {
    border-radius: 8px;
    animation-delay: 0.7s;
  }
  & > *:nth-child(7) {
    border-radius: 8px;
    animation-delay: 0.9s;
  }
`;

const play = keyframes`
0% {
transform: scaleY(1);
}
50% {
    transform: scaleY(2);
}
100%{
    transform: scaleY(1);
}
`;

interface StyledProps {
  click?: any;
}

const Line = styled.div<StyledProps>`
  background: #b23d43;
  border: 1px solid #333;

  animation: ${play} 1s ease infinite;
  animation-play-state: ${(props) => (props.click ? "running" : "paused")};
  height: 1.2rem;
  width: 5px;
`;

const SoundBar = () => {
  const [click, setClick] = useState<boolean>(false);
  const ref = useRef<HTMLAudioElement>(null);
  const { isRoute } = useContext(CheckRouteWorkContext);

  const handleClick = (): void => {
    setClick(!click);

    if (ref.current) {
      if (!click) {
        ref.current.play();
      } else {
        ref.current.pause();
      }
    }
  };

  return (
    <Box onClick={handleClick}>
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />
      <Line click={click} />

      <audio
        src={
          isRoute
            ? require("../assets/audios/music3.mp3")
            : require("../assets/audios/music.mp3")
        }
        ref={ref}
        loop
      />
    </Box>
  );
};

export default SoundBar;
