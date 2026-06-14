import { createContext, useCallback, useMemo, useState } from "react";

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

  const toggleRoute = useCallback((state: boolean) => {
    setRoute(state);
  }, []);

  const value = useMemo(
    () => ({ isRoute, toggleRoute }),
    [isRoute, toggleRoute]
  );

  return (
    <CheckRouteWorkContext.Provider value={value}>
      {children}
    </CheckRouteWorkContext.Provider>
  );
};

export default CheckRouteWorkProvider;
