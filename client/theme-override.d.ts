import { CSSProperties } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    borderRadii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    boxShadows: ShadowSizes;
    dropShadows: ShadowSizes;
  }

  interface ThemeOptions {
    components: Components<Theme>;
    boxShadows: ShadowSizes;
    dropShadows: ShadowSizes;
    borderRadii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
  }

  interface PaletteValue {
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    65?: string;
    70: string;
    75?: string;
    80: string;
    90: string;
    95?: string;
    100: string;
  }
  interface Palette {
    gray: PaletteValue & { 5: string; 15: string };
    grey: undefined;
    blue: PaletteValue & { 15: string; 25: string; 75: string; 85: string };
    purple: PaletteValue;
    red: PaletteValue;
    orange: PaletteValue;
    lime: PaletteValue;
    yellow: PaletteValue;
    pink: PaletteValue;
    teal: PaletteValue;
    green: PaletteValue;
    aqua: PaletteValue & { 5: string };
    navy: PaletteValue;
    white: string;
    black: PaletteValue & { 35: string };
  }

  interface TypographyVariants {
    title: CSSProperties;
    h1: CSSProperties;
    h2: CSSProperties;
    h3: CSSProperties;
    h4: CSSProperties;
    h5: CSSProperties;
    mediumCaps: CSSProperties;
    smallCaps: CSSProperties;
    largeTextLabels: CSSProperties;
    regularTextPages: CSSProperties;
    regularTextParagraphs: CSSProperties;
    regularTextLabels: CSSProperties;
    smallTextParagraphs: CSSProperties;
    smallTextLabels: CSSProperties;
    microText: CSSProperties;
    code: CSSProperties;
    boldTextLabel: CSSProperties;
    smallUppercaseLabel: CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: CSSProperties;
    h1?: CSSProperties;
    h2?: CSSProperties;
    h3?: CSSProperties;
    h4?: CSSProperties;
    h5?: CSSProperties;
    mediumCaps?: CSSProperties;
    smallCaps?: CSSProperties;
    largeTextLabels?: CSSProperties;
    regularTextPages?: CSSProperties;
    regularTextParagraphs?: CSSProperties;
    regularTextLabels?: CSSProperties;
    smallTextParagraphs?: CSSProperties;
    smallTextLabels?: CSSProperties;
    microText?: CSSProperties;
    code?: CSSProperties;
    boldTextLabel?: CSSProperties;
    smallUppercaseLabel?: CSSProperties;
  }

  interface Theme {
    borderRadii: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    boxShadows: ShadowSizes;
    dropShadows: ShadowSizes;
  }

  interface ShadowSizes {
    none: string;
    xs: string;
    sm: string;
    md: string;
    mdReverse: string;
    lg: string;
    xl: string;
    xxl: string;
    purpleShadowMd: string;
    darkShadowSm: string;
    blueShadowMd: string;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
    subtitle1: true;
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    mediumCaps: true;
    smallCaps: true;
    largeTextLabels: true;
    regularTextPages: true;
    regularTextParagraphs: true;
    regularTextLabels: true;
    smallTextParagraphs: true;
    smallTextLabels: true;
    microText: true;
    code: true;
    boldTextLabel: true;
    subtitle2: true;
    smallUppercaseLabel: true;
    // disable unused defaults
    h6: true;
    subtitle1: false;
    body1: false;
    body2: false;
    caption: false;
    button: false;
    overline: false;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    secondary_quiet: true;
    tertiary: true;
    tertiary_quiet: true;
    warning: true;
    danger: true;
    // Disable defaults
    contained: false;
    outlined: true;
    text: false;
  }

  interface ButtonPropsColorOverrides {
    purple: true;
    teal: true;
    warning: true;
    danger: true;
    gray: true;
    // Disable defaults
    primary: false;
    secondary: false;
    success: false;
    error: false;
    info: false;
    warning: false;
    outlined: true;
  }

  interface ButtonPropsSizeOverrides {
    large: true;
    medium: true;
    small: true;
    xs: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsSizeOverrides {
    large: true;
    medium: true;
    small: true;
    xs: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsSizeOverrides {
    xs: true;
    small: true;
    medium: true;
    large: true;
  }
}

declare module "@mui/material/InputBase" {
  interface InputBasePropsSizeOverrides {
    xs: true;
    small: true;
    medium: true;
    large: true;
  }
}

// eslint-disable-next-line import/no-default-export, import/no-anonymous-default-export -- @see https://github.com/mui-org/material-ui/issues/28244
export default "";
