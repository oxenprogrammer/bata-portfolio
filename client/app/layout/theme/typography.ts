import { ThemeOptions } from "@mui/material";

const fallbackFonts = ["Inter", "sans-serif"];
const copyFonts = fallbackFonts.join(", ");
const headingFonts = ["Open Sauce Two", ...fallbackFonts].join(", ");

export const typography: ThemeOptions["typography"] = {
  fontFamily: copyFonts,
  fontSize: 16,
  htmlFontSize: 16,
  // HEADERS
  title: {
    fontFamily: headingFonts,
    fontSize: "var(--step-6)",
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-1.28px",
  },
  subtitle1: {
    fontFamily: headingFonts,
    fontSize: "var(--step-3)",
    lineHeight: 1.3,
    fontWeight: 300,
    letterSpacing: "-0.64px",
  },
  h1: {
    fontFamily: headingFonts,
    fontSize: "var(--step-5)",
    lineHeight: 1.1,
    fontWeight: 500,
  },
  h2: {
    fontFamily: headingFonts,
  },
  h3: {
    fontFamily: headingFonts,
  },
  h4: {
    fontFamily: headingFonts,
  },
  h5: {
    fontFamily: headingFonts,
  },
  // Body
  smallCaps: {
    fontSize: "var(--step--3)",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  mediumCaps: {
    fontFamily: headingFonts,
    fontSize: "var(--step--1)",
    fontWeight: 600,
    lineHeight: "18px",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },

  largeTextLabels: {
    fontFamily: headingFonts,
    fontSize: "var(--step-2)",
    fontWeight: 700,
    lineHeight: 1.5,
    letterSpacing: "-0.48px",
  },
  regularTextPages: {
    fontFamily: copyFonts,
    fontSize: "var(--step-1)",
    fontWeight: 600,
  },
  regularTextParagraphs: {
    fontFamily: copyFonts,
    fontSize: "var(--step-0)",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "-0.32px",
  },
  smallTextParagraphs: {
    fontFamily: copyFonts,
    fontSize: "var(--step--1)",
    fontWeight: 400,
    lineHeight: "24px",
  },
  smallTextLabels: {
    fontFamily: copyFonts,
    fontSize: "var(--step--1)",
    fontWeight: 400,
    lineHeight: "18px",
  },
  microText: {
    fontFamily: copyFonts,
    fontSize: "var(--step--2)",
    fontWeight: 400,
    lineHeight: "18px",
  },
  code: {
    lineHeight: 1.5,
  },
  boldTextLabel: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: -0.4,
  },
  smallUppercaseLabel: {
    fontSize: 13,
    fontWeight: 600,
    lineHeight: "normal",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  // Disable unused defaults
  h6: {
    fontFamily: copyFonts,
    fontSize: "1.25rem",
    lineHeight: "normal",
    fontWeight: 700,
    letterSpacing: "-0.48px",
  },
  subtitle2: {
    fontFamily: headingFonts,
    lineHeight: 1,
    fontWeight: 700,
    letterSpacing: "-0.72px",
  },
  body1: {
    fontFamily: copyFonts,
    fontSize: "var(--step-0)",
  },
  body2: undefined,
  caption: undefined,
  button: undefined,
  overline: undefined,
};
