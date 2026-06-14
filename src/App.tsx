import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "@/pages/NotFound/NotFound";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";

const AboutLoadable = React.lazy(() => import("@/pages/About/About"));
const WorksLoadable = React.lazy(() => import("@/pages/Works/Works"));
const WorkLoadable = React.lazy(() => import("@/pages/Work/Work"));
const MainLoadable = React.lazy(() => import("@/pages/Main/Main"));

const App: React.FC = () => {
  return (
    <React.Fragment>
      <CustomCursor />
      <Header />
      <Routes>
        <Route path="/about" element={<AboutLoadable />} />
        <Route path="/works" element={<WorksLoadable />} />
        <Route path="/works/:workName" element={<WorkLoadable />} />
        <Route path="/" element={<MainLoadable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
