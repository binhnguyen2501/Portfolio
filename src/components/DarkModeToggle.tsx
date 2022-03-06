import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

const DarkModeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <label className="mt-3 inline-flex items-center cursor-pointer">
        <span className="relative">
          <span className="block w-14 h-8 bg-gray-200 rounded-full shadow-inner"></span>
          <span
            className={`${
              theme === "dark"
                ? "bg-white transform translate-x-full"
                : "bg-white"
            } absolute flex items-center justify-center w-6 h-6 mt-1 ml-1  rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}
          >
            {theme === "dark" ? (
              <FontAwesomeIcon
                icon={faMoon}
                className="text-[#333]"
              ></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon
                icon={faSun}
                className="text-[#333]"
              ></FontAwesomeIcon>
            )}
            <input
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="absolute opacity-0 w-0 h-0"
            />
          </span>
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
