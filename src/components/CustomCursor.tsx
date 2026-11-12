import React, { useRef, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CustomCursorContext } from "@/contexts/CustomCursorContext";

const Cursor = styled.div`
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  z-index: 999999;
`;

const Cursor2 = styled.div`
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
  pointer-events: none;
  z-index: 999999;
`;

// Elements that legitimately keep the enlarged "hover-item" cursor.
const INTERACTIVE =
  "a, button, summary, input, select, textarea, label, [role='button'], [role='slider'], [role='link']";

const CustomCursor: React.FC = () => {
  const { type, setType } = useContext(CustomCursorContext);
  const { pathname } = useLocation();
  const typeRef = useRef(type);
  typeRef.current = type;
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

    // Self-heal: if the element that set "hover-item" was removed or moved
    // (route change, lightbox, scroll) its mouseleave never fires, which left
    // the enlarged cursor stuck. Reset whenever the pointer isn't on a control.
    if (typeRef.current === "hover-item") {
      const target = event.target as Element | null;
      if (!target?.closest?.(INTERACTIVE)) setType("default");
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseOver);
    return () => document.removeEventListener("mousemove", handleMouseOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A new page never starts with a hover state left over from the old one.
  useEffect(() => {
    setType("default");
  }, [pathname, setType]);

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
    const position = positionRef.current;
    return () => cancelAnimationFrame(position.key);
  }, []);

  return (
    <div className={`${type}`}>
      <Cursor2 ref={cursorRef} className="cursor2">
        <div className="bg-cursor2"></div>
      </Cursor2>
      <Cursor ref={cursor2Ref} className="cursor">
        <div className="bg-cursor border-[1px] border-[#333]" />
      </Cursor>
    </div>
  );
};

export default CustomCursor;
