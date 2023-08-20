"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { useTheme } from "@/context/ThemeProvider";
import { createTheme } from "@mui/material";
import cookie from "js-cookie";

export default function MaterialThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider
        theme={createTheme({
          palette: {
            mode: theme || (cookie.get("theme") as Theme) || "light",
            background: {
              paper: theme === "dark" ? "#0f172a" : "#ffffff",
              default: theme === "dark" ? "#020617" : "#ffffff",
            },
          },
        })}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
