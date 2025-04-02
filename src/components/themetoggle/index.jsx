import React, { useEffect, useState } from "react";
import { WiMoonAltWaningCrescent4 } from "react-icons/wi";

const Themetoggle = () => {
  // Get the initial theme from localStorage or use 'light' as default
  const [theme, setTheme] = useState("light");

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // If a theme is saved in localStorage, use it
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Otherwise set default theme to light and save it
      localStorage.setItem("theme", "light");
    }
  }, []);

  const themetoggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
    // Also apply to body for better compatibility
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="nav_ac" onClick={themetoggle}>
      <WiMoonAltWaningCrescent4 />
    </div>
  );
};

export default Themetoggle;

