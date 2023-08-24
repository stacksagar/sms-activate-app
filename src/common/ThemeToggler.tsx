"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";
import FIcon from "./FIcon";
import { IconButton } from "@mui/material";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  function toggle() {
    setTheme((p) => (p === "dark" ? "light" : "dark"));
  }

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.8 }}
      className="flex items-center cursor-pointer w-[40px]"
      onClick={toggle}
    >
      <IconButton>
        {theme === "dark" ? <FIcon icon="sun" /> : <FIcon icon="moon" />}
      </IconButton>
    </motion.div>
  );
}
