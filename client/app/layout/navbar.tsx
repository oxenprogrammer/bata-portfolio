"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemText,
  useMediaQuery,
  useTheme,
  ListItem,
  Box,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/system";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  padding: theme.spacing(1),
  position: "relative",
  backgroundColor: "transparent",
  "&:hover": {
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.common.white,
      opacity: 0.1,
      pointerEvents: "none",
      borderRadius: "8px",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: theme.palette.teal[50],
    transform: "scaleX(0)",
    transition: "transform 0.3s ease-in-out",
  },
  "&.active::after": {
    transform: "scaleX(1)",
  },
}));

const navItems = [
  "HOME",
  "ABOUT",
  "PROJECTS",
  "COURSES",
  "MENTORSHIP",
  "COFFEE?",
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const path = pathname.slice(1).toUpperCase();
    if (pathname === "/" || pathname === "/home") {
      setActiveItem("HOME");
    } else {
      const matchedItem =
        navItems.find((item) => {
          if (item === "COFFEE?") {
            return path.startsWith("COFFEE");
          }
          return item === path;
        }) || "HOME";
      setActiveItem(matchedItem);
    }
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavItemClick = (item: string) => {
    if (isSmallDevice) {
      setMobileOpen(false);
    }
    if (item === "HOME") {
      router.push("/");
    }
  };

  const getItemHref = (item: string) => {
    if (item === "HOME") return "/";
    return item === "COFFEE?" ? "/coffee" : `/${item.toLowerCase()}`;
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          key={item}
          component={Link}
          href={getItemHref(item)}
          onClick={() => handleNavItemClick(item)}
        >
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: "blue.70" }}>
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{ color: "#4fc3f7" }}>Bata</span>
          </Typography>
          {isSmallDevice ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
              {navItems.map((item) => (
                <StyledLink
                  key={item}
                  href={getItemHref(item)}
                  onClick={() => handleNavItemClick(item)}
                  className={activeItem === item ? "active" : ""}
                >
                  {item}
                </StyledLink>
              ))}
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
