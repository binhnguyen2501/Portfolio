import styled, { css } from "styled-components";
import { Spinner } from "@chakra-ui/spinner";

interface Props {
  text: string;
  isForm: boolean;
  isLoading?: boolean;
}

interface IProps {
  isFormBtn: boolean;
}

const StyleButton = styled.div<IProps>`
  position: relative;
  with: 100%;
  overflow: hidden;
  z-index: 1;
  display: block;
  margin-top: 30px;
  padding: 10px 0;
  color: ${(props) => (`${props.isFormBtn}` ? "#333" : "#fff")};
  text-align: center;
  text-decoration: none;
  border: 1px solid #b23d43;
  outline: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 10px;

  ${(props) =>
    props.isFormBtn
      ? css`
          background-color: rgba(0, 0, 0, 0.1);

          :hover {
            color: #fff;
          }

          ::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 0%;
            background: #b23d43;
            border-radius: 0 0 50% 50%;
            transition: 0.8s;
            z-index: -1;
          }

          :hover::after {
            height: 200%;
          }
        `
      : css`
          :hover {
            color: #333;
          }

          ::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 200%;
            background: #b23d43;
            border-radius: 0 0 50% 50%;
            transition: 0.8s;
            z-index: -1;
          }

          :hover::before {
            height: 0;
          }
        `}
`;

const ButtonStyled = ({ text, isForm, isLoading }: Props) => {
  return (
    <StyleButton
      isFormBtn={isForm}
      className="dark:text-[#fff] dark:hover:text-[#fff]"
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner thickness="3px" speed="0.65s" color="#333" />
        </div>
      ) : (
        text
      )}
    </StyleButton>
  );
};

export default ButtonStyled;
