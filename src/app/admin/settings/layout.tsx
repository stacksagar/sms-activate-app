"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Link from "next/link";
import FIcon from "@/common/FIcon";
import { usePathname } from "next/navigation";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type TabInfoType = {
  label: string;
  icon: IconProp;
};

interface LinkTabProps {
  info: TabInfoType;
  href?: string;
  onClick?: () => void;
}

function LinkTab({ href, onClick, info, ...props }: LinkTabProps) {
  return (
    <a onClick={onClick} href={href || "/"}>
      <Tab
        component="button"
        {...props}
        label={
          <div className="flex items-center gap-1">
            <FIcon icon={info.icon || "cogs"} />
            {info.label}
          </div>
        }
      />
    </a>
  );
}

const settingTabs: { [key: string]: TabInfoType } = {
  "/admin/settings": {
    label: "General",
    icon: "cog",
  },
  "/admin/settings/header": {
    label: "Header",
    icon: "cogs",
  },
  "/admin/settings/footer": {
    label: "Footer",
    icon: "cog",
  },
  "/admin/settings/seo": {
    label: "SEO",
    icon: "searchengin",
  },
  "/admin/settings/email": {
    label: "Email Server",
    icon: "envelope",
  },
};

interface Props {
  children: React.ReactNode;
}

export default function NavTabs({ children }: Props) {
  const pathname = usePathname();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    if (!pathname) return;
    const links = Object.keys(settingTabs);
    setValue(links.indexOf(pathname));
  }, [pathname]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="max-w-[78vw] sm:w-full sm:max-w-full overflow-hidden">
        <Box
          sx={{
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            allowScrollButtonsMobile
            className="dark:bg-gray-800"
            variant="scrollable"
          >
            {Object.entries(settingTabs).map(([link, info]) => (
              <LinkTab key={info.label} info={info} href={link} />
            ))}
          </Tabs>
        </Box>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 md:p-6">{children}</div>
    </div>
  );
}
