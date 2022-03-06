import { createContext, useState } from "react";

export type CursorLookType = "default" | "hover-item" | "slider-drag";

export type CustomCursorType = {
  type: CursorLookType;
  setType: (type: CursorLookType) => void;
};

interface Props {
  children: JSX.Element;
}

export const CustomCursorContext = createContext<CustomCursorType>({
  type: "default",
  setType: () => {},
});

const CustomCursorProvider = ({ children }: Props) => {
  const [type, setType] = useState<CursorLookType>("default");

  return (
    <CustomCursorContext.Provider value={{ type, setType }}>
      {children}
    </CustomCursorContext.Provider>
  );
};

export default CustomCursorProvider;
