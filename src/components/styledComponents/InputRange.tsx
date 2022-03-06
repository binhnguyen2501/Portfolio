import styled from "styled-components";

export default styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 4px;
  width: 140px;
  background: ${(props) =>
    `linear-gradient(to right, #b23d43 0%, #b23d43 ${props.value}%, #fff ${props.value}%, #fff 100%);`};
  border: 0.5px solid #f2f2f2;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  ::-moz-range-thumb {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
