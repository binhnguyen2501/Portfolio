import styled from "styled-components";

export default styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transition: all 200ms cubic-bezier(0.77, 0, 0.175, 1);

  :hover {
    left: 30px;
  }

  .prev {
    background: #dddddd;
    width: 66px;
    height: 6px;
    left: 0;
    z-index: 9999;
    cursor: pointer;
    transition: all 200ms cubic-bezier(0.77, 0, 0.175, 1);

    .a {
      position: absolute;
      top: 2px;
      left: -32px;
      background: #dddddd;
      width: 30px;
      height: 6px;
      z-index: 999;
      transform-origin: right center;
      transform: rotate(0deg) translateZ(0);
      opacity: 0;
    }

    :hover .a {
      transform: rotate(135deg) translateZ(0);
      opacity: 1;
    }

    .b {
      position: absolute;
      top: -2px;
      left: -32px;
      background: #dddddd;
      width: 30px;
      height: 6px;
      z-index: 999;
      transform-origin: right center;
      transform: rotate(0deg) translateZ(0);
      opacity: 0;
    }

    :hover .b {
      transform: rotate(-135deg) translateZ(0);
      opacity: 1;
    }
  }
`;
