"use client";

import AuthProvider from "./AuthProvider";
import SettingProvider from "./SettingProvider";
import ThemeProvider from "./ThemeProvider";

type Props = { children: React.ReactNode };

const ContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <SettingProvider>
        <AuthProvider>{children}</AuthProvider>
      </SettingProvider>
    </ThemeProvider>
  );
};

export default ContextProvider;
