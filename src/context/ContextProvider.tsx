"use client";

import ThemeProvider from "./ThemeProvider";

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ContextProvider;
