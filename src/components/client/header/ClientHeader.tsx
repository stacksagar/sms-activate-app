"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextLogo from "@/common/TextLogo";
import Link from "next/link";
import ClientHeaderRight from "./ClintHeaderRight";
import ThemeToggler from "@/common/ThemeToggler";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navigation = [
  { name: "Features", href: "#features" },
  { name: "How It Work", href: "#how-it-works" },
  { name: "F.A.Q", href: "#faq" },
];

export default function ClientHeader(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" className="flex items-center justify-center">
          <TextLogo />
        </Link>
      </Typography>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <Link href={item.href}>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <AppBar component="nav" color="inherit">
        <div className="w-[98%] 2xl:max-w-[1280px] h-[90px] flex items-center mx-auto">
          <div className="w-full">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { display: "none", md: "block" },
                }}
              >
                <Link href="/">
                  <TextLogo />
                </Link>
              </Typography>
              <Box sx={{ display: { display: "none", md: "block" } }}>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <Button>{item.name}</Button>
                  </Link>
                ))}
              </Box>
              <div className="ml-auto flex items-center gap-2">
                <div className="mx-8">
                  <ThemeToggler />
                </div>
                <ClientHeaderRight />
              </div>
            </Toolbar>
          </div>
        </div>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              bosmizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main">
        <Toolbar />
      </Box>{" "}
    </div>
  );
}
