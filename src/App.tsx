import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./contexts/ThemeContext";

import NotFound from "./pages/NotFound/NotFound";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";

const AboutLoadable = React.lazy(() => import("./pages/About/About"));
const ContactLoadable = React.lazy(() => import("./pages/Contact/Contact"));
const WorksLoadable = React.lazy(() => import("./pages/Works/Works"));
const WorkLoadable = React.lazy(() => import("./pages/Work/Work"));
const MainLoadable = React.lazy(() => import("./pages/Main/Main"));

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
    <React.Fragment>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/about" element={<AboutLoadable />} />
        <Route path="/contact" element={<ContactLoadable />} />
        <Route path="/works" element={<WorksLoadable />} />
        <Route path="/works/:workName" element={<WorkLoadable />} />
        <Route path="/" element={<MainLoadable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
