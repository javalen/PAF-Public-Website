import React from "react";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";

export default function DarkModeToggle() {
  // Initialize dark mode from localStorage on first render
  React.useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="inline-flex items-center justify-center text-textSecondary dark:text-textSecondary-dark hover:text-brandSecondary dark:hover:text-brandSecondary-dark"
      aria-label="Toggle Dark Mode"
    >
      <BedtimeOutlinedIcon />
    </button>
  );
}
