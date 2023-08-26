import useBoolean, { UseBoolean } from "@/hooks/state/useBoolean";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface SettingContext {
  setting: SettingT;
  setSetting: React.Dispatch<React.SetStateAction<SettingT>>;
  url_changing: UseBoolean;
  fetched: UseBoolean;
}

const SettingContext = createContext<SettingContext>({} as SettingContext);

export default function SettingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  // const [currentPath, setCurrentPath] = useState("");
  const [setting, setSetting] = useState({} as SettingT);
  const url_changing = useBoolean();
  const fetched = useBoolean(false);

  useEffect(() => {
    if (fetched?.true) return;
    axios
      .get(`/api/settings`)
      .then(({ data }) => {
        setSetting(data?.settings);
      })
      .finally(() => {
        fetched.setTrue();
      });
  }, [fetched]);

  // useEffect(() => {
  //   setCurrentPath(pathname || "");
  // }, [pathname, currentPath]);

  // useEffect(() => {
  //   if (url_changing.true) {
  //     toast({
  //       toastId: "url_changing",
  //       message: "please wait a moment...",
  //       type: "info",
  //       isLoading: true,
  //     });
  //   } else {
  //     toastify.dismiss("url_changing");
  //   }
  // }, [url_changing]);

  // useEffect(() => {
  //   if (currentPath === pathname) {
  //     url_changing.setFalse();
  //   } else {
  //     return;
  //   }
  // }, [currentPath, pathname, url_changing]);

  // useEffect(() => {
  //   const anchors = document.querySelectorAll("a");
  //   for (let i = 0; i < anchors.length; i++) {
  //     const a = anchors[i];
  //     a.addEventListener("click", function () {
  //       url_changing.setTrue();
  //     });
  //   }
  // }, [url_changing]);

  return (
    <SettingContext.Provider
      value={{
        setting,
        setSetting,
        url_changing,
        fetched,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  return useContext(SettingContext);
}
