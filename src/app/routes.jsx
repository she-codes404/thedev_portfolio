import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../pages/home";
import { Portfolio } from "../pages/portfolio";
import { ContactUs } from "../pages/contact";
import { About } from "../pages/about";
import { Socialicons } from "../components/socialicons";
// eslint-disable-next-line no-unused-vars
import { useTransition, animated } from "@react-spring/web";

function AppRoutes() {
  const location = useLocation();
  
  // Set up transitions using react-spring (more compatible with React 18 and Router v7)
  const transitions = useTransition(location, {
    from: { opacity: 0, transform: "translate(100%, 0)" },
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: { opacity: 0, transform: "translate(-50%, 0)" },
    config: { duration: 300 },
    key: location.pathname,
  });
  
  return (
    <div className="s_c">
      {transitions((style, item) => (
        <animated.div style={style} className="page-transition">
          <Routes location={item}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </animated.div>
      ))}
      <Socialicons />
    </div>
  );
}

export default AppRoutes;
