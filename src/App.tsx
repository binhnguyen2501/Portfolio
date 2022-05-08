import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";

import About from "./About/About";
import Contact from "./Contact/Contact";
import Works from "./Works/Works";
import Work from "./components/Work";
import Main from "./Main/Main";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "#333";
      document.body.style.color = "#fff";
    }
    if (theme === "light") {
      document.body.style.backgroundColor = "#fff";
      document.body.style.color = "#000";
    }
  }, [theme]);

  return (
    <>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Works" element={<Works />} />
        <Route path="/Works/:workName" element={<Work />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
};

export default App;
