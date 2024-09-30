import { Components, Theme } from "@mui/material";

export const MuiLinkThemeOptions: Components<Theme>["MuiLink"] = {
  styleOverrides: {
    root: ({ theme }) => ({
      textDecoration: "none",
      position: "relative",
      color: theme.palette.gray[50],
      ":focus-visible": {
        border: "none",
        outline: `1px solid ${theme.palette.gray[70]}`,
      },
    }),
  },
};
