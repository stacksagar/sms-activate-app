"use client";
import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import FIcon from "@/common/FIcon";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BoxesLoader from "@/components/loaders/LoaderBox";

const prfile_links: {
  title: string;
  href: string;
  icon: IconProp;
}[] = [
  {
    title: "Profile",
    href: "/profile",
    icon: "user",
  },
  {
    title: "Wallet",
    href: "/profile/wallet",
    icon: "money-bill",
  },

  {
    title: "Security",
    href: "/profile/change-password",
    icon: "lock",
  },
  {
    title: "Services",
    href: "/services",
    icon: "servicestack",
  },
];

export default function ClippedDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container w-full flex flex-col md:flex-row items-start py-20 gap-10">
      <div className="w-full md:w-[350px] bg-white dark:bg-gray-950">
        <Box>
          <List>
            {prfile_links.map((item) => (
              <ListItem key={item.title} disablePadding>
                <a
                  href={item.href}
                  className={`block min-w-full ${
                    pathname === item.href ? "bg-blue-600 text-white" : ""
                  }`}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {pathname === item.href ? (
                        <FIcon icon={item.icon} className="text-white" />
                      ) : (
                        <FIcon icon={item.icon} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </a>
              </ListItem>
            ))}
          </List>
          <Divider />{" "}
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => signOut()}>
                <ListItemIcon>
                  <FIcon icon="sign-out" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </div>
      <div className="w-full md:w-full bg-white dark:bg-gray-950">
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </div>
    </div>
  );
}
