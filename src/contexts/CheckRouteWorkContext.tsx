import { createContext, useState } from "react";

interface Props {
  children: JSX.Element;
}

export type CheckRouteWorkType = {
  isRoute: boolean;
  toggleRoute: (state: boolean) => void;
};

export const CheckRouteWorkContext = createContext<CheckRouteWorkType>({
  isRoute: false,
  toggleRoute: () => {},
});

const CheckRouteWorkProvider = ({ children }: Props) => {
  const [isRoute, setRoute] = useState<boolean>(false);

  const toggleRoute = (state: boolean) => {
    setRoute(state);
  };

  return (
    <CheckRouteWorkContext.Provider value={{ isRoute, toggleRoute }}>
      {children}
    </CheckRouteWorkContext.Provider>
  );
};

export default CheckRouteWorkProvider;
