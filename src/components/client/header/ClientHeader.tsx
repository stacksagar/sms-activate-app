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
  window?: () => Window;
}

const drawerWidth = 240;
const navigation = [
  { name: "Features", href: "/#features" },
  { name: "How It Work", href: "/#how-it-works" },
  { name: "F.A.Q", href: "/#faq" },
];

export default function ClientHeader(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <a href="/" title="go home">
        <Typography variant="h6" sx={{ my: 2 }}>
          <TextLogo />
        </Typography>
      </a>
      <Divider />
      <List>
        {navigation.map((item) => (
          <ListItem key={item.name} disablePadding>
            <a href={item.href} title="#">
              <ListItemButton sx={{ textAlign: "center" }}>
                <span className="capitalize">{item.name}</span>
              </ListItemButton>
            </a>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <header>
      <CssBaseline />
      <AppBar
        component="nav"
        color="inherit"
        style={{ boxShadow: "none" }}
        className="border-b dark:border-none"
      >
        <div className="w-[98%] 2xl:max-w-[1280px] h-[90px] flex items-center mx-auto">
          <div className="w-full">
            <Toolbar className="w-full flex justify-between">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <a href="/" title="go home">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    display: { display: "none", md: "block" },
                  }}
                >
                  <TextLogo />
                </Typography>
              </a>

              <Box
                sx={{
                  display: { display: "none", md: "block" },
                  marginLeft: "auto",
                }}
              >
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    title="#"
                    className="capitalize"
                  >
                    <Button>
                      <span className="capitalize">{item.name}</span>
                    </Button>
                  </a>
                ))}
              </Box>
              <div className="flex items-center gap-2">
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
      </Box>
    </header>
  );
}
