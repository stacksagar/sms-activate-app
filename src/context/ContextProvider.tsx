"use client";

import AuthProvider from "./AuthProvider";
import ThemeProvider from "./ThemeProvider";

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};

export default ContextProvider;
