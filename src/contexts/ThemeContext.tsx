import { createContext, useState, useEffect } from "react";

interface Props {
  children: JSX.Element;
}

type ThemeName = "light" | "dark" | string;
type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
};

const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    // check value saved in local storage
    const storedRef: string | null = window.localStorage.getItem("COLOR_THEME");
    if (typeof storedRef === "string") {
      return storedRef;
    }

    // check system preference prefers color in browser
    const userMedia = window.matchMedia("(prefers-color-scheme:dark)");
    if (userMedia.matches) {
      return "dark";
    }
  }
  // returning default theme here
  return "light";
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<string>(getInitialTheme);

  const rawSetTheme = (theme: string) => {
    //Updated rawSetTheme to theme above
    const root = window.document.documentElement;
    const isDark = theme === "dark";

    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);

    localStorage.setItem("COLOR_THEME", theme);
  };

  useEffect(() => {
    rawSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
