import { useContext } from "react";
import styled, { css } from "styled-components";
import { CustomCursorContext } from "../contexts/CustomCursorContext";

interface Props {
  toggle(): void;
  active: boolean;
  scroll: boolean;
  isHiddenCursor: boolean;
}

interface IProps {
  open: boolean;
}

const MenuToggler = styled.button<IProps>`
  position: absolute;
  height: 2rem;
  width: 3rem;
  top: 1.9rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 650ms ease-out;
  transform: rotate(0deg) translateZ(0);
  z-index: 99999;
  -webkit-tap-highlight-color: transparent;

  .bar {
    background: #b23d43;
    border-radius: 0.8rem;
    width: 100%;
    height: 4px;
    display: block;
  }

  .half {
    width: 50%;
  }

  .start {
    transform-origin: right;
    transition: transform 650ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  }

  .end {
    align-self: flex-end;
    transform-origin: left;
    transition: transform 650ms cubic-bezier(0.54, -0.81, 0.57, 0.57);
  }

  @media (min-width: 850px) {
    display: none;
  }

  ${(props) =>
    props.open &&
    css`
      transform: rotate(-45deg) translateZ(0);
      .bar.end {
        transform: rotate(-450deg) translateX(-0.8rem);
      }
      .bar {
        background: #dddddd;
      }
      .bar.start {
        transform: rotate(-450deg) translateX(0.8rem) translateZ(0);
      }
      .bar.end {
        transform: rotate(-450deg) translateX(-0.8rem) translateZ(0);
      }
    `}
`;

const HamburgerMenu = ({ active, scroll, isHiddenCursor, toggle }: Props) => {
  const { setType } = useContext(CustomCursorContext);

  return (
    <MenuToggler
      type="button"
      open={active}
      onClick={toggle}
      style={
        isHiddenCursor
          ? {}
          : scroll
          ? { display: "flex", right: "3rem", position: "fixed" }
          : { display: "none" }
      }
      onMouseEnter={() => setType("hover-item")}
      onMouseLeave={() => setType("default")}
    >
      <div className="bar half start"></div>
      <div className="bar"></div>
      <div className="bar half end"></div>
    </MenuToggler>
  );
};

export default HamburgerMenu;
