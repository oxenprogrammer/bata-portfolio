"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
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

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.blue[70],
    width: 240,
    color: theme.palette.common.white,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 6,
  "&:hover": {
    backgroundColor: "rgba(30, 41, 59, 0.3)",
    color: theme.palette.common.white,
  },
}));

const MobileMenuItemWrapper = styled("div")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  color: "inherit",
  textDecoration: "none",
  position: "relative",
  cursor: "pointer",
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
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: theme.spacing(2),
    right: theme.spacing(2),
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
  "MENTORSHIP",
  "BLOGS",
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down("md"));

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const determineActiveItem = (path: string) => {
      if (path === "/" || path === "/home") {
        return "HOME";
      }

      const normalizedPath = path.slice(1).toUpperCase();

      return navItems.find((item) => {
        // if (item === "COFFEE?") {
        //   return normalizedPath.startsWith("COFFEE");
        // }
        return normalizedPath.startsWith(item) || 
               normalizedPath.startsWith(item.toLowerCase());
      }) || "HOME";
    };

    setActiveItem(determineActiveItem(pathname));
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
    <List sx={{ pt: 2 }}>
      {navItems.map((item) => (
        <ListItem key={item} disablePadding>
          <Link
            href={getItemHref(item)}
            style={{ width: "100%", textDecoration: "none", color: "inherit" }}
            onClick={() => handleNavItemClick(item)}
          >
            <MobileMenuItemWrapper
              className={activeItem === item ? "active" : ""}
            >
              {item}
            </MobileMenuItemWrapper>
          </Link>
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
              <StyledIconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ fontSize: "40px !important" }} />
              </StyledIconButton>
              <StyledDrawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              >
                {drawer}
              </StyledDrawer>
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