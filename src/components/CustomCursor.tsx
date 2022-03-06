import React, { useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import { CustomCursorContext } from "../contexts/CustomCursorContext";

const Cursor = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  z-index: 99999;
`;

const Cursor2 = styled.div`
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  z-index: 99999;
`;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<any>(null);
  const cursor2Ref = useRef<any>(null);
  const positionRef = useRef<any>({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  });

  const handleMouseOver = (event: any) => {
    const { clientX, clientY } = event;
    if (cursorRef && cursorRef.current && cursor2Ref && cursor2Ref.current) {
      const mouseX = clientX - cursorRef.current.clientWidth / 2;
      const mouseY = clientY - cursorRef.current.clientHeight / 2;

      positionRef.current.mouseX = mouseX - cursor2Ref.current.clientWidth / 2;
      positionRef.current.mouseY = mouseY - cursor2Ref.current.clientHeight / 2;

      cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseOver);
    return document.addEventListener("mousemove", handleMouseOver);
  }, []);

  useEffect(() => {
    const followMouse = () => {
      if (cursor2Ref && cursor2Ref.current) {
        positionRef.current.key = requestAnimationFrame(followMouse);
        const {
          mouseX,
          mouseY,
          destinationX,
          destinationY,
          distanceX,
          distanceY,
        } = positionRef.current;

        if (!destinationX || !destinationY) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
          positionRef.current.distanceY = (mouseY - destinationY) * 0.1;
        }

        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }

        cursor2Ref.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`;
      }
    };

    followMouse();
  }, []);

  const { type } = useContext(CustomCursorContext);

  return (
    <div className={`${type}`}>
      <Cursor2 ref={cursorRef} className="cursor2">
        <div className="bg-cursor2"></div>
      </Cursor2>
      <Cursor ref={cursor2Ref} className="cursor">
        <div className="bg-cursor border-[1px] border-[#333] dark:border-[#fff]"></div>
      </Cursor>
    </div>
  );
};

export default CustomCursor;
